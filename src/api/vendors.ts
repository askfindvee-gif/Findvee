export type VendorPayload = {
  businessName: string;
  categories: string[];
  location: { lat: number; lng: number; address: string; city: string };
  phone: string;
  description: string;
  proofFile?: File;
};

export async function createVendor(payload: VendorPayload): Promise<{ id: string }>
{
  // Placeholder: wire to Supabase later
  // eslint-disable-next-line no-console
  console.log('[createVendor] payload', payload);
  await new Promise((r) => setTimeout(r, 400));
  return { id: Math.random().toString(36).slice(2) };
}

