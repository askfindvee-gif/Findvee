
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

interface Step4PreviewSubmitProps {
  data: VendorData;
  onSubmit: () => void;
  onPrev: () => void;
}

export default function Step4PreviewSubmit({ 
  data, 
  onSubmit, 
  onPrev 
}: Step4PreviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMapEmbedUrl = () => {
    try {
      const url = new URL(data.location);
      if (url.hostname.includes('google.com') || url.hostname.includes('maps.google.com')) {
        return data.location;
      }
    } catch {
      return `https://www.google.com/maps?q=${encodeURIComponent(data.location)}&output=embed`;
    }
    
    return `https://www.google.com/maps?q=${encodeURIComponent(data.location)}&output=embed`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Review &amp; Submit
        </h2>
        <p className="text-neutral-600">
          Please review your information before submitting your business listing
        </p>
      </div>

      {/* Preview Card */}
      <div className="border border-neutral-200 rounded-lg p-6 bg-white shadow-sm">
        <div className="space-y-6">
          {/* Basic Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
              <i className="ri-store-line mr-2"></i>
              Basic Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-neutral-700">Business Name:</span>
                <p className="text-neutral-900">{data.businessName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-neutral-700">Categories:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
              <i className="ri-map-pin-line mr-2"></i>
              Location &amp; Contact
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-neutral-700">Location:</span>
                <p className="text-neutral-900 text-sm">{data.location}</p>
              </div>
              
              {/* Map Preview */}
              <div className="w-full h-48 border border-neutral-300 rounded-lg overflow-hidden">
                <iframe
                  src={getMapEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business Location Preview"
                />
              </div>
              
              <div>
                <span className="text-sm font-medium text-neutral-700">Phone:</span>
                <p className="text-neutral-900">{data.phone}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
              <i className="ri-information-line mr-2"></i>
              About
            </h3>
            <div>
              <span className="text-sm font-medium text-neutral-700">Description:</span>
              <p className="text-neutral-900 text-sm mt-1 leading-relaxed">{data.description}</p>
            </div>
          </div>

          {/* Proof Section */}
          {data.proofFile && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <i className="ri-shield-check-line mr-2"></i>
                Proof of Business
              </h3>
              <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {data.proofFile.type.startsWith('image/') ? (
                      <i className="ri-image-line text-xl text-green-600"></i>
                    ) : (
                      <i className="ri-file-pdf-line text-xl text-red-600"></i>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{data.proofFile.name}</p>
                    <p className="text-xs text-neutral-500">{formatFileSize(data.proofFile.size)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="ri-information-line text-blue-600 mt-0.5"></i>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">What happens next?</p>
            <ul className="space-y-1 text-xs">
              <li>• Your listing will be reviewed by our team within 24 hours</li>
              <li>• We'll contact you at {data.phone} with approval status</li>
              <li>• Once approved, your business will appear on FindVee</li>
              <li>• You'll receive access to manage your business profile</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" size="lg" disabled={isSubmitting}>
          <i className="ri-arrow-left-line mr-2"></i>
          Previous
        </Button>
        <Button 
          onClick={handleSubmit} 
          size="lg" 
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line mr-2 animate-spin"></i>
              Submitting...
            </>
          ) : (
            <>
              <i className="ri-check-line mr-2"></i>
              Submit Business Listing
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
