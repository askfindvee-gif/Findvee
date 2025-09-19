import z from "zod";

export const BusinessSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Business name is required"),
  category: z.string().optional(),
  city: z.string().optional(),
  area: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  short_desc: z.string().optional(),
  approved: z.boolean().optional(),
  owner: z.string(),
  created_at: z.string().optional(),
});

export const CreateBusinessSchema = BusinessSchema.omit({ id: true, created_at: true, approved: true });

export const ReviewSchema = z.object({
  id: z.string().optional(),
  business_id: z.string(),
  user_id: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  created_at: z.string().optional(),
});

export const CreateReviewSchema = ReviewSchema.omit({ id: true, business_id: true, user_id: true, created_at: true });

export const LeadSchema = z.object({
  id: z.string().optional(),
  business_id: z.string(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  preferred_time: z.string().optional(),
  created_at: z.string().optional(),
});

export const CreateLeadSchema = LeadSchema.omit({ id: true, created_at: true });

export type Business = z.infer<typeof BusinessSchema>;
export type CreateBusiness = z.infer<typeof CreateBusinessSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type CreateReview = z.infer<typeof CreateReviewSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type CreateLead = z.infer<typeof CreateLeadSchema>;
