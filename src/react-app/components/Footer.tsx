import { useEffect, useState } from 'react';
import { t } from '@/react-app/lib/i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, forceUpdate] = useState({});

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const footerSections = [
    {
      title: t('company'),
      links: [
        { label: t('aboutUs'), href: '/about' },
        { label: t('careers'), href: '/careers' },
        { label: t('contact'), href: '/contact' },
        { label: t('blog'), href: '#' }
      ]
    },
    {
      title: t('legal'),
      links: [
        { label: t('privacyPolicy'), href: '#' },
        { label: t('termsOfService'), href: '#' },
        { label: t('cookiePolicy'), href: '#' },
        { label: t('disclaimer'), href: '#' }
      ]
    },
    {
      title: t('vendors'),
      links: [
        { label: t('listYourBusiness'), href: '/vendor/add' },
        { label: t('vendorGuidelines'), href: '#' },
        { label: t('pricing'), href: '#' },
        { label: t('support'), href: '#' }
      ]
    },
    {
      title: t('follow'),
      links: [
        { label: t('facebook'), href: '#' },
        { label: t('twitter'), href: '#' },
        { label: t('instagram'), href: '#' },
        { label: t('linkedin'), href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-black border-t border-gray-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title} className="clean-card p-6">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-gray-400 text-sm">
            {t('footerCopyright', { year: currentYear.toString() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
