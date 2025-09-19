import { Building } from 'lucide-react';
import { Link } from 'react-router';
import { t } from '@/react-app/lib/i18n';
import type { Business } from '@/shared/types';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    if (target.nextElementSibling) {
      (target.nextElementSibling as HTMLElement).style.display = 'flex';
    }
  };

  return (
    <div className="w-full">
      <div className="bg-black border border-gray-600 min-h-[350px] sm:min-h-[380px] lg:min-h-[400px] flex flex-col p-5 sm:p-6 hover:border-gray-400 hover:-translate-y-1 transition-all duration-300">
        
        {/* Image Section - Fixed size */}
        <div className="flex-shrink-0 mb-5">
          {business.image_url ? (
            <>
              <img
                src={business.image_url}
                alt={`${business.name} image`}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 object-cover border border-[#4a5568]"
              />
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-800 hidden items-center justify-center">
                <Building className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
            </>
          ) : (
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-800 flex items-center justify-center">
              <span className="text-white font-semibold text-lg sm:text-xl lg:text-2xl">
                {business.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content Section - Flexible */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Header - Business Info */}
          <div className="mb-4">
            <h3 className="text-white font-semibold text-base sm:text-lg lg:text-xl leading-tight mb-2 line-clamp-2 min-h-[2.5em] sm:min-h-[3em]">
              {business.name}
            </h3>
            
            <div className="space-y-1">
              {business.category && (
                <p className="text-gray-400 text-sm font-medium">{business.category}</p>
              )}
              {business.city && (
                <p className="text-gray-500 text-xs">{business.city}</p>
              )}
            </div>
          </div>

          {/* Description - Expandable */}
          <div className="flex-1 mb-6">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-4 min-h-[4.5em] sm:min-h-[5em]">
              {business.short_desc || business.address || t('professionalService')}
            </p>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Link
              to={`/business/${business.id}`}
              className="bg-white/15 backdrop-blur-lg border border-white/25 text-white text-sm font-medium py-3 px-4 text-center hover:bg-white/25 hover:border-white/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 glass-button"
              style={{ 
                borderRadius: '0px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              {t('viewDetails')}
            </Link>
            <Link
              to={`/lead?biz=${business.id}`}
              className="bg-black/30 backdrop-blur-lg border border-white/15 text-white text-sm font-medium py-3 px-4 text-center hover:bg-black/40 hover:border-white/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 glass-button"
              style={{ 
                borderRadius: '0px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {t('sendMessage')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
