import { useEffect, useState } from 'react';
import { useAuth } from '@/react-app/hooks/useAuth';
import { Navigate } from 'react-router';
import { t } from '@/react-app/lib/i18n';

export default function AuthCallback() {
  const { user, exchangeCodeForSessionToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback using Mocha's auth service
        await exchangeCodeForSessionToken();
        console.log('Auth callback successful');
      } catch (err) {
        setError(t('authFailed'));
        console.error('Auth callback error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [exchangeCodeForSessionToken]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('completingSignIn')}</h2>
          <p className="text-gray-600">{t('pleaseWait')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('authFailed')}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/login" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t('tryAgain')}
          </a>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('authFailed')}</h2>
        <p className="text-gray-600 mb-4">{t('thereWasIssue')}</p>
        <a 
          href="/login" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {t('tryAgain')}
        </a>
      </div>
    </div>
  );
}
