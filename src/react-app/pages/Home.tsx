import { useEffect, useState } from 'react';
import { Search, ChevronDown, Mic, MicOff } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import BusinessCard from '@/react-app/components/BusinessCard';
import { useLocation } from '@/react-app/hooks/useLocation';
import { t } from '@/react-app/lib/i18n';
import { getLanguage } from '@/react-app/lib/i18n';
import type { Business } from '@/shared/types';

export default function Home() {
  const { selectedCity } = useLocation();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
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
    fetchBusinesses();
  }, [selectedCity]);

  // Initialize voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsVoiceSupported(!!SpeechRecognition);
  }, []);

  // Listen for location changes
  useEffect(() => {
    const handleLocationChange = () => {
      fetchBusinesses();
    };
    
    window.addEventListener('locationChanged', handleLocationChange);
    return () => window.removeEventListener('locationChanged', handleLocationChange);
  }, []);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedCity) {
        params.append('city', selectedCity);
      }
      
      const response = await fetch(`/api/businesses?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
        setAllBusinesses(data); // Store all businesses for search
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setBusinesses(allBusinesses);
      return;
    }

    try {
      setIsSearching(true);
      const params = new URLSearchParams();
      params.append('q', query);
      if (selectedCity) {
        params.append('city', selectedCity);
      }
      
      const response = await fetch(`/api/businesses/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error searching businesses:', error);
    } finally {
      setIsSearching(false);
    }
  };

  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const handleVoiceSearch = () => {
    if (!isVoiceSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    // Set language based on current app language
    const currentLang = getLanguage();
    const localeMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      kn: 'kn-IN'
    };
    recognition.lang = localeMap[currentLang] || 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      performSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleCategoryClick = (category: string) => {
    const categoryQuery = t(category);
    setSearchTerm(categoryQuery);
    performSearch(categoryQuery);
  };

  const categories = [
    { 
      key: 'eat', 
      name: t('eat'),
      image: 'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'
    },
    { 
      key: 'stay', 
      name: t('stay'),
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/524691400.jpg?k=b9f5a16f1fbef88fe71a67cca664fad4f9161e8311944b06bfa6df02586bc72a&o=&hp=1'
    },
    { 
      key: 'health', 
      name: t('health'),
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVL8mJLJBgdhHhmbHfSkjCVkEUG6Kk5dGJw&s'
    },
    { 
      key: 'shop', 
      name: t('shop'),
      image: 'https://assets.aboutamazon.com/94/f0/6bb55e6c46c4bdfa42b785df989e/hero001-oct2024-deliveringthefuture-pharmacy-standard-hero-v1-2000x1125-jpg80.JPG'
    },
    { 
      key: 'petCare', 
      name: t('petCare'),
      image: 'https://www.loestro.com/wp-content/uploads/2024/12/0XgRa_E0821fgygRR-2SNuw7.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Hero Section - Clean and minimal like reference */}
        <section className="py-20 px-6">
          <div className="minimal-container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
            
            {/* Search Section - Enhanced with voice search */}
            <div className="max-w-4xl mx-auto mb-12">
              <form onSubmit={handleSearch}>
                <div className="search-bar p-4 flex items-center gap-4">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchPlaceholder', { city: selectedCity })}
                    className="flex-1 bg-transparent border-0 focus:outline-none text-gray-800 text-base"
                  />
                  
                  {/* Voice Search Button */}
                  {isVoiceSupported && (
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      disabled={isSearching}
                      className={`p-2 transition-all duration-300 rounded ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                      title={isListening ? t('listening') : t('voiceSearch')}
                    >
                      {isListening ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-2 bg-blue-600/80 backdrop-blur-lg border border-blue-500/30 text-white text-sm font-medium hover:bg-blue-700/90 hover:border-blue-400/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? t('searching') : t('search')}
                  </button>
                </div>
              </form>
              
              {/* Search Results Info */}
              {searchTerm && (
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    {isSearching ? t('searching') : t('foundResults', { count: businesses.length.toString(), query: searchTerm })}
                  </p>
                </div>
              )}
              
              {/* Category Cards - Visual style with images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className="group relative overflow-hidden bg-[#1a1f2e] border border-[#2d3748] hover:border-[#4a5568] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-white font-medium text-sm drop-shadow-lg">
                        {category.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Clean cards like reference */}
        <section className="py-12 px-6">
          <div className="minimal-container">

            {/* Profile Cards */}
            {businesses.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white text-xl font-semibold">{t('localBusinessesIn', { city: selectedCity })}</h3>
                  <span className="text-gray-400 text-sm">{t('verifiedTrusted')}</span>
                </div>
                
                {(isLoading || isSearching) ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="ml-3 text-gray-400">
                      {isSearching ? t('searchingBusinesses') : t('loadingBusinesses')}
                    </span>
                  </div>
                ) : businesses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.map((business) => (
                      <BusinessCard key={business.id} business={business} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      {searchTerm 
                        ? t('noBusinessesFound', { query: searchTerm, city: selectedCity })
                        : t('noBusinessesInCity', { city: selectedCity })
                      }
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setBusinesses(allBusinesses);
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600/80 backdrop-blur-lg border border-blue-500/30 text-white hover:bg-blue-700/90 hover:border-blue-400/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {t('clearSearch')}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section - Clean minimal style */}
        <section className="py-20 px-6">
          <div className="minimal-container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{t('faqTitle')}</h2>
              <p className="text-gray-400 text-lg">{t('faqSubtitle')}</p>
            </div>
            
            <div className="space-y-4">
              {[
                t('faqQuestion1'),
                t('faqQuestion2'),
                t('faqQuestion3'),
                t('faqQuestion4')
              ].map((question, index) => (
                <div key={index} className="faq-item">
                  <button className="w-full text-left p-6 focus:outline-none">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{question}</span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      
    </div>
  );
}
