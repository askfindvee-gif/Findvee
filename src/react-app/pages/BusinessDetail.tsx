import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Phone, Building, Star, MessageSquare, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '@/react-app/hooks/useAuth';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { t } from '@/react-app/lib/i18n';
import { supabase } from '@/react-app/lib/supabase';
import type { Business, Review } from '@/shared/types';

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [, forceUpdate] = useState({});

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  useEffect(() => {
    if (id) {
      fetchBusiness();
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      setAverageRating(Math.round(avg * 10) / 10);
      setTotalReviews(reviews.length);
      
      if (user) {
        setHasUserReviewed(reviews.some(review => review.user_id === user.id));
      }
    } else {
      setAverageRating(0);
      setTotalReviews(0);
      setHasUserReviewed(false);
    }
  }, [reviews, user]);

  const fetchBusiness = async () => {
    try {
      const response = await fetch(`/api/businesses/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBusiness(data);
        
        // Track view and store in recently viewed
        trackBusinessView(data);
        storeRecentlyViewed(data);
      } else if (response.status === 404) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error fetching business:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackBusinessView = async (business: Business) => {
    try {
      await fetch(`/api/businesses/${business.id}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error tracking business view:', error);
    }
  };

  const storeRecentlyViewed = (business: Business) => {
    try {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      
      // Remove if already exists to avoid duplicates
      const filtered = recentlyViewed.filter((b: Business) => b.id !== business.id);
      
      // Add to beginning of array
      filtered.unshift(business);
      
      // Keep only last 10 items
      const updated = filtered.slice(0, 10);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    } catch (error) {
      console.error('Error storing recently viewed:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/businesses/${id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleCall = () => {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (business?.phone) {
      const cleanPhone = business.phone.replace(/[^\d+]/g, '');
      const businessLocation = business.city ? ` in ${business.city}` : '';
      const message = encodeURIComponent(`Hello ${business.name}${businessLocation}, I have an enquiry about your services. Could you please get back to me?`);
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || hasUserReviewed) return;

    setIsSubmittingReview(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`/api/businesses/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(reviewForm),
      });

      if (response.ok) {
        setReviewForm({ rating: 5, comment: '' });
        fetchReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    if (target.nextElementSibling) {
      (target.nextElementSibling as HTMLElement).style.display = 'flex';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('businessNotFound')}</h2>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToHome')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToSearch')}
          </button>

          {/* Business Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {business.image_url ? (
                  <>
                    <img
                      src={business.image_url}
                      alt={`${business.name} image`}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-48 rounded-lg object-cover border border-gray-200 mb-4"
                    />
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg items-center justify-center hidden mb-4">
                      <div className="text-center">
                        <Building className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-500">No image available</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Building className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-500">No image available</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                  {business.category && (
                    <p className="text-lg text-gray-600 mb-2">{business.category}</p>
                  )}
                  
                  {totalReviews > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      {renderStars(Math.round(averageRating))}
                      <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
                      <span className="text-gray-600">({totalReviews} {totalReviews === 1 ? 'review' : t('reviews')})</span>
                    </div>
                  )}
                </div>

                {business.address && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('address')}</h3>
                    <p className="text-gray-700">{business.address}</p>
                    {business.city && <p className="text-gray-700">{business.city}</p>}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  {business.phone && (
                    <>
                      <button
                        onClick={handleCall}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        {t('callNow')}
                      </button>
                      
                      <button
                        onClick={handleWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        {t('whatsapp')}
                      </button>
                    </>
                  )}
                  
                  <Link
                    to={`/lead?biz=${business.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('enquire')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {t('reviews')} {totalReviews > 0 && `(${totalReviews})`}
              </h2>
            </div>

            {/* Add Review Form */}
            {user && !hasUserReviewed && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">{t('addYourReview')}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('rating')}
                    </label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} {rating !== 1 ? t('stars') : t('star')}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('comment')} ({t('optional')})
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('shareExperience')}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSubmittingReview ? t('submitting') : t('submitReview')}
                  </button>
                </div>
              </form>
            )}

            {!user && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  <a href="/login" className="font-medium hover:underline">{t('signIn')}</a> {t('signInToReview')}
                </p>
              </div>
            )}

            {hasUserReviewed && user && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">{t('alreadyReviewed')}</p>
              </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          {renderStars(review.rating, 'sm')}
                          <span className="text-sm font-medium text-gray-900">{review.rating}/5</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {t('by')} {t('anonymous')} • {new Date(review.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t('noReviewsYet')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
