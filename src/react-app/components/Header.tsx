import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/react-app/hooks/useAuth';
import { useLocation, SUPPORTED_CITIES } from '@/react-app/hooks/useLocation';
import { ChevronDown, Menu, X, MapPin, Navigation } from 'lucide-react';
import { getLanguage, setLanguage, t, languages, type Language } from '@/react-app/lib/i18n';

export default function Header() {
  const { user, logout } = useAuth();
  const { selectedCity, setSelectedCity, isDetecting, requestLocation } = useLocation();
  const [currentLang, setCurrentLang] = useState<Language>(getLanguage());
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentLang(getLanguage());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    setShowLangDropdown(false);
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChanged'));
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    if (target.parentElement) {
      target.parentElement.innerHTML = '<span class="text-xl font-bold text-gray-900">FindVee</span>';
    }
  };

  return (
    <header className="header-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="https://mocha-cdn.com/01994c7c-6e49-71a3-9cea-2549fd011623/FindVee_Text_Black.png" 
              alt="FindVee" 
              referrerPolicy="no-referrer"
              onError={handleLogoError}
              className="h-20 w-auto sm:h-24 lg:h-32 glow-effect"
              style={{ filter: 'invert(1) brightness(1.2)' }}
            />
          </Link>

          {/* Center - Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              to="/help" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('help')}
            </Link>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-3">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center space-x-2 btn-secondary-clean px-4 py-2 text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      requestLocation();
                      setShowLocationDropdown(false);
                    }}
                    disabled={isDetecting}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-white border-b border-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
                      <span>{isDetecting ? t('detecting') : t('detectLocation')}</span>
                    </div>
                  </button>
                  {SUPPORTED_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowLocationDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-white ${
                        selectedCity === city ? 'bg-gray-700 font-medium' : ''
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 btn-secondary-clean px-4 py-2 text-sm font-medium"
              >
                <span>{languages[currentLang]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 shadow-xl z-50 overflow-hidden">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code as Language)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-white ${
                        currentLang === code ? 'bg-gray-700 font-medium' : ''
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Controls */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/vendor/add"
                  className="hidden sm:inline-flex items-center px-4 py-2 btn-secondary-clean text-sm font-medium"
                >
                  {t('addBusiness')}
                </Link>
                <button
                  onClick={logout}
                  className="btn-secondary-clean px-4 py-2 text-sm font-medium"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn-secondary-clean px-4 py-2 text-sm font-medium"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary-clean px-4 py-2 text-sm font-medium"
                >
                  {t('signUp')}
                </Link>
                <Link
                  to="/vendor/add"
                  className="hidden sm:inline-flex items-center px-4 py-2 btn-secondary-clean text-sm font-medium"
                >
                  {t('addBusiness')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-600 py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/help" 
                className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('help')}
              </Link>
              <Link
                to="/vendor/add"
                className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('addBusiness')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(showLangDropdown || showLocationDropdown || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowLangDropdown(false);
            setShowLocationDropdown(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
}
