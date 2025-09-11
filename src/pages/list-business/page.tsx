
import { useEffect } from 'react';
import VendorOnboarding from './components/VendorOnboarding';

export default function ListBusinessPage() {
  const handleSubmit = async (data: any) => {
    console.log('Business submission:', data);
    // Here you would integrate with your backend API
    // For now, just show success message
    alert('Thank you! Your business listing has been submitted for review. We will contact you within 24 hours.');
  };

  // SEO Schema.org JSON-LD
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "List Your Business - FindVee",
      "description": "Join FindVee and reach more customers in your area. List your business on our local service discovery platform.",
      "url": `${process.env.VITE_SITE_URL || "https://example.com"}/list-business`,
      "mainEntity": {
        "@type": "Service",
        "name": "Business Listing Service",
        "description": "Help local businesses get discovered by customers in Udupi, Manipal, Kundapura & Koteshwara",
        "provider": {
          "@type": "Organization",
          "name": "FindVee"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Udupi"
          },
          {
            "@type": "City",
            "name": "Manipal" 
          },
          {
            "@type": "City",
            "name": "Kundapura"
          },
          {
            "@type": "City",
            "name": "Koteshwara"
          }
        ]
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": process.env.VITE_SITE_URL || "https://example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "List Your Business",
          "item": `${process.env.VITE_SITE_URL || "https://example.com"}/list-business`
        }
      ]
    };

    // Add schemas to head
    const addSchema = (schemaData: any, id: string) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    };

    addSchema(schema, 'list-business-schema');
    addSchema(breadcrumbSchema, 'list-business-breadcrumb');

    // Update page title and meta description
    document.title = 'List Your Business - FindVee | Join Local Service Directory';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join FindVee and reach more customers in Udupi, Manipal, Kundapura & Koteshwara. List your business on our local service discovery platform.');
    }

    return () => {
      // Cleanup on unmount
      ['list-business-schema', 'list-business-breadcrumb'].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">List Your Business</h1>
          <p className="text-neutral-600">Join FindVee and reach more customers in your area</p>
        </div>
        
        <VendorOnboarding onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
