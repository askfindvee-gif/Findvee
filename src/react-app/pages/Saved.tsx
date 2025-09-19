import { useEffect, useState } from 'react';
import { Heart, Building } from 'lucide-react';
import { useAuth } from '@/react-app/hooks/useAuth';
import { Link } from 'react-router';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import BusinessCard from '@/react-app/components/BusinessCard';
import { supabase } from '@/react-app/lib/supabase';
import type { Business } from '@/shared/types';

export default function Saved() {
  const { user } = useAuth();
  const [savedBusinesses, setSavedBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedBusinesses();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchSavedBusinesses = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSavedBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching saved businesses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your saved businesses</h2>
            <p className="text-gray-600 mb-6">Keep track of your favorite local services</p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-500 fill-red-500" />
              Saved Businesses
            </h1>
            <p className="text-gray-600">Your favorite local services</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : savedBusinesses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved businesses yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring and save your favorite local services
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Building className="w-4 h-4 mr-2" />
                Browse Businesses
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {savedBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
