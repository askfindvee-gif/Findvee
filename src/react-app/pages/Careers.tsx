import { useEffect, useState } from 'react';
import { Briefcase, Users, Zap, Heart, Send, MapPin, Clock } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';


export default function Careers() {
  const [, forceUpdate] = useState({});
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Growth Opportunities',
      description: 'Be part of building India\'s next big local services platform from the ground up.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Culture',
      description: 'Work with a passionate team that values innovation, creativity, and local impact.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Work-Life Balance',
      description: 'Flexible work arrangements and a supportive environment for your personal growth.'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Competitive Benefits',
      description: 'Fair compensation, equity participation, and comprehensive benefits package.'
    }
  ];

  const openings = [
    {
      title: 'Full Stack Developer',
      type: 'Full-time',
      location: 'Udupi / Remote',
      experience: '2-4 years',
      description: 'Help us build and scale FindVee\'s core platform using modern web technologies.',
      responsibilities: [
        'Develop and maintain web applications using React, Node.js, and TypeScript',
        'Design and implement RESTful APIs and database schemas',
        'Collaborate with design team to create intuitive user interfaces',
        'Optimize application performance and scalability'
      ],
      requirements: [
        'Experience with React, Node.js, and TypeScript',
        'Knowledge of databases (SQL/NoSQL)',
        'Understanding of web security best practices',
        'Strong problem-solving and communication skills'
      ]
    },
    {
      title: 'Business Development Associate',
      type: 'Full-time',
      location: 'Udupi',
      experience: '1-3 years',
      description: 'Drive growth by onboarding local businesses and building community partnerships.',
      responsibilities: [
        'Identify and onboard local service providers',
        'Build relationships with business owners in target cities',
        'Develop strategies to increase platform adoption',
        'Analyze market trends and competitive landscape'
      ],
      requirements: [
        'Excellent communication skills in English, Hindi, and Kannada',
        'Experience in sales, business development, or partnerships',
        'Understanding of local business ecosystems',
        'Self-motivated with strong relationship-building skills'
      ]
    },
    {
      title: 'Product Designer',
      type: 'Full-time / Contract',
      location: 'Remote',
      experience: '2-5 years',
      description: 'Shape the user experience of FindVee across web and mobile platforms.',
      responsibilities: [
        'Design user-centered interfaces for web and mobile applications',
        'Conduct user research and usability testing',
        'Create wireframes, prototypes, and high-fidelity designs',
        'Collaborate with developers to ensure design implementation'
      ],
      requirements: [
        'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
        'Strong portfolio demonstrating UX/UI design skills',
        'Understanding of user research methodologies',
        'Knowledge of responsive and mobile-first design principles'
      ]
    },
    {
      title: 'Marketing Specialist',
      type: 'Full-time',
      location: 'Udupi / Remote',
      experience: '1-3 years',
      description: 'Drive brand awareness and user acquisition through digital marketing strategies.',
      responsibilities: [
        'Develop and execute digital marketing campaigns',
        'Manage social media presence across platforms',
        'Create content for blogs, newsletters, and promotional materials',
        'Analyze marketing performance and optimize campaigns'
      ],
      requirements: [
        'Experience with digital marketing tools and platforms',
        'Strong content creation and copywriting skills',
        'Knowledge of SEO, SEM, and social media marketing',
        'Data-driven approach to marketing optimization'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-black">
        {/* Hero Section */}
        <div className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Help us build India's most trusted local services platform. 
              Start your journey with FindVee and make a real impact in communities across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#openings" className="btn-primary-clean px-8 py-3 text-lg font-medium">
                View Open Positions
              </a>
              <a href="mailto:careers@findvee.com" className="btn-secondary-clean px-8 py-3 text-lg font-medium">
                Send Us Your Resume
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Why Join Us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join FindVee?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="clean-card p-8 text-center">
                  <div className="text-white mb-6 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Culture */}
          <div className="mb-20">
            <div className="clean-card p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Our Culture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Innovation First</h3>
                  <p className="text-gray-300">
                    We embrace new ideas, encourage experimentation, and aren't afraid to fail fast and learn faster.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Local Impact</h3>
                  <p className="text-gray-300">
                    Every feature we build and every decision we make is guided by our mission to serve local communities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Transparency</h3>
                  <p className="text-gray-300">
                    Open communication, honest feedback, and shared ownership of both successes and challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div id="openings" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <div key={index} className="clean-card overflow-hidden">
                  <div 
                    className="p-8 cursor-pointer hover:bg-gray-800/50 transition-colors"
                    onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          <span className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </span>
                        </div>
                        <p className="text-gray-300 mt-4">{job.description}</p>
                      </div>
                      <button className="btn-secondary-clean px-6 py-2 ml-4">
                        {selectedJob === index ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>
                  
                  {selectedJob === index && (
                    <div className="border-t border-gray-700 p-8 bg-gray-800/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Responsibilities</h4>
                          <ul className="space-y-2 text-gray-300">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-white mt-1">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Requirements</h4>
                          <ul className="space-y-2 text-gray-300">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-white mt-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <a
                          href={`mailto:careers@findvee.com?subject=Application for ${job.title}&body=Hi FindVee Team,%0D%0A%0D%0AI am interested in the ${job.title} position. Please find my resume attached.%0D%0A%0D%0AThank you!`}
                          className="btn-primary-clean px-8 py-3 inline-flex items-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>Apply Now</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Don't See Your Role */}
          <div className="clean-card p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for connecting communities. 
              Send us your resume and tell us how you'd like to contribute to FindVee's mission.
            </p>
            <a
              href="mailto:careers@findvee.com?subject=General Application&body=Hi FindVee Team,%0D%0A%0D%0AI'm interested in joining your team. Here's how I think I can contribute to FindVee's mission:%0D%0A%0D%0A[Tell us about yourself and your interests]%0D%0A%0D%0AThank you!"
              className="btn-primary-clean px-8 py-3 inline-flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Your Resume</span>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
