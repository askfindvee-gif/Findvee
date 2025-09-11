
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

interface Step1BasicProps {
  data: VendorData;
  updateData: (data: Partial<VendorData>) => void;
  onNext: () => void;
}

const categoryOptions = [
  'Restaurant',
  'Tiffin/Meals',
  'Pharmacy',
  'Ambulance',
  'PG/Rooms',
  'General Store'
];

export default function Step1Basic({ data, updateData, onNext }: Step1BasicProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (data.businessName.length < 2 || data.businessName.length > 80) {
      newErrors.businessName = 'Business name must be between 2 and 80 characters';
    }

    if (data.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const toggleCategory = (category: string) => {
    const newCategories = data.categories.includes(category)
      ? data.categories.filter(c => c !== category)
      : [...data.categories, category];
    
    updateData({ categories: newCategories });
    
    // Clear category error when user selects a category
    if (newCategories.length > 0 && errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Basic Information
        </h2>
        <p className="text-neutral-600">
          Tell us about your business and what category it belongs to
        </p>
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="businessName"
          value={data.businessName}
          onChange={(e) => {
            updateData({ businessName: e.target.value });
            if (errors.businessName) {
              setErrors(prev => ({ ...prev, businessName: '' }));
            }
          }}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
            errors.businessName ? 'border-red-300 bg-red-50' : 'border-neutral-300'
          }`}
          placeholder="Enter your business name"
          maxLength={80}
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          {data.businessName.length}/80 characters
        </p>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Business Categories <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryOptions.map((category) => {
            const isSelected = data.categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        {errors.categories && (
          <p className="mt-2 text-sm text-red-600">{errors.categories}</p>
        )}
        <p className="mt-2 text-xs text-neutral-500">
          Select all categories that apply to your business
        </p>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleNext} size="lg">
          Next: Location &amp; Contact
          <i className="ri-arrow-right-line ml-2"></i>
        </Button>
      </div>
    </div>
  );
}
