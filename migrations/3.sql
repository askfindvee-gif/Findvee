
-- Add missing tables that are referenced in the code but don't exist
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, business_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id TEXT NOT NULL,
  user_id TEXT,
  city TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  preferred_time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample businesses for testing if none exist
INSERT OR IGNORE INTO businesses (id, name, category, city, address, phone, owner, approved) VALUES
('sample1', 'Udupi Restaurant', 'Restaurant', 'Udupi', 'Near Udupi Temple', '+91-820-2520123', 'admin', true),
('sample2', 'Manipal Guest House', 'Accommodation', 'Manipal', 'MIT Campus Road', '+91-820-2925456', 'admin', true),
('sample3', 'Kundapura Medical Store', 'Pharmacy', 'Kundapura', 'Main Road, Kundapura', '+91-8252-236789', 'admin', true),
('sample4', 'Koteshwara General Store', 'Shop', 'Koteshwara', 'Near Bus Stand', '+91-8252-245678', 'admin', true);
