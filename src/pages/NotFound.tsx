import { useEffect } from 'react';

export default function NotFound() {
  // SEO for 404 page
  useEffect(() => {
    document.title = '404 - Page Not Found | FindVee';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. Return to FindVee to discover local services in Udupi, Manipal, Kundapura & Koteshwara.');
    }

    // Add noindex to 404 pages
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      const newRobotsMeta = document.createElement('meta');
      newRobotsMeta.name = 'robots';
      newRobotsMeta.content = 'noindex, nofollow';
      document.head.appendChild(newRobotsMeta);
    }

    return () => {
      // Reset robots meta on unmount
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl md:text-5xl font-semibold text-gray-100">404</h1>
      <h1 className="text-2xl md:text-3xl font-semibold mt-6">This page has not been generated</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-500">Tell me what you would like on this page</p>
    </div>
  );
}