
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

interface Step3AboutProofProps {
  data: VendorData;
  updateData: (data: Partial<VendorData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3AboutProof({ 
  data, 
  updateData, 
  onNext, 
  onPrev 
}: Step3AboutProofProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.description.trim()) {
      newErrors.description = 'Business description is required';
    } else if (data.description.length < 20 || data.description.length > 400) {
      newErrors.description = 'Description must be between 20 and 400 characters';
    }

    // Proof file is optional, but if provided, validate it
    if (data.proofFile) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(data.proofFile.type)) {
        newErrors.proofFile = 'Please upload a PNG, JPG, JPEG, or PDF file';
      } else if (data.proofFile.size > maxSize) {
        newErrors.proofFile = 'File size must be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ proofFile: file });
    
    if (errors.proofFile) {
      setErrors(prev => ({ ...prev, proofFile: '' }));
    }
  };

  const removeFile = () => {
    updateData({ proofFile: null });
    // Reset file input
    const fileInput = document.getElementById('proofFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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
          About &amp; Proof
        </h2>
        <p className="text-neutral-600">
          Tell customers about your business and provide verification
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={data.description}
          onChange={(e) => {
            updateData({ description: e.target.value });
            if (errors.description) {
              setErrors(prev => ({ ...prev, description: '' }));
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
            errors.description ? 'border-red-300 bg-red-50' : 'border-neutral-300'
          }`}
          placeholder="Describe your services, specialties, hours, delivery options, and what makes your business special..."
          maxLength={400}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          {data.description.length}/400 characters (minimum 20 required)
        </p>
        <div className="mt-2 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-lg">
          <strong>Tip:</strong> Include information about:
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Services you offer</li>
            <li>Your specialties or unique features</li>
            <li>Operating hours</li>
            <li>Delivery or pickup options</li>
            <li>What makes you different from competitors</li>
          </ul>
        </div>
      </div>

      {/* Proof of Business */}
      <div>
        <label htmlFor="proofFile" className="block text-sm font-medium text-neutral-700 mb-2">
          Proof of Business (Optional)
        </label>
        
        {!data.proofFile ? (
          <div className="relative">
            <input
              type="file"
              id="proofFile"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-neutral-400 transition-colors cursor-pointer ${
              errors.proofFile ? 'border-red-300 bg-red-50' : 'border-neutral-300'
            }`}>
              <i className="ri-upload-cloud-2-line text-3xl text-neutral-400 mb-2"></i>
              <p className="text-sm text-neutral-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-neutral-500">
                PNG, JPG, JPEG, or PDF (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-neutral-300 rounded-lg p-4 bg-neutral-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {data.proofFile.type.startsWith('image/') ? (
                    <i className="ri-image-line text-2xl text-green-600"></i>
                  ) : (
                    <i className="ri-file-pdf-line text-2xl text-red-600"></i>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{data.proofFile.name}</p>
                  <p className="text-xs text-neutral-500">{formatFileSize(data.proofFile.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-600 hover:text-red-800 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>
        )}
        
        {errors.proofFile && (
          <p className="mt-1 text-sm text-red-600">{errors.proofFile}</p>
        )}
        
        <p className="mt-2 text-xs text-neutral-500">
          Upload business license, registration certificate, or any document that proves your business legitimacy
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline" size="lg">
          <i className="ri-arrow-left-line mr-2"></i>
          Previous
        </Button>
        <Button onClick={handleNext} size="lg">
          Next: Review &amp; Submit
          <i className="ri-arrow-right-line ml-2"></i>
        </Button>
      </div>
    </div>
  );
}
