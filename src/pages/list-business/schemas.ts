import { z } from 'zod';

export const BasicSchema = z.object({
  businessName: z.string().min(2).max(80),
  categories: z.array(z.string()).min(1),
});

export const LocationContactSchema = z.object({
  location: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().min(6),
    city: z.string().min(2).optional().default(''),
  }),
  phone: z.string().refine((val) => {
    const indianPattern = /^\+?91?\s?[6-9]\d{9}$/;
    const e164Pattern = /^\+[1-9]\d{1,14}$/;
    const clean = val.replace(/\s/g, '');
    return indianPattern.test(clean) || e164Pattern.test(clean);
  }, 'Invalid phone number'),
});

export const AboutProofSchema = z.object({
  description: z.string().min(20).max(400),
  proofFile: z.instanceof(File).optional(),
});

export const VendorPayloadSchema = BasicSchema
  .and(LocationContactSchema)
  .and(AboutProofSchema);

export type VendorPayload = z.infer<typeof VendorPayloadSchema>;

