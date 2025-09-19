import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateBusinessSchema, CreateLeadSchema } from "@/shared/types";
import { z } from "zod";
import type { Env } from "@/worker/env";
import {
  getOAuthRedirectUrl,
  exchangeCodeForSessionToken,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import type { MochaUser } from '@getmocha/users-service/shared';

type Variables = {
  user: MochaUser;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// CORS middleware
app.use('*', async (c, next) => {
  // Handle preflight OPTIONS requests
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  await next();
  
  // Add CORS headers to all responses
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication routes
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Business routes
app.get('/api/businesses', async (c) => {
  const query = c.req.query('q') || '';
  const city = c.req.query('city') || '';
  const category = c.req.query('category') || '';
  
  let sql = 'SELECT * FROM businesses WHERE approved = true';
  let bindings: any[] = [];
  
  if (query.trim()) {
    sql += ' AND name LIKE ?';
    bindings.push(`%${query}%`);
  }
  
  if (city.trim() && city !== 'All') {
    sql += ' AND city = ?';
    bindings.push(city);
  }
  
  if (category.trim() && category !== 'All') {
    sql += ' AND category = ?';
    bindings.push(category);
  }
  
  sql += ' ORDER BY name ASC';
  
  const { results } = await c.env.DB.prepare(sql).bind(...bindings).all();

  return c.json(results);
});

// Enhanced search endpoint with NLP capabilities
app.get('/api/businesses/search', async (c) => {
  const query = c.req.query('q') || '';
  const city = c.req.query('city') || '';
  
  if (!query.trim()) {
    return c.json([]);
  }

  const searchTerms = query.toLowerCase().trim();
  
  // Build comprehensive search SQL that looks across multiple fields
  let sql = `
    SELECT DISTINCT b.*, 
    (
      CASE WHEN LOWER(b.name) LIKE ? THEN 10 ELSE 0 END +
      CASE WHEN LOWER(b.category) LIKE ? THEN 8 ELSE 0 END +
      CASE WHEN LOWER(b.address) LIKE ? THEN 6 ELSE 0 END +
      CASE WHEN LOWER(b.short_desc) LIKE ? THEN 4 ELSE 0 END +
      CASE WHEN LOWER(b.area) LIKE ? THEN 3 ELSE 0 END +
      CASE WHEN LOWER(b.owner) LIKE ? THEN 2 ELSE 0 END
    ) as relevance_score
    FROM businesses b
    WHERE b.approved = true
    AND (
      LOWER(b.name) LIKE ? OR
      LOWER(b.category) LIKE ? OR
      LOWER(b.address) LIKE ? OR
      LOWER(b.short_desc) LIKE ? OR
      LOWER(b.area) LIKE ? OR
      LOWER(b.owner) LIKE ?
    )
  `;
  
  const searchPattern = `%${searchTerms}%`;
  let bindings = Array(12).fill(searchPattern); // 6 for scoring, 6 for WHERE clause
  
  if (city.trim() && city !== 'All') {
    sql += ' AND b.city = ?';
    bindings.push(city);
  }
  
  sql += ' ORDER BY relevance_score DESC, b.name ASC';
  
  const { results } = await c.env.DB.prepare(sql).bind(...bindings).all();

  return c.json(results);
});

app.get('/api/businesses/:id', async (c) => {
  const id = c.req.param('id');
  
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM businesses WHERE id = ? AND approved = true'
  ).bind(id).all();
  
  if (results.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }
  
  return c.json(results[0]);
});

app.post('/api/businesses', zValidator('json', CreateBusinessSchema), async (c) => {
  const businessData = c.req.valid('json');

  const { success } = await c.env.DB.prepare(`
    INSERT INTO businesses (
      name, category, city, address, phone, image_url, owner, created_at, approved
    ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, false)
  `).bind(
    businessData.name,
    businessData.category || null,
    businessData.city || null,
    businessData.address || null,
    businessData.phone || null,
    businessData.image_url || null,
    businessData.owner || 'anonymous'
  ).run();

  if (!success) {
    return c.json({ error: 'Failed to create service listing' }, 500);
  }

  return c.json({ success: true }, 201);
});

// Favorites routes - require auth
app.get('/api/favorites', authMiddleware, async (c) => {
  const user = c.get('user');
  
  const { results } = await c.env.DB.prepare(`
    SELECT b.* 
    FROM businesses b
    INNER JOIN favorites f ON b.id = f.business_id
    WHERE f.user_id = ? AND b.approved = true
    ORDER BY f.created_at DESC
  `).bind(user.id).all();
  
  return c.json(results);
});

app.get('/api/favorites/check/:businessId', authMiddleware, async (c) => {
  const businessId = c.req.param('businessId');
  const user = c.get('user');
  
  const { results } = await c.env.DB.prepare(
    'SELECT id FROM favorites WHERE user_id = ? AND business_id = ?'
  ).bind(user.id, businessId).all();
  
  return c.json({ isFavorited: results.length > 0 });
});

app.post('/api/favorites/:businessId', authMiddleware, async (c) => {
  const businessId = c.req.param('businessId');
  const user = c.get('user');
  
  // Check if business exists and is approved
  const { results: businesses } = await c.env.DB.prepare(
    'SELECT id FROM businesses WHERE id = ? AND approved = true'
  ).bind(businessId).all();
  
  if (businesses.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }
  
  const { success } = await c.env.DB.prepare(`
    INSERT OR IGNORE INTO favorites (user_id, business_id, created_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
  `).bind(user.id, businessId).run();
  
  if (!success) {
    return c.json({ error: 'Failed to add to favorites' }, 500);
  }
  
  return c.json({ success: true }, 201);
});

app.delete('/api/favorites/:businessId', authMiddleware, async (c) => {
  const businessId = c.req.param('businessId');
  const user = c.get('user');
  
  const { success } = await c.env.DB.prepare(
    'DELETE FROM favorites WHERE user_id = ? AND business_id = ?'
  ).bind(user.id, businessId).run();
  
  if (!success) {
    return c.json({ error: 'Failed to remove from favorites' }, 500);
  }
  
  return c.json({ success: true }, 200);
});

// Review routes
app.get('/api/businesses/:id/reviews', async (c) => {
  const businessId = c.req.param('id');
  
  // Check if business exists and is approved first
  const { results: businesses } = await c.env.DB.prepare(
    'SELECT id FROM businesses WHERE id = ? AND approved = true'
  ).bind(businessId).all();
  
  if (businesses.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }
  
  // Get reviews without trying to join with users table since we use Mocha auth
  const { results } = await c.env.DB.prepare(`
    SELECT r.id, r.business_id, r.user_id, r.rating, r.comment, r.created_at
    FROM reviews r
    WHERE r.business_id = ?
    ORDER BY r.created_at DESC
  `).bind(businessId).all();
  
  return c.json(results);
});

const CreateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional()
});

app.post('/api/businesses/:id/reviews', authMiddleware, zValidator('json', CreateReviewSchema), async (c) => {
  const businessId = c.req.param('id');
  const reviewData = c.req.valid('json');
  const user = c.get('user');
  
  // Check if business exists and is approved
  const { results: businesses } = await c.env.DB.prepare(
    'SELECT id FROM businesses WHERE id = ? AND approved = true'
  ).bind(businessId).all();
  
  if (businesses.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }
  
  // Check if user already reviewed this business
  const { results: existingReviews } = await c.env.DB.prepare(
    'SELECT id FROM reviews WHERE business_id = ? AND user_id = ?'
  ).bind(businessId, user.id).all();
  
  if (existingReviews.length > 0) {
    return c.json({ error: 'You have already reviewed this business' }, 400);
  }
  
  const { success } = await c.env.DB.prepare(`
    INSERT INTO reviews (business_id, user_id, rating, comment, created_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `).bind(
    businessId,
    user.id,
    reviewData.rating,
    reviewData.comment || null
  ).run();
  
  if (!success) {
    return c.json({ error: 'Failed to create review' }, 500);
  }
  
  return c.json({ success: true }, 201);
});

// Admin routes
app.get('/api/admin/check', authMiddleware, async (c) => {
  const user = c.get('user');
  
  const { results } = await c.env.DB.prepare(
    'SELECT user_id FROM admins WHERE user_id = ?'
  ).bind(user.id).all();
  
  return c.json({ isAdmin: results.length > 0 });
});

app.get('/api/admin/businesses/pending', authMiddleware, async (c) => {
  const user = c.get('user');
  
  // Check if user is admin
  const { results: adminCheck } = await c.env.DB.prepare(
    'SELECT user_id FROM admins WHERE user_id = ?'
  ).bind(user.id).all();
  
  if (adminCheck.length === 0) {
    return c.json({ error: 'Admin access required' }, 403);
  }
  
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM businesses WHERE approved = false ORDER BY created_at DESC'
  ).all();
  
  return c.json(results);
});

app.post('/api/admin/businesses/:id/approve', authMiddleware, async (c) => {
  const businessId = c.req.param('id');
  const user = c.get('user');
  
  // Check if user is admin
  const { results: adminCheck } = await c.env.DB.prepare(
    'SELECT user_id FROM admins WHERE user_id = ?'
  ).bind(user.id).all();
  
  if (adminCheck.length === 0) {
    return c.json({ error: 'Admin access required' }, 403);
  }
  
  const { success } = await c.env.DB.prepare(
    'UPDATE businesses SET approved = true WHERE id = ?'
  ).bind(businessId).run();
  
  if (!success) {
    return c.json({ error: 'Failed to approve business' }, 500);
  }
  
  return c.json({ success: true });
});

app.delete('/api/admin/businesses/:id', authMiddleware, async (c) => {
  const businessId = c.req.param('id');
  const user = c.get('user');
  
  // Check if user is admin
  const { results: adminCheck } = await c.env.DB.prepare(
    'SELECT user_id FROM admins WHERE user_id = ?'
  ).bind(user.id).all();
  
  if (adminCheck.length === 0) {
    return c.json({ error: 'Admin access required' }, 403);
  }
  
  const { success } = await c.env.DB.prepare(
    'DELETE FROM businesses WHERE id = ?'
  ).bind(businessId).run();
  
  if (!success) {
    return c.json({ error: 'Failed to reject business' }, 500);
  }
  
  return c.json({ success: true });
});

// Business views routes
app.post('/api/businesses/:id/view', async (c) => {
  const businessId = c.req.param('id');
  
  // Get business to check if it exists and get city
  const { results: businesses } = await c.env.DB.prepare(
    'SELECT id, city FROM businesses WHERE id = ? AND approved = true'
  ).bind(businessId).all();
  
  if (businesses.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }
  
  const business = businesses[0] as { id: string; city?: string };
  
  // Insert view record (user_id will be null for non-authenticated users)
  const { success } = await c.env.DB.prepare(`
    INSERT INTO business_views (business_id, user_id, city, created_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `).bind(
    businessId,
    null, // No user tracking for now
    business.city || null
  ).run();
  
  if (!success) {
    return c.json({ error: 'Failed to record view' }, 500);
  }
  
  return c.json({ success: true }, 201);
});

app.get('/api/businesses/popular/:city', async (c) => {
  const city = c.req.param('city');
  
  // Get top 6 businesses by view count in the last 14 days for the specified city
  const { results } = await c.env.DB.prepare(`
    SELECT b.*, COUNT(bv.id) as view_count
    FROM businesses b
    LEFT JOIN business_views bv ON b.id = bv.business_id 
      AND bv.created_at > datetime('now', '-14 days')
      AND bv.city = ?
    WHERE b.approved = true AND b.city = ?
    GROUP BY b.id
    HAVING COUNT(bv.id) > 0
    ORDER BY view_count DESC, b.name ASC
    LIMIT 6
  `).bind(city, city).all();
  
  return c.json(results);
});

// Lead routes
app.post('/api/leads', zValidator('json', CreateLeadSchema), async (c) => {
  const leadData = c.req.valid('json');

  // Check if business exists and is approved
  const { results: businesses } = await c.env.DB.prepare(
    'SELECT id FROM businesses WHERE id = ? AND approved = true'
  ).bind(leadData.business_id).all();
  
  if (businesses.length === 0) {
    return c.json({ error: 'Business not found' }, 404);
  }

  const { success } = await c.env.DB.prepare(`
    INSERT INTO leads (
      business_id, name, phone, message, preferred_time, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    leadData.business_id,
    leadData.name,
    leadData.phone || null,
    leadData.message || null,
    leadData.preferred_time || null
  ).run();

  if (!success) {
    return c.json({ error: 'Failed to create lead' }, 500);
  }

  return c.json({ success: true }, 201);
});

export default app;
