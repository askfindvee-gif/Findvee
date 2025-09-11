
import { useState } from 'react';
import Button from '../../../components/base/Button';

interface VendorData {
  businessName: string;
  categories: string[];
  location: string;
  phone: string;
  description: string;
  proofFile: File | null;
}

interface Step2LocationContactProps {
  data: VendorData;
  updateData: (data: Partial<VendorData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2LocationContact({ 
  data, 
  updateData, 
  onNext, 
  onPrev 
}: Step2LocationContactProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateLocation = (location: string) => {
    if (!location.trim()) return false;
    
    // Check if it's a valid URL (Google Maps URL)
    try {
      const url = new URL(location);
      return url.hostname.includes('google.com') || url.hostname.includes('maps.google.com');
    } catch {
      // If not a URL, check if it's a valid address (minimum 6 characters)
      return location.trim().length >= 6;
    }
  };

  const validatePhone = (phone: string) => {
    // Indian mobile pattern or E.164 international
    const indianPattern = /^\+?91?\s?[6-9]\d{9}$/;
    const e164Pattern = /^\+[1-9]\d{1,14}$/;
    
    return indianPattern.test(phone.replace(/\s/g, '')) || e164Pattern.test(phone.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateLocation(data.location)) {
      newErrors.location = 'Please enter a valid address or Google Maps URL (minimum 6 characters)';
    }

    if (!validatePhone(data.phone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number or international number in E.164 format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getMapEmbedUrl = () => {
    if (!data.location.address.trim()) return '';
    
    try {
      // If it's already a Google Maps URL, try to convert to embed
      const url = new URL(data.location.address);
      if (url.hostname.includes('google.com') || url.hostname.includes('maps.google.com')) {
        return data.location.address;
      }
    } catch {
      // If not a URL, create embed URL from address
      return `https://www.google.com/maps?q=${encodeURIComponent(data.location.address)}&output=embed`;
    }
    
    return `https://www.google.com/maps?q=${encodeURIComponent(data.location.address)}&output=embed`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Location &amp; Contact
        </h2>
        <p className="text-neutral-600">
          Help customers find and contact your business
        </p>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="location"
          value={data.location.address}
          onChange={(e) => {
            updateData({ location: { ...data.location, address: e.target.value } });
            if (errors.location) {
              setErrors(prev => ({ ...prev, location: '' }));
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
            errors.location ? 'border-red-300 bg-red-50' : 'border-neutral-300'
          }`}
          placeholder="Enter your business address or Google Maps URL"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          You can paste a Google Maps URL or enter your full address
        </p>
      </div>

      {/* Map Preview */}
      {data.location.address && validateLocation(data.location.address) && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Map Preview
          </label>
          <div className="w-full h-64 border border-neutral-300 rounded-lg overflow-hidden">
            <iframe
              src={getMapEmbedUrl()}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business Location Map"
            />
          </div>
        </div>
      )}

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
          Contact Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(e) => {
            updateData({ phone: e.target.value });
            if (errors.phone) {
              setErrors(prev => ({ ...prev, phone: '' }));
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
            errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-300'
          }`}
          placeholder="+91 9876543210 or +1 234 567 8900"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          Enter Indian mobile number or international number in E.164 format
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" size="lg">
          <i className="ri-arrow-left-line mr-2"></i>
          Previous
        </Button>
        <Button onClick={handleNext} size="lg">
          Next: About &amp; Proof
          <i className="ri-arrow-right-line ml-2"></i>
        </Button>
      </div>
    </div>
  );
}
