import { useEffect, useState } from 'react';
import { useAuth } from '@/react-app/hooks/useAuth';
import { Navigate, Link } from 'react-router';
import { t } from '@/react-app/lib/i18n';

export default function SignUp() {
  const { user, isPending, redirectToLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useState({});

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await redirectToLogin();
    } catch (error) {
      console.error('Sign up error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://mocha-cdn.com/01994c7c-6e49-71a3-9cea-2549fd011623/FindVee_Text_Black.png" 
                alt="FindVee" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<h1 class="text-2xl font-bold text-gray-900">FindVee</h1>';
                  }
                }}
                className="h-48 sm:h-56 lg:h-64 w-auto"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('createAccount')}</h2>
            <p className="text-gray-600">{t('joinFindVeeToday')}</p>
          </div>
          
          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mb-4"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : null}
            {isLoading ? t('creating_account') : t('createAccountWithGoogle')}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('signInHere')}
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p className="mb-2">{t('signUpBenefits')}</p>
              <ul className="space-y-1">
                <li>• {t('saveBusinesses')}</li>
                <li>• {t('leaveReviews')}</li>
                <li>• {t('manageEnquiries')}</li>
                <li>• {t('addYourBusiness')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
