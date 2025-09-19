import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { t } from '@/react-app/lib/i18n';

interface FAQItem {
  question: string;
  answer: string;
}

export default function Help() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [, forceUpdate] = useState({});

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems: FAQItem[] = [
    {
      question: 'How do I search for businesses?',
      answer: 'Use the search bar on the homepage to find businesses by name, category, or location. You can also browse by category or use voice search.'
    },
    {
      question: 'How do I add my business to FindVee?',
      answer: 'Click on "Add Business" in the header, fill out the form with your business details, and submit for admin approval.'
    },
    {
      question: 'Is FindVee free to use?',
      answer: 'Yes, FindVee is completely free for both customers searching for businesses and business owners listing their services.'
    },
    {
      question: 'How do I contact a business?',
      answer: 'You can call directly, send a WhatsApp message, or use our enquiry form to get in touch with any listed business.'
    },
    {
      question: 'Can I save my favorite businesses?',
      answer: 'Yes, sign in to your account and click the heart icon on any business card to save it to your favorites.'
    },
    {
      question: 'How long does business approval take?',
      answer: 'Business listings are typically reviewed and approved within 24-48 hours of submission.'
    },
    {
      question: 'Can I edit my business information?',
      answer: 'Contact our support team to make changes to your business listing. We\'ll help you update your information.'
    },
    {
      question: 'How does voice search work?',
      answer: 'Click the microphone icon in the search bar and speak your query. Make sure to allow microphone permissions in your browser.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('helpTitle')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('helpSubtitle')}
            </p>
          </div>

          <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('faqSectionTitle')}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {openItems.has(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('stillNeedHelp')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('cantFind')}
              </p>
              <a
                href="mailto:support@findvee.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              >
                {t('contactSupport')}
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
