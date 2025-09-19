export type Language = 'en' | 'hi' | 'kn';

export const languages = {
  en: 'English',
  hi: 'हिंदी', 
  kn: 'ಕನ್ನಡ'
};

export const dictionary = {
  en: {
    // Header
    home: 'Home',
    help: 'Help',
    login: 'Login',
    signUp: 'Sign Up',
    addBusiness: 'Add Business',
    logout: 'Logout',
    detectLocation: 'Detect my location',
    detecting: 'Detecting...',
    
    // Hero
    heroTitle: 'Your simple local concierge.',
    heroSubtitle: 'Meals, stays, health, and shops in your city.',
    searchPlaceholder: 'Ask anything in {city} (e.g., "Find PG near Manipal", "Best pharmacy", "Restaurants open now")',
    search: 'Search',
    searching: 'Searching...',
    
    // Categories
    popularCategories: 'Popular Categories',
    eat: 'Eat',
    stay: 'Stay', 
    health: 'Health',
    shop: 'Shop',
    petCare: 'Pet Care',
    explore: 'Explore',
    
    // Category descriptions
    stayDesc: 'PGs & rooms you can trust.',
    eatDesc: 'Veg tiffins & restaurants nearby.',
    healthDesc: 'Pharmacies, ambulances & diagnostics.',
    shopDesc: 'Trusted general stores.',
    petCareDesc: 'Pet supplies & grooming services.',
    
    // Business section
    localBusinessesIn: 'Local businesses in {city}',
    verifiedTrusted: 'Verified and trusted',
    foundResults: 'Found {count} results for "{query}"',
    noBusinessesFound: 'No businesses found for "{query}" in {city}',
    noBusinessesInCity: 'No businesses found in {city}',
    clearSearch: 'Clear search',
    searchingBusinesses: 'Searching businesses...',
    loadingBusinesses: 'Loading businesses...',
    
    // Business cards
    viewDetails: 'View Details',
    sendMessage: 'Send Message',
    enquire: 'Enquire',
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    professionalService: 'Professional service provider focused on delivering high-quality solutions for your needs.',
    
    // FAQ
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Everything you need to know about finding local services in your city.',
    faqQuestion1: 'How do I find local businesses in my area?',
    faqQuestion2: 'Are all businesses on FindVee verified?',
    faqQuestion3: 'How can I add my business to FindVee?',
    faqQuestion4: 'Is FindVee available in my city?',
    
    // Footer
    company: 'Company',
    legal: 'Legal',
    vendors: 'Vendors',
    follow: 'Follow',
    aboutUs: 'About Us',
    careers: 'Careers',
    contact: 'Contact',
    blog: 'Blog',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    disclaimer: 'Disclaimer',
    listYourBusiness: 'List Your Business',
    vendorGuidelines: 'Vendor Guidelines',
    pricing: 'Pricing',
    support: 'Support',
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    footerCopyright: '© {year} FindVee | Made simple for your city.',
    
    // Help & Support
    helpTitle: 'Help & Support',
    helpSubtitle: 'Find answers to common questions about using FindVee',
    faqSectionTitle: 'Frequently Asked Questions',
    stillNeedHelp: 'Still need help?',
    cantFind: 'Can\'t find what you\'re looking for? Get in touch with our support team.',
    contactSupport: 'Contact Support',
    
    // Auth
    welcomeToFindVee: 'Welcome to FindVee',
    welcomeBack: 'Welcome back',
    signInToContinue: 'Sign in to continue to FindVee',
    createAccount: 'Create your account',
    joinFindVeeToday: 'Join FindVee today and discover local services',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signInHere: 'Sign in here',
    createOne: 'Create one',
    aiPoweredConcierge: 'Your AI-powered local services concierge',
    signInWithGoogle: 'Sign in with Google',
    createAccountWithGoogle: 'Create account with Google',
    signing_in: 'Signing in...',
    creating_account: 'Creating account...',
    signUpBenefits: 'Benefits of creating an account:',
    saveBusinesses: 'Save your favorite businesses',
    leaveReviews: 'Leave reviews and ratings',
    manageEnquiries: 'Manage your enquiries',
    addYourBusiness: 'Add your business to FindVee',
    completingSignIn: 'Completing sign in...',
    pleaseWait: 'Please wait while we authenticate your account.',
    authFailed: 'Authentication failed',
    thereWasIssue: 'There was an issue signing you in.',
    tryAgain: 'Try Again',
    
    // Business details
    backToSearch: 'Back to search',
    businessNotFound: 'Business Not Found',
    backToHome: 'Back to Home',
    address: 'Address',
    reviews: 'Reviews',
    addYourReview: 'Add Your Review',
    rating: 'Rating',
    stars: 'Stars',
    star: 'Star',
    comment: 'Comment',
    optional: 'optional',
    shareExperience: 'Share your experience...',
    submitReview: 'Submit Review',
    submitting: 'Submitting...',
    signInToReview: 'Sign in to leave a review.',
    alreadyReviewed: 'You have already reviewed this business.',
    noReviewsYet: 'No reviews yet. Be the first to review this business!',
    by: 'by',
    anonymous: 'Anonymous',
    
    // Leads/Enquiry
    sendEnquiry: 'Send Enquiry',
    getInTouch: 'Get in touch with',
    yourName: 'Your Name',
    enterFullName: 'Enter your full name',
    phoneNumber: 'Phone Number',
    yourContact: 'Your contact number',
    message: 'Message',
    tellThem: 'Tell them about your requirements...',
    preferredContactTime: 'Preferred Contact Time',
    selectPreferredTime: 'Select preferred time',
    morning: 'Morning (9 AM - 12 PM)',
    afternoon: 'Afternoon (12 PM - 5 PM)',
    evening: 'Evening (5 PM - 8 PM)',
    anytime: 'Anytime',
    sending: 'Sending...',
    enquirySent: 'Enquiry Sent!',
    messageSent: 'Your message has been sent to {businessName}. They\'ll be in touch soon.',
    
    // Vendor/Business add
    serviceBusiness: 'Service/Business Name',
    serviceCategory: 'Service Category',
    city: 'City',
    phone: 'Phone',
    imageUrl: 'Image URL',
    submitForApproval: 'Submit for Approval',
    submitted: 'Submitted!',
    awaitingApproval: 'Awaiting admin approval.',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    manageApprovals: 'Manage business approvals',
    allCaughtUp: 'All caught up!',
    noPendingApprovals: 'No businesses pending approval.',
    pendingApprovals: 'Pending Approvals',
    business: 'Business',
    category: 'Category',
    location: 'Location',
    contactInfo: 'Contact',
    submittedDate: 'Submitted',
    actions: 'Actions',
    approve: 'Approve',
    reject: 'Reject',
    accessDenied: 'Access Denied',
    noAdminPrivileges: 'You don\'t have admin privileges.',
    
    // Saved/Favorites
    savedBusinesses: 'Saved Businesses',
    yourFavorites: 'Your favorite local services',
    noSavedYet: 'No saved businesses yet',
    startExploring: 'Start exploring and save your favorite local services',
    browseBusiness: 'Browse Businesses',
    signInToView: 'Sign in to view your saved businesses',
    keepTrack: 'Keep track of your favorite local services',
    signIn: 'Sign In',
    
    // Voice search
    voiceSearch: 'Voice search',
    listening: 'Listening...',
    
    // Common
    loading: 'Loading...',
    noResults: 'No results found',
    back: 'Back',
    required: 'required',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info'
  },
  hi: {
    // Header
    home: 'होम',
    help: 'हेल्प',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    addBusiness: 'बिज़नेस जोड़ें',
    logout: 'लॉगआउट',
    detectLocation: 'मेरी लोकेशन पता करें',
    detecting: 'पता कर रहे हैं...',
    
    // Hero
    heroTitle: 'आपका आसान लोकल कॉन्सियर्ज।',
    heroSubtitle: 'आपके शहर में खाना, रहना, हेल्थ और शॉपिंग।',
    searchPlaceholder: '{city} में कुछ भी पूछें (जैसे, "मणिपाल के पास पीजी", "बेस्ट फार्मेसी", "अभी खुले रेस्टोरेंट")',
    search: 'सर्च करें',
    searching: 'सर्च कर रहे हैं...',
    
    // Categories
    popularCategories: 'पॉपुलर कैटेगरी',
    eat: 'खाना',
    stay: 'रुकना',
    health: 'हेल्थ',
    shop: 'शॉपिंग',
    petCare: 'पेट केयर',
    explore: 'एक्सप्लोर',
    
    // Category descriptions
    stayDesc: 'पीजी और रूम जिन पर भरोसा कर सकें।',
    eatDesc: 'पास में वेज टिफिन और रेस्टोरेंट।',
    healthDesc: 'फार्मेसी, एम्बुलेंस और टेस्ट।',
    shopDesc: 'भरोसेमंद जनरल स्टोर।',
    petCareDesc: 'पेट का सामान और ग्रूमिंग।',
    
    // Business section
    localBusinessesIn: '{city} के लोकल बिज़नेस',
    verifiedTrusted: 'वेरिफाइड और भरोसेमंद',
    foundResults: '"{query}" के लिए {count} रिजल्ट मिले',
    noBusinessesFound: '{city} में "{query}" के लिए कोई बिज़नेस नहीं मिला',
    noBusinessesInCity: '{city} में कोई बिज़नेस नहीं मिला',
    clearSearch: 'सर्च क्लियर करें',
    searchingBusinesses: 'बिज़नेस सर्च कर रहे हैं...',
    loadingBusinesses: 'बिज़नेस लोड कर रहे हैं...',
    
    // Business cards
    viewDetails: 'डिटेल देखें',
    sendMessage: 'मैसेज भेजें',
    enquire: 'पूछताछ',
    callNow: 'अभी कॉल करें',
    whatsapp: 'व्हाट्सऐप',
    professionalService: 'प्रोफेशनल सर्विस प्रोवाइडर जो आपकी जरूरतों के लिए हाई क्वालिटी सोल्यूशन देता है।',
    
    // FAQ
    faqTitle: 'अक्सर पूछे जाने वाले सवाल',
    faqSubtitle: 'आपके शहर में लोकल सर्विसेज ढूंढने के बारे में सब कुछ जानें।',
    faqQuestion1: 'अपने एरिया में लोकल बिज़नेस कैसे ढूंढें?',
    faqQuestion2: 'क्या FindVee पर सभी बिज़नेस वेरिफाइड हैं?',
    faqQuestion3: 'अपना बिज़नेस FindVee पर कैसे जोड़ें?',
    faqQuestion4: 'क्या FindVee मेरे शहर में उपलब्ध है?',
    
    // Footer
    company: 'कंपनी',
    legal: 'लीगल',
    vendors: 'वेंडर्स',
    follow: 'फॉलो करें',
    aboutUs: 'हमारे बारे में',
    careers: 'करियर',
    contact: 'कॉन्टेक्ट',
    blog: 'ब्लॉग',
    privacyPolicy: 'प्राइवेसी पॉलिसी',
    termsOfService: 'टर्म्स ऑफ सर्विस',
    cookiePolicy: 'कुकी पॉलिसी',
    disclaimer: 'डिस्क्लेमर',
    listYourBusiness: 'अपना बिज़नेस लिस्ट करें',
    vendorGuidelines: 'वेंडर गाइडलाइन्स',
    pricing: 'प्राइसिंग',
    support: 'सपोर्ट',
    facebook: 'फेसबुक',
    twitter: 'ट्विटर',
    instagram: 'इंस्टाग्राम',
    linkedin: 'लिंक्डइन',
    footerCopyright: '© {year} FindVee | आपके शहर के लिए आसान बनाया गया।',
    
    // Help & Support
    helpTitle: 'हेल्प और सपोर्ट',
    helpSubtitle: 'FindVee इस्तेमाल करने के बारे में कॉमन सवालों के जवाब पाएं',
    faqSectionTitle: 'अक्सर पूछे जाने वाले सवाल',
    stillNeedHelp: 'अभी भी हेल्प चाहिए?',
    cantFind: 'जो ढूंढ रहे हैं वो नहीं मिल रहा? हमारी सपोर्ट टीम से बात करें।',
    contactSupport: 'सपोर्ट से कॉन्टेक्ट करें',
    
    // Auth
    welcomeToFindVee: 'FindVee में आपका स्वागत है',
    welcomeBack: 'वापसी पर स्वागत है',
    signInToContinue: 'FindVee में जारी रखने के लिए साइन इन करें',
    createAccount: 'अपना अकाउंट बनाएं',
    joinFindVeeToday: 'आज ही FindVee जॉइन करें और लोकल सर्विसेज डिस्कवर करें',
    alreadyHaveAccount: 'पहले से अकाउंट है?',
    dontHaveAccount: 'अकाउंट नहीं है?',
    signInHere: 'यहां साइन इन करें',
    createOne: 'एक बनाएं',
    aiPoweredConcierge: 'आपका AI-पावर्ड लोकल सर्विसेज कॉन्सियर्ज',
    signInWithGoogle: 'गूगल से साइन इन करें',
    createAccountWithGoogle: 'गूगल से अकाउंट बनाएं',
    signing_in: 'साइन इन कर रहे हैं...',
    creating_account: 'अकाउंट बना रहे हैं...',
    signUpBenefits: 'अकाउंट बनाने के फायदे:',
    saveBusinesses: 'अपने फेवरेट बिज़नेस सेव करें',
    leaveReviews: 'रिव्यू और रेटिंग दें',
    manageEnquiries: 'अपनी पूछताछ मैनेज करें',
    addYourBusiness: 'अपना बिज़नेस FindVee पर जोड़ें',
    completingSignIn: 'साइन इन पूरा कर रहे हैं...',
    pleaseWait: 'कृपया इंतजार करें जब तक हम आपका अकाउंट वेरिफाई करते हैं।',
    authFailed: 'ऑथेंटिकेशन फेल हो गया',
    thereWasIssue: 'आपको साइन इन करने में प्रॉब्लम हुई।',
    tryAgain: 'फिर कोशिश करें',
    
    // Business details
    backToSearch: 'सर्च पर वापस जाएं',
    businessNotFound: 'बिज़नेस नहीं मिला',
    backToHome: 'होम पर वापस',
    address: 'पता',
    reviews: 'रिव्यूज',
    addYourReview: 'अपना रिव्यू जोड़ें',
    rating: 'रेटिंग',
    stars: 'स्टार्स',
    star: 'स्टार',
    comment: 'कमेंट',
    optional: 'ऑप्शनल',
    shareExperience: 'अपना एक्सपीरियंस शेयर करें...',
    submitReview: 'रिव्यू सबमिट करें',
    submitting: 'सबमिट कर रहे हैं...',
    signInToReview: 'रिव्यू देने के लिए साइन इन करें।',
    alreadyReviewed: 'आपने पहले से ही इस बिज़नेस को रिव्यू दिया है।',
    noReviewsYet: 'अभी तक कोई रिव्यू नहीं। इस बिज़नेस को रिव्यू देने वाले पहले व्यक्ति बनें!',
    by: 'द्वारा',
    anonymous: 'अज्ञात',
    
    // Leads/Enquiry
    sendEnquiry: 'पूछताछ भेजें',
    getInTouch: 'संपर्क करें',
    yourName: 'आपका नाम',
    enterFullName: 'अपना पूरा नाम लिखें',
    phoneNumber: 'फोन नंबर',
    yourContact: 'आपका कॉन्टेक्ट नंबर',
    message: 'मैसेज',
    tellThem: 'उन्हें अपनी जरूरतों के बारे में बताएं...',
    preferredContactTime: 'कॉन्टेक्ट का बेस्ट टाइम',
    selectPreferredTime: 'बेस्ट टाइम चुनें',
    morning: 'सुबह (9 AM - 12 PM)',
    afternoon: 'दोपहर (12 PM - 5 PM)',
    evening: 'शाम (5 PM - 8 PM)',
    anytime: 'कभी भी',
    sending: 'भेज रहे हैं...',
    enquirySent: 'पूछताछ भेज दी!',
    messageSent: 'आपका मैसेज {businessName} को भेज दिया गया है। वे जल्दी ही आपसे संपर्क करेंगे।',
    
    // Vendor/Business add
    serviceBusiness: 'सर्विस/बिज़नेस का नाम',
    serviceCategory: 'सर्विस कैटेगरी',
    city: 'शहर',
    phone: 'फोन',
    imageUrl: 'इमेज URL',
    submitForApproval: 'अप्रूवल के लिए सबमिट करें',
    submitted: 'सबमिट हो गया!',
    awaitingApproval: 'एडमिन अप्रूवल का इंतजार।',
    
    // Admin
    adminDashboard: 'एडमिन डैशबोर्ड',
    manageApprovals: 'बिज़नेस अप्रूवल मैनेज करें',
    allCaughtUp: 'सब कुछ अप टू डेट है!',
    noPendingApprovals: 'कोई बिज़नेस अप्रूवल पेंडिंग नहीं।',
    pendingApprovals: 'पेंडिंग अप्रूवल',
    business: 'बिज़नेस',
    category: 'कैटेगरी',
    location: 'लोकेशन',
    contactInfo: 'कॉन्टेक्ट',
    submittedDate: 'सबमिट की तारीख',
    actions: 'एक्शन्स',
    approve: 'अप्रूव करें',
    reject: 'रिजेक्ट करें',
    accessDenied: 'एक्सेस डिनाइड',
    noAdminPrivileges: 'आपके पास एडमिन राइट्स नहीं हैं।',
    
    // Saved/Favorites
    savedBusinesses: 'सेव किए गए बिज़नेस',
    yourFavorites: 'आपकी फेवरेट लोकल सर्विसेज',
    noSavedYet: 'अभी तक कोई बिज़नेस सेव नहीं किया',
    startExploring: 'एक्सप्लोर करना शुरू करें और अपनी फेवरेट लोकल सर्विसेज सेव करें',
    browseBusiness: 'बिज़नेस ब्राउज़ करें',
    signInToView: 'अपने सेव किए गए बिज़नेस देखने के लिए साइन इन करें',
    keepTrack: 'अपनी फेवरेट लोकल सर्विसेज का ट्रैक रखें',
    signIn: 'साइन इन',
    
    // Voice search
    voiceSearch: 'वॉयस सर्च',
    listening: 'सुन रहे हैं...',
    
    // Common
    loading: 'लोड हो रहा है...',
    noResults: 'कोई रिजल्ट नहीं मिला',
    back: 'वापस',
    required: 'जरूरी',
    cancel: 'कैंसल',
    save: 'सेव',
    edit: 'एडिट',
    delete: 'डिलीट',
    yes: 'हां',
    no: 'नहीं',
    ok: 'ओके',
    error: 'एरर',
    success: 'सफल',
    warning: 'चेतावनी',
    info: 'जानकारी'
  },
  kn: {
    // Header
    home: 'ಹೋಮ್',
    help: 'ಹೆಲ್ಪ್',
    login: 'ಲಾಗಿನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    addBusiness: 'ಬಿಸಿನೆಸ್ ಸೇರಿಸಿ',
    logout: 'ಲಾಗ್ಔಟ್',
    detectLocation: 'ನನ್ನ ಲೊಕೇಶನ್ ಹುಡುಕಿ',
    detecting: 'ಹುಡುಕುತ್ತಿದೆ...',
    
    // Hero
    heroTitle: 'ನಿಮ್ಮ ಸಿಂಪಲ್ ಲೋಕಲ್ ಕನ್ಸಿಯರ್ಜ್.',
    heroSubtitle: 'ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ತಿಂಡಿ, ಇರುವೆ, ಆರೋಗ್ಯ ಮತ್ತು ಶಾಪಿಂಗ್.',
    searchPlaceholder: '{city} ನಲ್ಲಿ ಏನಾದ್ರೂ ಕೇಳಿ (ಉದಾ., "ಮಣಿಪಾಲ್ ಬಳಿ ಪಿಜಿ", "ಬೆಸ್ಟ್ ಫಾರ್ಮಸಿ", "ಈಗ ಓಪನ್ ಆಗಿರೋ ರೆಸ್ಟೋರೆಂಟ್")',
    search: 'ಸರ್ಚ್ ಮಾಡಿ',
    searching: 'ಸರ್ಚ್ ಮಾಡುತ್ತಿದೆ...',
    
    // Categories
    popularCategories: 'ಪಾಪುಲರ್ ಕ್ಯಾಟಗರಿ',
    eat: 'ತಿನ್ನಿ',
    stay: 'ಇರಿ',
    health: 'ಆರೋಗ್ಯ',
    shop: 'ಶಾಪಿಂಗ್',
    petCare: 'ಪೆಟ್ ಕೇರ್',
    explore: 'ಎಕ್ಸ್‌ಪ್ಲೋರ್',
    
    // Category descriptions
    stayDesc: 'ನಂಬಬಹುದಾದ ಪಿಜಿ ಮತ್ತು ರೂಮ್‌ಗಳು.',
    eatDesc: 'ಹತ್ತಿರದ ವೆಜ್ ಟಿಫಿನ್ ಮತ್ತು ರೆಸ್ಟೋರೆಂಟ್.',
    healthDesc: 'ಫಾರ್ಮಸಿ, ಆಂಬುಲೆನ್ಸ್ ಮತ್ತು ಟೆಸ್ಟ್.',
    shopDesc: 'ನಂಬಿಕೆಯ ಜನರಲ್ ಸ್ಟೋರ್.',
    petCareDesc: 'ಪೆಟ್ ಸಾಮಾನು ಮತ್ತು ಗ್ರೂಮಿಂಗ್.',
    
    // Business section
    localBusinessesIn: '{city} ನ ಲೋಕಲ್ ಬಿಸಿನೆಸ್‌ಗಳು',
    verifiedTrusted: 'ವೆರಿಫೈಡ್ ಮತ್ತು ನಂಬಿಕೆಯ',
    foundResults: '"{query}" ಗೆ {count} ರಿಸಲ್ಟ್‌ಗಳು ಸಿಕ್ಕಿವೆ',
    noBusinessesFound: '{city} ನಲ್ಲಿ "{query}" ಗೆ ಯಾವ ಬಿಸಿನೆಸ್ ಸಿಗಲಿಲ್ಲ',
    noBusinessesInCity: '{city} ನಲ್ಲಿ ಯಾವ ಬಿಸಿನೆಸ್ ಸಿಗಲಿಲ್ಲ',
    clearSearch: 'ಸರ್ಚ್ ಕ್ಲಿಯರ್ ಮಾಡಿ',
    searchingBusinesses: 'ಬಿಸಿನೆಸ್ ಸರ್ಚ್ ಮಾಡುತ್ತಿದೆ...',
    loadingBusinesses: 'ಬಿಸಿನೆಸ್ ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...',
    
    // Business cards
    viewDetails: 'ಡಿಟೇಲ್ ನೋಡಿ',
    sendMessage: 'ಮೆಸೇಜ್ ಕಳಿಸಿ',
    enquire: 'ವಿಚಾರಣೆ',
    callNow: 'ಈಗ ಕಾಲ್ ಮಾಡಿ',
    whatsapp: 'ವಾಟ್ಸಪ್',
    professionalService: 'ಪ್ರೊಫೆಷನಲ್ ಸರ್ವಿಸ್ ಪ್ರೊವೈಡರ್ ಯಾರು ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ಹೈ ಕ್ವಾಲಿಟಿ ಸೊಲ್ಯೂಷನ್ ಕೊಡುತ್ತಾರೆ.',
    
    // FAQ
    faqTitle: 'ಆಗಾಗ್ಗೆ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು',
    faqSubtitle: 'ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಲೋಕಲ್ ಸರ್ವಿಸ್ ಹುಡುಕುವ ಬಗ್ಗೆ ಎಲ್ಲಾ ತಿಳಿಯಿರಿ.',
    faqQuestion1: 'ನನ್ನ ಏರಿಯಾದಲ್ಲಿ ಲೋಕಲ್ ಬಿಸಿನೆಸ್ ಹೇಗೆ ಹುಡುಕೋದು?',
    faqQuestion2: 'FindVee ನಲ್ಲಿ ಎಲ್ಲಾ ಬಿಸಿನೆಸ್ ವೆರಿಫೈಡ್ ಇದೆಯಾ?',
    faqQuestion3: 'ನನ್ನ ಬಿಸಿನೆಸ್ FindVee ನಲ್ಲಿ ಹೇಗೆ ಸೇರಿಸೋದು?',
    faqQuestion4: 'FindVee ನನ್ನ ಊರಿನಲ್ಲಿ ಇದೆಯಾ?',
    
    // Footer
    company: 'ಕಂಪನಿ',
    legal: 'ಲೀಗಲ್',
    vendors: 'ವೆಂಡರ್‌ಗಳು',
    follow: 'ಫಾಲೋ ಮಾಡಿ',
    aboutUs: 'ನಮ್ಮ ಬಗ್ಗೆ',
    careers: 'ಕೆರಿಯರ್',
    contact: 'ಕಾಂಟ್ಯಾಕ್ಟ್',
    blog: 'ಬ್ಲಾಗ್',
    privacyPolicy: 'ಪ್ರೈವಸಿ ಪಾಲಿಸಿ',
    termsOfService: 'ಟರ್ಮ್ಸ್ ಆಫ್ ಸರ್ವಿಸ್',
    cookiePolicy: 'ಕುಕೀ ಪಾಲಿಸಿ',
    disclaimer: 'ಡಿಸ್ಕ್ಲೇಮರ್',
    listYourBusiness: 'ನಿಮ್ಮ ಬಿಸಿನೆಸ್ ಲಿಸ್ಟ್ ಮಾಡಿ',
    vendorGuidelines: 'ವೆಂಡರ್ ಗೈಡ್‌ಲೈನ್ಸ್',
    pricing: 'ಪ್ರೈಸಿಂಗ್',
    support: 'ಸಪೋರ್ಟ್',
    facebook: 'ಫೇಸ್‌ಬುಕ್',
    twitter: 'ಟ್ವಿಟರ್',
    instagram: 'ಇನ್‌ಸ್ಟಗ್ರಾಮ್',
    linkedin: 'ಲಿಂಕ್ಡ್‌ಇನ್',
    footerCopyright: '© {year} FindVee | ನಿಮ್ಮ ಊರಿಗಾಗಿ ಸಿಂಪಲ್ ಆಗಿ ಮಾಡಲಾಗಿದೆ.',
    
    // Help & Support
    helpTitle: 'ಹೆಲ್ಪ್ ಮತ್ತು ಸಪೋರ್ಟ್',
    helpSubtitle: 'FindVee ಬಳಸುವ ಬಗ್ಗೆ ಕಾಮನ್ ಪ್ರಶ್ನೆಗಳ ಉತ್ತರಗಳು',
    faqSectionTitle: 'ಆಗಾಗ್ಗೆ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು',
    stillNeedHelp: 'ಇನ್ನೂ ಹೆಲ್ಪ್ ಬೇಕಾ?',
    cantFind: 'ನೀವು ಹುಡುಕುತ್ತಿರೋದು ಸಿಗುತ್ತಿಲ್ಲವಾ? ನಮ್ಮ ಸಪೋರ್ಟ್ ಟೀಮ್‌ನಿಂದ ಮಾತಾಡಿ.',
    contactSupport: 'ಸಪೋರ್ಟ್‌ನಿಂದ ಕಾಂಟ್ಯಾಕ್ಟ್ ಮಾಡಿ',
    
    // Auth
    welcomeToFindVee: 'FindVee ಗೆ ಸ್ವಾಗತ',
    welcomeBack: 'ವಾಪಸ್ ಬಂದಿದ್ದಕ್ಕೆ ಸ್ವಾಗತ',
    signInToContinue: 'FindVee ನಲ್ಲಿ ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createAccount: 'ನಿಮ್ಮ ಅಕೌಂಟ್ ಕ್ರಿಯೇಟ್ ಮಾಡಿ',
    joinFindVeeToday: 'ಇಂದೇ FindVee ಜಾಯಿನ್ ಮಾಡಿ ಮತ್ತು ಲೋಕಲ್ ಸರ್ವಿಸ್‌ಗಳನ್ನು ಡಿಸ್ಕವರ್ ಮಾಡಿ',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಅಕೌಂಟ್ ಇದೆಯಾ?',
    dontHaveAccount: 'ಅಕೌಂಟ್ ಇಲ್ಲವೇ?',
    signInHere: 'ಇಲ್ಲಿ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createOne: 'ಒಂದನ್ನು ಕ್ರಿಯೇಟ್ ಮಾಡಿ',
    aiPoweredConcierge: 'ನಿಮ್ಮ AI-ಪವರ್ಡ್ ಲೋಕಲ್ ಸರ್ವಿಸ್ ಕನ್ಸಿಯರ್ಜ್',
    signInWithGoogle: 'ಗೂಗಲ್‌ನಿಂದ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createAccountWithGoogle: 'ಗೂಗಲ್‌ನಿಂದ ಅಕೌಂಟ್ ಕ್ರಿಯೇಟ್ ಮಾಡಿ',
    signing_in: 'ಸೈನ್ ಇನ್ ಮಾಡುತ್ತಿದೆ...',
    creating_account: 'ಅಕೌಂಟ್ ಕ್ರಿಯೇಟ್ ಮಾಡುತ್ತಿದೆ...',
    signUpBenefits: 'ಅಕೌಂಟ್ ಕ್ರಿಯೇಟ್ ಮಾಡುವ ಪ್ರಯೋಜನಗಳು:',
    saveBusinesses: 'ನಿಮ್ಮ ಫೇವರೇಟ್ ಬಿಸಿನೆಸ್‌ಗಳನ್ನು ಸೇವ್ ಮಾಡಿ',
    leaveReviews: 'ರಿವ್ಯೂ ಮತ್ತು ರೇಟಿಂಗ್ ಕೊಡಿ',
    manageEnquiries: 'ನಿಮ್ಮ ವಿಚಾರಣೆಗಳನ್ನು ಮ್ಯಾನೇಜ್ ಮಾಡಿ',
    addYourBusiness: 'ನಿಮ್ಮ ಬಿಸಿನೆಸ್ FindVee ನಲ್ಲಿ ಸೇರಿಸಿ',
    completingSignIn: 'ಸೈನ್ ಇನ್ ಪೂರ್ಣಗೊಳಿಸುತ್ತಿದೆ...',
    pleaseWait: 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ ನಾವು ನಿಮ್ಮ ಅಕೌಂಟ್ ವೆರಿಫೈ ಮಾಡುತ್ತಿದ್ದೇವೆ.',
    authFailed: 'ಆಥೆಂಟಿಕೇಶನ್ ಫೇಲ್ ಆಯಿತು',
    thereWasIssue: 'ನಿಮ್ಮನ್ನು ಸೈನ್ ಇನ್ ಮಾಡುವಲ್ಲಿ ಪ್ರಾಬ್ಲಮ್ ಆಯಿತು.',
    tryAgain: 'ಮತ್ತೆ ಟ್ರೈ ಮಾಡಿ',
    
    // Business details
    backToSearch: 'ಸರ್ಚ್‌ಗೆ ವಾಪಸ್ ಹೋಗಿ',
    businessNotFound: 'ಬಿಸಿನೆಸ್ ಸಿಗಲಿಲ್ಲ',
    backToHome: 'ಹೋಮ್‌ಗೆ ವಾಪಸ್',
    address: 'ವಿಳಾಸ',
    reviews: 'ರಿವ್ಯೂಗಳು',
    addYourReview: 'ನಿಮ್ಮ ರಿವ್ಯೂ ಸೇರಿಸಿ',
    rating: 'ರೇಟಿಂಗ್',
    stars: 'ಸ್ಟಾರ್‌ಗಳು',
    star: 'ಸ್ಟಾರ್',
    comment: 'ಕಮೆಂಟ್',
    optional: 'ಆಪ್ಷನಲ್',
    shareExperience: 'ನಿಮ್ಮ ಎಕ್ಸಪೀರಿಯನ್ಸ್ ಶೇರ್ ಮಾಡಿ...',
    submitReview: 'ರಿವ್ಯೂ ಸಬ್ಮಿಟ್ ಮಾಡಿ',
    submitting: 'ಸಬ್ಮಿಟ್ ಮಾಡುತ್ತಿದೆ...',
    signInToReview: 'ರಿವ್ಯೂ ಕೊಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    alreadyReviewed: 'ನೀವು ಈಗಾಗಲೇ ಈ ಬಿಸಿನೆಸ್‌ಗೆ ರಿವ್ಯೂ ಕೊಟ್ಟಿದ್ದೀರಿ.',
    noReviewsYet: 'ಇನ್ನೂ ಯಾವ ರಿವ್ಯೂ ಇಲ್ಲ. ಈ ಬಿಸಿನೆಸ್‌ಗೆ ರಿವ್ಯೂ ಕೊಡುವ ಮೊದಲಿಗರು ಆಗಿ!',
    by: 'ರವರಿಂದ',
    anonymous: 'ಅಜ್ಞಾತ',
    
    // Leads/Enquiry
    sendEnquiry: 'ವಿಚಾರಣೆ ಕಳಿಸಿ',
    getInTouch: 'ಸಂಪರ್ಕಿಸಿ',
    yourName: 'ನಿಮ್ಮ ಹೆಸರು',
    enterFullName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಬರೆಯಿರಿ',
    phoneNumber: 'ಫೋನ್ ನಂಬರ್',
    yourContact: 'ನಿಮ್ಮ ಕಾಂಟ್ಯಾಕ್ಟ್ ನಂಬರ್',
    message: 'ಮೆಸೇಜ್',
    tellThem: 'ಅವರಿಗೆ ನಿಮ್ಮ ಅಗತ್ಯಗಳ ಬಗ್ಗೆ ಹೇಳಿ...',
    preferredContactTime: 'ಕಾಂಟ್ಯಾಕ್ಟ್ ಮಾಡುವ ಬೆಸ್ಟ್ ಟೈಮ್',
    selectPreferredTime: 'ಬೆಸ್ಟ್ ಟೈಮ್ ಆಯ್ಕೆ ಮಾಡಿ',
    morning: 'ಬೆಳಿಗ್ಗೆ (9 AM - 12 PM)',
    afternoon: 'ಮಧ್ಯಾಹ್ನ (12 PM - 5 PM)',
    evening: 'ಸಂಜೆ (5 PM - 8 PM)',
    anytime: 'ಯಾವಾಗ ಬೇಕಾದ್ರೂ',
    sending: 'ಕಳಿಸುತ್ತಿದೆ...',
    enquirySent: 'ವಿಚಾರಣೆ ಕಳಿಸಲಾಯಿತು!',
    messageSent: 'ನಿಮ್ಮ ಮೆಸೇಜ್ {businessName} ಗೆ ಕಳಿಸಲಾಗಿದೆ. ಅವರು ಸೀಗ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',
    
    // Vendor/Business add
    serviceBusiness: 'ಸರ್ವಿಸ್/ಬಿಸಿನೆಸ್ ಹೆಸರು',
    serviceCategory: 'ಸರ್ವಿಸ್ ಕ್ಯಾಟಗರಿ',
    city: 'ಊರು',
    phone: 'ಫೋನ್',
    imageUrl: 'ಇಮೇಜ್ URL',
    submitForApproval: 'ಅಪ್ರೂವಲ್‌ಗಾಗಿ ಸಬ್ಮಿಟ್ ಮಾಡಿ',
    submitted: 'ಸಬ್ಮಿಟ್ ಆಯಿತು!',
    awaitingApproval: 'ಅಡ್ಮಿನ್ ಅಪ್ರೂವಲ್ ಕಾಯುತ್ತಿದೆ.',
    
    // Admin
    adminDashboard: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    manageApprovals: 'ಬಿಸಿನೆಸ್ ಅಪ್ರೂವಲ್ ಮ್ಯಾನೇಜ್ ಮಾಡಿ',
    allCaughtUp: 'ಎಲ್ಲಾ ಅಪ್ ಟು ಡೇಟ್!',
    noPendingApprovals: 'ಯಾವ ಬಿಸಿನೆಸ್ ಅಪ್ರೂವಲ್ ಪೆಂಡಿಂಗ್ ಇಲ್ಲ.',
    pendingApprovals: 'ಪೆಂಡಿಂಗ್ ಅಪ್ರೂವಲ್‌ಗಳು',
    business: 'ಬಿಸಿನೆಸ್',
    category: 'ಕ್ಯಾಟಗರಿ',
    location: 'ಲೊಕೇಶನ್',
    contactInfo: 'ಕಾಂಟ್ಯಾಕ್ಟ್',
    submittedDate: 'ಸಬ್ಮಿಟ್ ಮಾಡಿದ ದಿನಾಂಕ',
    actions: 'ಆಕ್ಷನ್‌ಗಳು',
    approve: 'ಅಪ್ರೂವ್ ಮಾಡಿ',
    reject: 'ರಿಜೆಕ್ಟ್ ಮಾಡಿ',
    accessDenied: 'ಆಕ್ಸೆಸ್ ಡಿನೈಡ್',
    noAdminPrivileges: 'ನಿಮಗೆ ಅಡ್ಮಿನ್ ರೈಟ್ಸ್ ಇಲ್ಲ.',
    
    // Saved/Favorites
    savedBusinesses: 'ಸೇವ್ ಮಾಡಿದ ಬಿಸಿನೆಸ್‌ಗಳು',
    yourFavorites: 'ನಿಮ್ಮ ಫೇವರೇಟ್ ಲೋಕಲ್ ಸರ್ವಿಸ್‌ಗಳು',
    noSavedYet: 'ಇನ್ನೂ ಯಾವ ಬಿಸಿನೆಸ್ ಸೇವ್ ಮಾಡಿಲ್ಲ',
    startExploring: 'ಎಕ್ಸ್‌ಪ್ಲೋರ್ ಮಾಡಲು ಶುರು ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಫೇವರೇಟ್ ಲೋಕಲ್ ಸರ್ವಿಸ್‌ಗಳನ್ನು ಸೇವ್ ಮಾಡಿ',
    browseBusiness: 'ಬಿಸಿನೆಸ್ ಬ್ರೌಸ್ ಮಾಡಿ',
    signInToView: 'ನಿಮ್ಮ ಸೇವ್ ಮಾಡಿದ ಬಿಸಿನೆಸ್‌ಗಳನ್ನು ನೋಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    keepTrack: 'ನಿಮ್ಮ ಫೇವರೇಟ್ ಲೋಕಲ್ ಸರ್ವಿಸ್‌ಗಳ ಟ್ರ್ಯಾಕ್ ಇಟ್ಟುಕೊಳ್ಳಿ',
    signIn: 'ಸೈನ್ ಇನ್',
    
    // Voice search
    voiceSearch: 'ವಾಯ್ಸ್ ಸರ್ಚ್',
    listening: 'ಕೇಳುತ್ತಿದೆ...',
    
    // Common
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    noResults: 'ಯಾವ ರಿಸಲ್ಟ್ ಸಿಗಲಿಲ್ಲ',
    back: 'ವಾಪಸ್',
    required: 'ಅಗತ್ಯ',
    cancel: 'ಕ್ಯಾನ್ಸಲ್',
    save: 'ಸೇವ್',
    edit: 'ಎಡಿಟ್',
    delete: 'ಡಿಲೀಟ್',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
    ok: 'ಓಕೆ',
    error: 'ಎರರ್',
    success: 'ಸಫಲ',
    warning: 'ಎಚ್ಚರಿಕೆ',
    info: 'ಮಾಹಿತಿ'
  }
};

let currentLanguage: Language = 'en';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('findvee-language', lang);
  }
}

export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('findvee-language');
    if (stored && (stored === 'en' || stored === 'hi' || stored === 'kn')) {
      currentLanguage = stored as Language;
    }
  }
  return currentLanguage;
}

export function t(key: string, replacements: Record<string, string> = {}): string {
  const lang = getLanguage();
  let text = dictionary[lang][key as keyof typeof dictionary[typeof lang]] || key;
  
  // Replace placeholders
  Object.keys(replacements).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  
  return text;
}

export function initializeLanguage() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('findvee-language');
    if (stored && (stored === 'en' || stored === 'hi' || stored === 'kn')) {
      currentLanguage = stored as Language;
    }
  }
}
