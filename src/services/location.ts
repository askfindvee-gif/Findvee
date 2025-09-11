export type Coordinates = { lat: number; lng: number };

export async function getBrowserLocation(): Promise<Coordinates | 'denied' | 'unavailable'> {
  if (!('geolocation' in navigator)) return 'unavailable';
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) return resolve('denied');
        resolve('unavailable');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
}

// Adapter: swap implementation later (e.g., Google, Mapbox, OpenStreetMap Nominatim)
export async function reverseGeocode(lat: number, lng: number): Promise<{ address: string; city: string }> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    const data = await res.json();
    const city = data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.county || 'Unknown';
    const address = data?.display_name || `${lat}, ${lng}`;
    return { address, city };
  } catch {
    return { address: `${lat}, ${lng}`, city: 'Unknown' };
  }
}

export function isWithinRadius(user: Coordinates, target: Coordinates, km: number): boolean {
  const R = 6371;
  const dLat = ((target.lat - user.lat) * Math.PI) / 180;
  const dLng = ((target.lng - user.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((user.lat * Math.PI) / 180) *
      Math.cos((target.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= km;
}

