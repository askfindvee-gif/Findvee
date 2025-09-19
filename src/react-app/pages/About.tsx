import { useEffect, useState } from 'react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';

export default function About() {
  const [, forceUpdate] = useState({});

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-black">
        {/* Hero Section */}
        <div className="py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">
              About Us
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Making everyday life easier by connecting you with trusted local services
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          {/* Who We Are */}
          <section className="py-24 border-t border-gray-600">
            <h2 className="text-3xl font-light text-white mb-12">Who We Are</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              At FindVee, we believe accessing essential services in your city should be as easy as a single click. 
              Whether it is ordering medicines, booking a lab test, arranging daily tiffin, or getting groceries 
              delivered — we bring your city's trusted services to your fingertips.
            </p>
          </section>

          {/* Vision */}
          <section className="py-24 border-t border-gray-800">
            <h2 className="text-3xl font-light text-white mb-12">Our Vision</h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              To become India's most reliable local services platform, starting from Udupi and Kundapura, 
              and growing into a national super-app that connects people with everything they need — quickly, 
              seamlessly, and transparently.
            </p>
          </section>

          {/* What Makes Us Different */}
          <section className="py-24 border-t border-gray-800">
            <h2 className="text-3xl font-light text-white mb-16">What Makes Us Different</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Built for Local Communities</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  We highlight the services around you, not generic listings.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Verified Businesses</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Every vendor goes through a basic approval process to ensure trust.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Seamless Search & Booking</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  A 3-click experience designed for simplicity.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Regional First</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Support in English, Hindi, and Kannada, so everyone feels at home.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Free for Everyone</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  No fees for customers or vendors while we grow together.
                </p>
              </div>
            </div>
          </section>

          {/* Our Journey */}
          <section className="py-24 border-t border-gray-800">
            <h2 className="text-3xl font-light text-white mb-12">Our Journey</h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              We started FindVee with one simple idea: make everyday life easier by helping people access 
              reliable services without endless phone calls or confusion. Today, we are starting small — 
              Udupi, Kundapura, Manipal — but we dream big: a platform that can serve every city in India.
            </p>
          </section>

          {/* Our Promise */}
          <section className="py-24 border-t border-gray-800">
            <h2 className="text-3xl font-light text-white mb-16">Our Promise</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">To our customers</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Trust, convenience, and simplicity.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">To our vendors</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Visibility, growth, and community connection.
                </p>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-gray-800">
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Together, we are building not just an app, but a movement for smarter local living.
              </p>
            </div>
          </section>
        </div>
        
        {/* Bottom spacing */}
        <div className="pb-32"></div>
      </main>
      
      <Footer />
    </div>
  );
}
