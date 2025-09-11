
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { getBrowserLocation, reverseGeocode } from "../../services/location";
import PasswordInput from "../../components/base/PasswordInput";

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={className}
      referrerPolicy="no-referrer"
    />
  ) : (
    <div className={`bg-neutral-100 text-neutral-400 flex items-center justify-center ${className}`}>
      <span className="text-xs">image unavailable</span>
    </div>
  );
}

const translations = {
  en: { 
    home: "Home", 
    help: "Help", 
    exploreServices: "Explore Services", 
    listBusiness: "List Your Business", 
    searchPlaceholder: (loc: string) => `Search in ${loc} (e.g., PG near Manipal, pharmacy)`, 
    featured: (loc: string) => `Featured in ${loc}`, 
    heroTitle: "One Platform. Every Need.",
    heroSubtitle: "Meals, stays, health, and shops in your city.", 
    ctaTitle: "Focused Today. Expanding Tomorrow.", 
    ctaSubtitle: "Meals, health, stays, and shops today - more services like payments, insurance, travel, and jobs coming soon.", 
    login: "Login", 
    signup: "Sign Up",
    logout: "Logout",
    welcome: "Welcome",
    search: "Search",
    // Category translations
    stay: "Stay",
    stayTagline: "PGs & rooms you can trust.",
    eat: "Eat",
    eatTagline: "Veg tiffins & restaurants nearby.",
    health: "Health",
    healthTagline: "Pharmacies, ambulances & diagnostics.",
    shop: "Shop",
    shopTagline: "Trusted general stores.",
    petcare: "Pet Care",
    petcareTagline: "Pet supplies & grooming services.",
    explore: "Explore",
    view: "View",
    call: "Call",
    // Footer
    terms: "Terms",
    privacy: "Privacy",
    support: "Support",
    about: "About Us",
    copyright: "FindVee",
    // Auth modal
    welcomeToFindVee: "Welcome to FindVee",
    signInMessage: "Sign in to access personalized features",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    confirmPasswordPlaceholder: "Confirm your password",
    signInButton: "Sign In",
    signUpButton: "Sign Up",
    switchToSignUp: "Don't have an account? Sign Up",
    switchToSignIn: "Already have an account? Sign In",
    cancel: "Cancel",
    signingIn: "Signing in...",
    signingUp: "Signing up...",
    signInWithGoogle: "Sign in with Google",
    orDivider: "or",
    // Search & Results
    noResults: "No results found",
    noResultsMessage: (city: string) => `No results in ${city}. Try changing filters or searching nearby areas.`,
    trySearching: "Try searching for:",
    loadMore: "Load More",
    showingResults: (count: number) => `Showing ${count} results`,
    // Geolocation & Coverage
    useMyLocation: "Use my location",
    detectingLocation: "Detecting location...",
    locationPermissionDenied: "Location access denied",
    comingSoon: "Coming to your city soon!",
    comingSoonSubtitle: "We're expanding. List your business to help us reach your area faster.",
    addYourBusiness: "Add Your Business",
    setCityManually: "Set city manually",
    expandSearch5km: "Search +5km radius",
    expandSearch10km: "Search +10km radius",
    nearestCity: (city: string, distance: number) => `Nearest supported city: ${city} (${distance.toFixed(1)}km away)`,
    serves: (city: string, distance: number) => `Serves ${city} · ${distance.toFixed(1)}km`
  }
};

const categories = [
  { key: "stay", image: "https://4.imimg.com/data4/XP/JB/MY-29402471/pg-rooms.jpg", actions: ["explore"] },
  { key: "eat", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/5e/91/d0/wide-variety-of-items.jpg?w=900&h=500&s=1", actions: ["explore"] },
  { key: "health", image: "https://mediniz-images-2018-100.s3.ap-south-1.amazonaws.com/web-resources/pharmacy.jpg", actions: ["explore"] },
  { key: "shop", image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrQQj55YX11eMATVoFldUYF_P89-ypKSXXFO4IlS32e_C62vVGpdxyRctPUSnP3Xepu0UzflMKHQVenkYK9lPnXnih-Il3RcQdyZL6lCfNgiVs8Svi18sRKKezcG5778YGNyTI=s1360-w1360-h1020-rw", actions: ["explore"] },
  { key: "petcare", image: "https://th-i.thgim.com/public/migration_catalog/article16679391.ece/alternates/LANDSCAPE_1200/16BGMBINDU", actions: ["explore"] },
];

// City coordinates for distance calculations - 15km radius coverage
const CITY_CENTERS = {
  "Udupi": { lat: 13.3409, lng: 74.7421 },
  "Manipal": { lat: 13.3500, lng: 74.7833 },
  "Kundapura": { lat: 13.6274, lng: 74.6900 },
  "Koteshwara": { lat: 13.6100, lng: 74.6800 }
};

const RADIUS = 15; // 15km coverage radius

// Enhanced vendors array with normalized data model
const vendors = [
  // Existing vendors - Udupi
  { 
    id: "r1", 
    name: "Woodlands Restaurant", 
    slug: "woodlands-restaurant-udupi",
    category: "Veg Restaurant", 
    city: "Udupi", 
    sublocality: "Car Street",
    address_text: "Car Street, Udupi",
    latitude: 13.3409, 
    longitude: 74.7421,
    service_areas: ["Udupi", "Manipal"],
    description: "Iconic Udupi pure-veg meals and tiffins.", 
    image: "https://lh3.googleusercontent.com/p/AF1QipOZlJVeSNPTzk8R4LgrnJ0VCPys1rgHHr5wqlCl=s1360-w1360-h1020-rw", 
    phone: "+91 94481 29161", 
    rating: 4.3,
    actions: ["view", "call"] 
  },
  { 
    id: "r2", 
    name: "MTR (Mavalli Tiffin Room)", 
    slug: "mtr-udupi",
    category: "Veg Restaurant", 
    city: "Udupi", 
    sublocality: "Service Bus Stand",
    address_text: "Service Bus Stand Road, Udupi",
    latitude: 13.3400, 
    longitude: 74.7450,
    service_areas: ["Udupi", "Manipal"],
    description: "Legendary Karnataka tiffins and dosas.", 
    image: "https://b.zmtcdn.com/data/reviews_photos/32a/d0c3ffc9ee56150d2b1f2834e614f32a_1592151702.jpg", 
    phone: "+91 88670 42555",
    rating: 4.1,
    actions: ["view", "call"] 
  },
  { 
    id: "r3", 
    name: "Diana Restaurant", 
    slug: "diana-restaurant-udupi",
    category: "Veg Restaurant", 
    city: "Udupi", 
    sublocality: "Diana Circle",
    address_text: "Diana Circle, Udupi",
    latitude: 13.3380, 
    longitude: 74.7400,
    service_areas: ["Udupi"],
    description: "Famous for cutlets & authentic meals.", 
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no24MIjRUtkupg5uN-hHy12O4o42ZfMrl4-w8alP9wlBiO930wtD-B0nWAARNzpFZRv4CPasmdYGBl7xnw3YK8e6-Byl6dtkqEMj07OnDQp-gXFoZBTduM-MkTo-5-Rtx0mKE8GAQ=s1360-w1360-h1020-rw", 
    phone: "+91 81475 78058",
    rating: 4.0,
    actions: ["view", "call"] 
  },
  
  // Manipal vendors
  { 
    id: "r4", 
    name: "7 Bees Cafe", 
    slug: "7-bees-cafe-manipal",
    category: "Cafe", 
    city: "Manipal", 
    sublocality: "Tiger Circle",
    address_text: "Tiger Circle, Manipal",
    latitude: 13.3500, 
    longitude: 74.7833,
    service_areas: ["Manipal", "Udupi"],
    description: "Popular cafe with great ambiance.", 
    image: "https://content.jdmagicbox.com/comp/udupi/f6/0820px820.x820.110120134312.p2f6/catalogue/7-bees-cafe-udupi-ho-udupi-fast-food-3qbq3.jpg", 
    phone: "+91 94482 13085",
    rating: 4.2,
    actions: ["view", "call"] 
  },
  { 
    id: "h1", 
    name: "Wellness Forever Pharmacy", 
    slug: "wellness-forever-pharmacy-udupi",
    category: "Pharmacy", 
    city: "Udupi", 
    sublocality: "Service Bus Stand",
    address_text: "Service Bus Stand Road, Udupi",
    latitude: 13.3395, 
    longitude: 74.7430,
    service_areas: ["Udupi", "Manipal"],
    description: "Medicines, essentials, quick delivery.", 
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npUjBf7Z2kleSwITPL_ss9WHkJ4yx26B4EaPlWcEbV5DvmrBVdPu1OezpRcaGDa0LUlLdygQzMNnf3XvN51spvcAVKKQXr53n8uXl5QRHf4nQaxxuAH5goNH89NFYipPDXOY-wj=s1360-w1360-h1020-rw", 
    phone: "+91 92437 57507",
    rating: 4.4,
    actions: ["view", "call"] 
  },
  { 
    id: "a1", 
    name: "Manipal/Udupi Ambulance Service", 
    slug: "manipal-udupi-ambulance-service",
    category: "Ambulance", 
    city: "Manipal", 
    sublocality: "Hospital Road",
    address_text: "Hospital Road, Manipal",
    latitude: 13.3520, 
    longitude: 74.7850,
    service_areas: ["Manipal", "Udupi", "Kundapura"],
    description: "Emergency ambulance service for medical transport.", 
    image: "https://lh3.googleusercontent.com/p/AF1QipPP5J9um3SY3SALiuPxcC7sPRzVi0VgVTU2z41k=s1360-w1360-h1020-rw", 
    phone: "+91 98440 51361",
    rating: 4.5,
    actions: ["call", "message"] 
  },
  
  // Kundapura businesses - EAT
  { 
    id: "k1", 
    name: "Harsha Refreshment Veg", 
    slug: "harsha-refreshment-veg-kundapura",
    category: "Veg Restaurant", 
    city: "Kundapura", 
    sublocality: "Shastri Circle",
    address_text: "Shastri Circle, Kundapura",
    latitude: 13.6274, 
    longitude: 74.6900,
    service_areas: ["Kundapura"],
    description: "Classic vegetarian restaurant at Shastri Circle, famous for quick service and tasty South Indian meals.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uF8R-iUt5kJk2t6lJbCmZRjUJtkA9cXV5w&s", 
    phone: "+91 94481 29161",
    rating: 4.2,
    actions: ["view", "call"] 
  },
  { 
    id: "k2", 
    name: "Lashika Veg (UVA Manish)", 
    slug: "lashika-veg-kundapura",
    category: "Veg Restaurant", 
    city: "Kundapura", 
    sublocality: "Gandhi Maidan",
    address_text: "Opposite Gandhi Maidan, Kundapura",
    latitude: 13.6280, 
    longitude: 74.6920,
    service_areas: ["Kundapura"],
    description: "Elegant vegetarian restaurant opposite Gandhi Maidan, serving both South and North Indian cuisine.", 
    image: "https://content3.jdmagicbox.com/v2/comp/udupi/w2/0820px820.x820.240331182814.n3w2/catalogue/lashika-pure-vegetarian-restaurant-vaderhobli-udupi-restaurants-c0tfba0iae.jpg", 
    phone: "+91 88670 42555",
    rating: 4.0,
    actions: ["view", "call"] 
  },
  { 
    id: "k3", 
    name: "Eshanya Street Café", 
    slug: "eshanya-street-cafe-kundapura",
    category: "Cafe", 
    city: "Kundapura", 
    sublocality: "Main Road",
    address_text: "Main Road, Kundapura",
    latitude: 13.6290, 
    longitude: 74.6890,
    service_areas: ["Kundapura"],
    description: "Trendy rooftop café serving vegetarian street food and desserts with a lively ambience.", 
    image: "https://i.ytimg.com/vi/iw1ja99LFDE/maxresdefault.jpg", 
    phone: "+91 81475 78058",
    rating: 4.1,
    actions: ["view", "call"] 
  },
  { 
    id: "k4", 
    name: "Hotel Dwaraka", 
    slug: "hotel-dwaraka-kundapura",
    category: "Veg Restaurant", 
    city: "Kundapura", 
    sublocality: "Shastri Circle",
    address_text: "Near Shastri Circle, Kundapura",
    latitude: 13.6270, 
    longitude: 74.6910,
    service_areas: ["Kundapura"],
    description: "Family-friendly veg restaurant near Shastri Circle, known for masala dosa and coffee.", 
    image: "https://b.zmtcdn.com/data/pictures/4/20419594/dcdd31366daf22ab4fbec89732b7701a.jpg", 
    phone: "+91 94482 13085",
    rating: 3.9,
    actions: ["view", "call"] 
  },
  
  // Kundapura businesses - HEALTH
  { 
    id: "kh1", 
    name: "Radha Medicals – Kundapura", 
    slug: "radha-medicals-kundapura",
    category: "Pharmacy", 
    city: "Kundapura", 
    sublocality: "Temple Road",
    address_text: "Near Kundapura Temple, Temple Road",
    latitude: 13.6280, 
    longitude: 74.6900,
    service_areas: ["Kundapura"],
    description: "Trusted pharmacy near Kundapura Temple, open till 10 pm with a wide range of medicines.", 
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4notUi_-pQU2enIj1hCUBIOcoM7m3rHGtTQ2QhfKvPR6M2OUS1UK9J74PukA-y2lYYjjiJlDXfOTiRnYbDg-QEScWwaOm6yBvbNbBooEvL72uB11T-NKVHAb0899pESR558MR5M=s1360-w1360-h1020-rw", 
    phone: "+91 92437 57507",
    rating: 4.3,
    actions: ["view", "call"] 
  },
  { 
    id: "kh2", 
    name: "Vasudeva Hande Sridevi Ambulance", 
    slug: "vasudeva-hande-sridevi-ambulance-kundapura",
    category: "Ambulance", 
    city: "Kundapura", 
    sublocality: "Hospital Road",
    address_text: "Hospital Road, Kundapura",
    latitude: 13.6260, 
    longitude: 74.6880,
    service_areas: ["Kundapura", "Udupi"],
    description: "Professional ambulance service with trained medical staff.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Uiuz5E6SZAARu3HhVXNCiVdn4bnU2vn66A&s", 
    phone: "+91 98440 51361",
    rating: 4.6,
    actions: ["call", "message"] 
  },
  
  // Kundapura businesses - SHOP
  { 
    id: "ks1", 
    name: "Satwadi Sundar Shetty Departmental Store", 
    slug: "satwadi-sundar-shetty-departmental-store-kundapura",
    category: "Departmental Store", 
    city: "Kundapura", 
    sublocality: "Market Road",
    address_text: "Market Road, Kundapura",
    latitude: 13.6290, 
    longitude: 74.6920,
    service_areas: ["Kundapura"],
    description: "Well-stocked departmental store in Kundapura for groceries and daily essentials.", 
    image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq8EHlZ-58WwFHgTTjEGORNGJXwA_Sut4YQj1iQjdDHe-gd2Un3l6TXrzwbQQy55a7YYsjf558jVoFkGxdpTUfB_VBg_BHkMsAkPUC3dQ0aCK6VOByky-YBEjS7iPKmAmHVHUE=s1360-w1360-h1020-rw", 
    phone: "+91 94809 87654",
    rating: 4.1,
    actions: ["view", "call"] 
  },
  { 
    id: "ks2", 
    name: "Ganesh Stores", 
    slug: "ganesh-stores-kundapura",
    category: "General Store", 
    city: "Kundapura", 
    sublocality: "Main Bazaar",
    address_text: "Main Bazaar, Kundapura",
    latitude: 13.6285, 
    longitude: 74.6905,
    service_areas: ["Kundapura"],
    description: "Popular general store in Kundapura offering groceries and household products.", 
    image: "https://content.jdmagicbox.com/comp/udupi/d4/0820px820.x820.210129110220.q2d4/catalogue/ganesh-bazaar-kundapura-udupi-supermarkets-qi2odb7z6x.jpg", 
    phone: "+91 98455 46712",
    rating: 3.8,
    actions: ["view", "call"] 
  },
  { 
    id: "ks3", 
    name: "Mahamaya General Stores (Koteshwara)", 
    slug: "mahamaya-general-stores-koteshwara",
    category: "General Store", 
    city: "Koteshwara", 
    sublocality: "Koteshwara",
    address_text: "Koteshwara, Kundapura",
    latitude: 13.6100, 
    longitude: 74.6800,
    service_areas: ["Koteshwara", "Kundapura"],
    description: "Local general store in Koteshwara catering to daily household needs.", 
    image: "https://lh3.googleusercontent.com/p/AF1QipNPEMswL0IKNhwZCwc3QKK2H6gDMuEr6kalJfF1=s1360-w1360-h1020-rw", 
    phone: "", 
    rating: 3.7,
    actions: ["view", "call"] 
  },
  
  // Kundapura businesses - PET CARE
  { 
    id: "kp1", 
    name: "Animal Planet – Koteshwara", 
    slug: "animal-planet-koteshwara",
    category: "Pet Care", 
    city: "Koteshwara", 
    sublocality: "Koteshwara",
    address_text: "Koteshwara, Kundapura",
    latitude: 13.6110, 
    longitude: 74.6810,
    service_areas: ["Koteshwara", "Kundapura", "Udupi"],
    description: "Pet care and supplies store offering food, accessories, and grooming products.", 
    image: "https://static.where-e.com/India/Karnataka_State/Animal-Planet_37fb85f058fba4417e022f3fcb63a626.jpg", 
    phone: "+91 98456 06195",
    rating: 4.0,
    actions: ["view", "call"] 
  },
];

// Quick search suggestions
const quickSearchChips = [
  { label: "Pharmacy", icon: "ri-capsule-line" },
  { label: "Restaurant", icon: "ri-restaurant-line" },
  { label: "Hotel", icon: "ri-hotel-line" },
  { label: "Groceries", icon: "ri-shopping-cart-line" }
];

export default function TeslaLikeLanding() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Udupi");
  const [lang, setLang] = useState<keyof typeof translations>("en");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [stickySearch, setStickySearch] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [isOutsideCoverage, setIsOutsideCoverage] = useState(false);
  const [expandedRadius, setExpandedRadius] = useState(RADIUS);
  const [nearestCityInfo, setNearestCityInfo] = useState<{city: string, distance: number} | null>(null);
  
  const { user, loading, signInEmailPassword, signUpEmailPassword, signOut } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const trackAnalytics = async (..._args: any[]) => {};
  const t = translations[lang];

  const RESULTS_PER_PAGE = 10;

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Normalize city names
  const normalizeCity = (city: string): string => {
    return city.trim().toLowerCase();
  };

  // Find nearest city center from user location
  const findNearestCity = (userLat: number, userLng: number): {city: string, distance: number} | null => {
    let nearest = null;
    let minDistance = Infinity;

    Object.entries(CITY_CENTERS).forEach(([cityName, coords]) => {
      const distance = calculateDistance(userLat, userLng, coords.lat, coords.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { city: cityName, distance };
      }
    });

    return nearest;
  };

  // Check if user is in coverage area
  const checkCoverage = (userLat: number, userLng: number): {inCoverage: boolean, nearestCity?: string} => {
    const nearest = findNearestCity(userLat, userLng);
    if (!nearest) return { inCoverage: false };

    const inCoverage = nearest.distance <= expandedRadius;
    return {
      inCoverage,
      nearestCity: inCoverage ? nearest.city : undefined
    };
  };

  // Auto-detect user location with improved error handling
  const detectUserLocation = async () => {
    setIsDetectingLocation(true);
    setLocationPermissionDenied(false);
    const result = await getBrowserLocation();
    if (result === 'denied') {
      setLocationPermissionDenied(true);
      setIsOutsideCoverage(true);
      setIsDetectingLocation(false);
      return;
    }
    if (result === 'unavailable') {
      setIsDetectingLocation(false);
      return;
    }
    setUserLocation(result);
    const coverage = checkCoverage(result.lat, result.lng);
    if (coverage.inCoverage && coverage.nearestCity) {
      setLocation(coverage.nearestCity);
      setIsOutsideCoverage(false);
      setNearestCityInfo(null);
    } else {
      setIsOutsideCoverage(true);
      const nearest = findNearestCity(result.lat, result.lng);
      setNearestCityInfo(nearest);
    }
    // Best-effort reverse geocoding for future enhancements
    reverseGeocode(result.lat, result.lng).catch(() => {});
    setIsDetectingLocation(false);
  };

  // Filter vendors based on city and distance with geofencing
  const filterVendorsByLocation = (vendorsList: any[], selectedCity: string, searchQuery: string = "") => {
    const cityCoords = CITY_CENTERS[selectedCity as keyof typeof CITY_CENTERS];
    if (!cityCoords) return [];

    return vendorsList.filter(vendor => {
      // Inclusion rules:
      // (a) normalize(city) == selectedCity
      if (normalizeCity(vendor.city) === normalizeCity(selectedCity)) return true;
      
      // (b) service_areas includes selectedCity
      if (vendor.service_areas.some((area: string) => normalizeCity(area) === normalizeCity(selectedCity))) return true;
      
      // (c) distance from city center <= expandedRadius
      if (vendor.latitude && vendor.longitude) {
        const distance = calculateDistance(
          cityCoords.lat, cityCoords.lng,
          vendor.latitude, vendor.longitude
        );
        if (distance <= expandedRadius) return true;
      }
      
      return false;
    }).filter(vendor => {
      // Apply search filter if query exists
      if (!searchQuery.trim()) return true;
      
      const searchLower = searchQuery.toLowerCase();
      return (
        vendor.name.toLowerCase().includes(searchLower) ||
        vendor.category.toLowerCase().includes(searchLower) ||
        vendor.description.toLowerCase().includes(searchLower) ||
        vendor.sublocality.toLowerCase().includes(searchLower)
      );
    }).map(vendor => {
      // Add distance info for display
      if (vendor.latitude && vendor.longitude && cityCoords) {
        const distance = calculateDistance(
          cityCoords.lat, cityCoords.lng,
          vendor.latitude, vendor.longitude
        );
        
        // Add "Serves City" pill if shown by service area or distance
        const showsServesPill = vendor.service_areas.includes(selectedCity) || 
                               (distance <= expandedRadius && normalizeCity(vendor.city) !== normalizeCity(selectedCity));
        
        return {
          ...vendor,
          distanceFromCity: distance,
          showsServesPill
        };
      }
      return vendor;
    }).sort((a, b) => {
      // Sort by rating, then by distance
      if (Math.abs(a.rating - b.rating) > 0.1) return b.rating - a.rating;
      if (a.distanceFromCity && b.distanceFromCity) {
        return a.distanceFromCity - b.distanceFromCity;
      }
      return 0;
    });
  };

  // Handle scroll for sticky search
  useEffect(() => {
    const handleScroll = () => {
      const searchSection = document.getElementById('search-results');
      if (searchSection) {
        const rect = searchSection.getBoundingClientRect();
        setStickySearch(rect.top <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-detect location on load with delay to ensure DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      detectUserLocation();
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  // Re-filter when location or expanded radius changes
  useEffect(() => {
    if (hasSearched) {
      const filtered = filterVendorsByLocation(vendors, location, query);
      setSearchResults(filtered.slice(0, currentPage * RESULTS_PER_PAGE));
      setTotalResults(filtered.length);
    }
  }, [location, expandedRadius]);

  useEffect(() => {
    if (user && trackAnalytics) {
      trackAnalytics('page_visit', { pageVisited: '/', location });
    }
  }, [user, location, trackAnalytics]);

  // SEO Schema.org JSON-LD
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "FindVee",
      "description": "Local service discovery platform for Udupi, Manipal, Kundapura & Koteshwara. Find restaurants, pharmacies, PGs, shops & more.",
      "url": import.meta.env.VITE_SITE_URL || "https://example.com",
      "logo": `${import.meta.env.VITE_SITE_URL || "https://example.com"}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Udupi",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
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
      ],
      "serviceType": ["Local Business Directory", "Service Discovery", "Restaurant Finder", "Pharmacy Locator"],
      "sameAs": [
        "https://facebook.com/findvee",
        "https://twitter.com/findvee"
      ]
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FindVee",
      "url": import.meta.env.VITE_SITE_URL || "https://example.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${import.meta.env.VITE_SITE_URL || "https://example.com"}/?query={search_term_string}`
        },
        "query-input": "required name=search_term_string"
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

    addSchema(schema, 'local-business-schema');
    addSchema(websiteSchema, 'website-schema');
    addSchema(breadcrumbSchema, 'breadcrumb-schema');

    return () => {
      // Cleanup on unmount
      ['local-business-schema', 'website-schema', 'breadcrumb-schema'].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  const handleAuth = async () => {
    if (!email || !password) return;
    
    if (authMode === 'signup' && password !== confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    }

    setIsAuthenticating(true);
    setAuthError('');
    
    try {
      if (authMode === 'signup') {
        await signUpEmailPassword(email, password);
      } else {
        await signInEmailPassword(email, password);
      }
      
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('Google sign-in is not available yet.');
  };

  const handleSignOut = async () => {
    await signOut();
    if (trackAnalytics) await trackAnalytics('user_signout');
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    setCurrentPage(1);
    
    if (trackAnalytics) await trackAnalytics('search', { searchQuery: query, location });
    
    // Simulate search delay
    setTimeout(() => {
      const filtered = filterVendorsByLocation(vendors, location, query);
      setSearchResults(filtered.slice(0, RESULTS_PER_PAGE));
      setTotalResults(filtered.length);
      setIsSearching(false);
      
      // Scroll to results
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const filtered = filterVendorsByLocation(vendors, location, query);
    const newResults = filtered.slice(0, nextPage * RESULTS_PER_PAGE);
    
    setSearchResults(newResults);
    setCurrentPage(nextPage);
  };

  const handleQuickSearch = (chipLabel: string) => {
    setQuery(chipLabel);
    handleSearch();
  };

  const handleExploreServices = async () => {
    if (trackAnalytics) await trackAnalytics('explore_services_click');
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleListBusiness = async () => {
    if (trackAnalytics) await trackAnalytics('list_business_click');
    navigate('/list-business');
  };

  const handleCategoryExplore = async (categoryKey: string) => {
    if (trackAnalytics) await trackAnalytics('category_explore', { category: categoryKey });
    
    const categoryKeywords = {
      'eat': 'Restaurant',
      'health': 'Pharmacy',
      'stay': 'Hotel',
      'shop': 'Store',
      'petcare': 'Pet Care'
    };
    
    setQuery(categoryKeywords[categoryKey as keyof typeof categoryKeywords] || '');
    setHasSearched(true);
    
    const filtered = filterVendorsByLocation(vendors, location, categoryKeywords[categoryKey as keyof typeof categoryKeywords] || '');
    setSearchResults(filtered.slice(0, RESULTS_PER_PAGE));
    setTotalResults(filtered.length);
    setCurrentPage(1);
    
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVendorView = async (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor && trackAnalytics) {
      await trackAnalytics('vendor_view', { vendorId, vendorName: vendor.name });
      alert(`Viewing details for ${vendor.name}`);
    }
  };

  const handleVendorCall = async (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor && vendor.phone && trackAnalytics) {
      await trackAnalytics('vendor_call', { vendorId, vendorName: vendor.name });
      window.open(`tel:${vendor.phone}`, '_self');
    }
  };

  const handleHomeClick = () => {
    setHasSearched(false);
    setSearchResults([]);
    setQuery('');
    setIsOutsideCoverage(false);
    setExpandedRadius(RADIUS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpandSearch = (newRadius: number) => {
    setExpandedRadius(newRadius);
    if (userLocation) {
      const coverage = checkCoverage(userLocation.lat, userLocation.lng);
      if (coverage.inCoverage && coverage.nearestCity) {
        setLocation(coverage.nearestCity);
        setIsOutsideCoverage(false);
      }
    }
  };

  const handleSetCityManually = () => {
    setIsOutsideCoverage(false);
    setExpandedRadius(RADIUS);
  };

  const filteredVendors = filterVendorsByLocation(vendors, location);

  const getSearchResultsHeader = () => {
    if (!query.trim()) {
      return `Search results in ${location}`;
    }
    return `Search results for "${query}" in ${location}`;
  };

  // Outside coverage hero section
  const renderOutsideCoverageHero = () => (
    <section className="bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-[900px] px-6 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-neutral-200 rounded-full flex items-center justify-center">
          <i className="ri-map-pin-line text-3xl text-neutral-600"></i>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
          {t.comingSoon}
        </h1>
        <p className="text-lg text-neutral-700 max-w-xl mx-auto mb-8">
          {t.comingSoonSubtitle}
        </p>

        {nearestCityInfo && (
          <p className="text-sm text-neutral-600 mb-6">
            {t.nearestCity(nearestCityInfo.city, nearestCityInfo.distance)}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button 
            onClick={handleListBusiness}
            className="px-6 py-3 bg-neutral-900 text-white rounded hover:opacity-90 whitespace-nowrap cursor-pointer"
          >
            {t.addYourBusiness}
          </button>
          <button 
            onClick={handleSetCityManually}
            className="px-6 py-3 border border-neutral-300 hover:border-neutral-900 rounded whitespace-nowrap cursor-pointer"
          >
            {t.setCityManually}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => handleExpandSearch(RADIUS + 5)}
            className="px-4 py-2 bg-white border border-neutral-300 hover:border-neutral-900 rounded-full text-sm cursor-pointer"
          >
            {t.expandSearch5km}
          </button>
          <button 
            onClick={() => handleExpandSearch(RADIUS + 10)}
            className="px-4 py-2 bg-white border border-neutral-300 hover:border-neutral-900 rounded-full text-sm cursor-pointer"
          >
            {t.expandSearch10km}
          </button>
        </div>
      </div>
    </section>
  );

  // Render featured items based on business category
  const renderFeaturedItems = (vendor: any) => {
    const items = getFeaturedItemsForVendor(vendor);
    
    return (
      <div className="mb-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-neutral-900 truncate">{item.name}</span>
                  {item.type && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium flex-shrink-0">
                      {item.type}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-neutral-500 truncate">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                <span className="text-sm font-semibold text-neutral-900">₹{item.price}</span>
                <button 
                  onClick={() => handleItemOrder(vendor.id, item.name)}
                  className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:opacity-90 cursor-pointer transition-opacity"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Get featured items for each vendor based on their category
  const getFeaturedItemsForVendor = (vendor: any) => {
    // Ambulances don't show items - they show services differently
    if (vendor.category === 'Ambulance') {
      return [];
    }

    const itemsByVendor: { [key: string]: any[] } = {
      // Restaurants - Real Food items from actual menus
      "r1": [ // Woodlands Restaurant - Actual menu items
        { name: "Veg Pulao", type: "Veg", description: "aromatic rice", price: "186.00" },
        { name: "Idli", type: "Veg", description: "2 pieces", price: "48.00" },
        { name: "Paneer Tikka Biriyani", type: "Veg", description: "special", price: "240.00" }
      ],
      "r2": [ // MTR - Actual menu items
        { name: "Rice Idli", type: "Veg", description: "1 piece", price: "26.00" },
        { name: "Masala Dosa", type: "Veg", description: "crispy", price: "82.00" },
        { name: "Special Meals", type: "Veg", description: "lunch/dinner", price: "239.00" }
      ],
      "r3": [ // Diana Restaurant - Actual menu items
        { name: "Butterscotch Ice Cream Jar", type: "Veg", description: "dessert", price: "200.00" },
        { name: "Vanilla Ice Cream Jar", type: "Veg", description: "dessert", price: "175.00" },
        { name: "Gobi Manchurian", type: "Veg", description: "dry/gravy", price: "135.00" }
      ],
      "r4": [ // 7 Bees Cafe - Keep existing items
        { name: "Paneer Sandwich", type: "Veg", description: "grilled", price: "85.00" },
        { name: "Masala Chai", type: "Veg", description: "special", price: "25.00" },
        { name: "Chicken Pizza", type: "Non-Veg", description: "medium", price: "180.00" }
      ],
      
      // Kundapura restaurants - Real items from actual menus
      "k1": [ // Harsha Refreshment - Actual menu items
        { name: "North Indian Special Thali", type: "Veg", description: "complete meal", price: "245.00" },
        { name: "South Poori Thali", type: "Veg", description: "traditional", price: "150.00" },
        { name: "Paneer Butter Masala", type: "Veg", description: "rich gravy", price: "205.00" }
      ],
      "k2": [ // Lashika Veg - Keep existing items
        { name: "Paneer Butter Masala", type: "Veg", description: "gravy", price: "150.00" },
        { name: "Jeera Rice", type: "Veg", description: "plate", price: "80.00" },
        { name: "Dal Tadka", type: "Veg", description: "bowl", price: "70.00" }
      ],
      "k3": [ // Eshanya Street Café - Actual menu items
        { name: "Masala French Fries", type: "Veg", description: "spiced", price: "55.00" },
        { name: "Three Cheese Sandwich", type: "Veg", description: "grilled", price: "90.00" },
        { name: "Gudbud Sundae", type: "Veg", description: "ice cream", price: "70.00" }
      ],
      "k4": [ // Hotel Dwaraka - Keep existing items
        { name: "Set Dosa", type: "Veg", description: "3 pieces", price: "65.00" },
        { name: "Upma", type: "Veg", description: "plate", price: "45.00" },
        { name: "Coffee", type: "Veg", description: "cup", price: "20.00" }
      ],
      
      // Pharmacies - Real Medicine items
      "h1": [ // Wellness Forever Pharmacy
        { name: "Dolo 650 (Paracetamol)", description: "15 tablets", price: "28.50" },
        { name: "Crocin Cold & Flu", description: "10 tablets", price: "45.00" },
        { name: "Volini Spray", description: "55ml", price: "115.00" }
      ],
      "kh1": [ // Radha Medicals
        { name: "Flexon (Ibuprofen)", description: "10 tablets", price: "35.00" },
        { name: "Digene Antacid", description: "10 tablets", price: "25.00" },
        { name: "Moov Pain Relief", description: "50g tube", price: "95.00" }
      ],
      
      // Stores - Real Product items
      "ks1": [ // Satwadi Sundar Shetty Store
        { name: "Tata Salt", description: "1kg pack", price: "22.00" },
        { name: "Fortune Sunlite Oil", description: "1L bottle", price: "115.00" },
        { name: "Maggi Noodles", description: "4 pack", price: "48.00" }
      ],
      "ks2": [ // Ganesh Stores
        { name: "Amul Fresh Milk", description: "500ml", price: "27.00" },
        { name: "Britannia Bread", description: "400g loaf", price: "32.00" },
        { name: "Cadbury Dairy Milk", description: "13g bar", price: "25.00" }
      ],
      "ks3": [ // Mahamaya General Stores
        { name: "Tata Tea Gold", description: "250g pack", price: "130.00" },
        { name: "Parle-G Biscuits", description: "200g pack", price: "25.00" },
        { name: "Vim Dishwash Bar", description: "200g", price: "28.00" }
      ],
      
      // Pet Care - Real Pet products
      "kp1": [ // Animal Planet
        { name: "Pedigree Adult Dog Food", description: "1.2kg pack", price: "485.00" },
        { name: "Whiskas Cat Food", description: "400g pack", price: "165.00" },
        { name: "Trixie Dog Leash", description: "120cm nylon", price: "275.00" }
      ]
    };

    return itemsByVendor[vendor.id] || [];
  };

  // Get context-aware CTAs for each business type
  const getBusinessCTAs = (vendor: any) => {
    const ctasByCategory: { [key: string]: any[] } = {
      "Veg Restaurant": [
        { label: "Order", action: "order", style: "bg-green-600 text-white hover:bg-green-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "Cafe": [
        { label: "Order", action: "order", style: "bg-green-600 text-white hover:bg-green-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "Pharmacy": [
        { label: "Find Medicines", action: "medicines", style: "bg-blue-600 text-white hover:bg-blue-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "Ambulance": [
        { label: "Call", action: "call", style: "bg-red-600 text-white hover:bg-red-700" },
        { label: "Message", action: "message", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "Departmental Store": [
        { label: "Order", action: "order", style: "bg-green-600 text-white hover:bg-green-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "General Store": [
        { label: "Order", action: "order", style: "bg-green-600 text-white hover:bg-green-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ],
      "Pet Care": [
        { label: "Order", action: "order", style: "bg-green-600 text-white hover:bg-green-700" },
        { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
      ]
    };

    return ctasByCategory[vendor.category] || [
      { label: "View", action: "view", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" },
      { label: "Call", action: "call", style: "border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50" }
    ];
  };

  // Handle business-specific actions
  const handleBusinessAction = async (vendorId: string, action: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return;

    if (trackAnalytics) {
      await trackAnalytics('vendor_action', { vendorId, vendorName: vendor.name, action });
    }

    switch (action) {
      case 'order':
        alert(`Order from ${vendor.name} - Feature coming soon! Call ${vendor.phone || 'them'} for now.`);
        break;
      case 'call':
        if (vendor.phone) {
          window.open(`tel:${vendor.phone}`, '_self');
        }
        break;
      case 'message':
        if (vendor.phone) {
          window.open(`sms:${vendor.phone}`, '_self');
        }
        break;
      case 'medicines':
        alert(`Find medicines at ${vendor.name} - Search feature coming soon! Call ${vendor.phone || 'them'} for availability.`);
        break;
      default:
        handleVendorView(vendorId);
    }
  };

  // Handle item ordering
  const handleItemOrder = async (vendorId: string, itemName: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor && trackAnalytics) {
      await trackAnalytics('item_order', { vendorId, vendorName: vendor.name, itemName });
    }
    alert(`Order "${itemName}" from ${vendor?.name} - Feature coming soon! Call ${vendor?.phone || 'them'} to place order.`);
  };

  return (
    <main className="bg-white text-neutral-900 antialiased min-h-screen flex flex-col">
      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                {t.welcomeToFindVee}
              </h2>
              <p className="text-neutral-600 mb-6">
                {t.signInMessage}
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {authError}
                </div>
              )}

              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
                className="w-full mb-4 px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-google-fill text-red-500"></i>
                {t.signInWithGoogle}
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">{t.orDivider}</span>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder={t.passwordPlaceholder}
                  className="px-4 py-3 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  disabled={isAuthenticating}
                />
                {authMode === 'signup' && (
                  <PasswordInput
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="px-4 py-3 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                    disabled={isAuthenticating}
                  />
                )}
              </div>

              <button
                onClick={handleAuth}
                disabled={isAuthenticating || !email || !password}
                className={`w-full mt-6 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:opacity-90 cursor-pointer ${(isAuthenticating || !email || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAuthenticating ? 
                  (authMode === 'signin' ? t.signingIn : t.signingUp) : 
                  (authMode === 'signin' ? t.signInButton : t.signUpButton)
                }
              </button>

              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="mt-4 text-neutral-600 hover:text-neutral-900 cursor-pointer text-sm"
                disabled={isAuthenticating}
              >
                {authMode === 'signin' ? t.switchToSignUp : t.switchToSignIn}
              </button>

              {!isAuthenticating && (
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="mt-2 block mx-auto text-neutral-600 hover:text-neutral-900 cursor-pointer text-sm"
                >
                  {t.cancel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOP NAV */}
      <header className="w-full border-b border-neutral-200 py-4 px-6 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center">
          <div className="h-12 flex items-center">
            <span className="text-2xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>
              FindVee
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-neutral-700">
          <button onClick={handleHomeClick} className="flex items-center gap-2 hover:text-neutral-900 cursor-pointer px-3 py-2 rounded-lg hover:bg-neutral-50">
            <i className="ri-home-line w-4 h-4 flex items-center justify-center"></i> 
            <span>{t.home}</span>
          </button>
          <a href="#help" className="flex items-center gap-2 hover:text-neutral-900 cursor-pointer px-3 py-2 rounded-lg hover:bg-neutral-50">
            <i className="ri-question-line w-4 h-4 flex items-center justify-center"></i> 
            <span>{t.help}</span>
          </a>
          <div className="relative">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as keyof typeof translations)} 
              className="flex items-center gap-1 border border-neutral-300 px-3 py-2 rounded-lg pr-8 cursor-pointer hover:border-neutral-900 text-sm"
            >
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatarUrl || ''} 
                  alt={user.displayName || 'User'} 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{t.welcome}, {user.displayName || user.email}</span>
                {user.userType === 'admin' && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Admin</span>
                )}
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 border border-neutral-300 hover:border-neutral-900 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {setShowAuthModal(true); setAuthMode('signin'); setAuthError('');}}
                  className="px-4 py-2 border border-neutral-300 hover:border-neutral-900 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  {t.login}
                </button>
                <button 
                  onClick={() => {setShowAuthModal(true); setAuthMode('signup'); setAuthError('');}}
                  className="px-4 py-2 bg-neutral-900 text-white hover:opacity-90 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  {t.signup}
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* STICKY SEARCH BAR */}
      {stickySearch && hasSearched && !isOutsideCoverage && (
        <div className="fixed top-20 left-0 right-0 bg-white border-b border-neutral-200 py-4 px-6 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder(location)}
              className="flex-1 h-14 px-4 border border-neutral-300 rounded-lg outline-none placeholder-neutral-500 text-sm focus:border-neutral-900"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-14 px-3 border border-neutral-300 rounded-lg text-sm pr-8 cursor-pointer focus:border-neutral-900 min-w-[140px]"
            >
              {Object.keys(CITY_CENTERS).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button
              onClick={detectUserLocation}
              disabled={isDetectingLocation}
              className="h-14 px-4 border border-neutral-300 hover:border-neutral-900 rounded-lg cursor-pointer flex items-center justify-center disabled:opacity-50 hover:bg-neutral-50"
              title={t.useMyLocation}
            >
              <i className={`w-5 h-5 flex items-center justify-center ${isDetectingLocation ? 'ri-loader-4-line animate-spin' : 'ri-crosshair-line'}`}></i>
            </button>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="h-14 px-8 bg-neutral-900 text-white text-sm rounded-lg hover:opacity-90 whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : t.search}
            </button>
          </div>
        </div>
      )}

      {/* OUTSIDE coverage hero */}
      {isOutsideCoverage && renderOutsideCoverageHero()}

      {/* HERO */}
      {!isOutsideCoverage && (
        <section className={hasSearched ? 'pb-8' : ''}>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-12">
              {t.heroSubtitle}
            </p>

            {/* Location Status with improved messaging */}
            {isDetectingLocation && (
              <div className="mb-6 flex items-center justify-center gap-2 text-sm text-neutral-600">
                <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                {t.detectingLocation}
              </div>
            )}
            
            {locationPermissionDenied && (
              <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg max-w-lg mx-auto">
                <div className="flex items-center gap-3 text-sm text-orange-800">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                  <div className="text-left">
                    <p className="font-medium">Location access needed</p>
                    <p className="text-xs mt-1">
                      Please enable location in your browser settings and refresh the page, or manually select your city below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEARCH + LOCATION */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3 justify-center max-w-4xl mx-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder(location)}
                className="flex-1 h-14 px-5 border border-neutral-300 rounded-lg outline-none placeholder-neutral-500 text-base focus:border-neutral-900 shadow-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-14 px-4 border border-neutral-300 rounded-lg text-base pr-10 cursor-pointer focus:border-neutral-900 shadow-sm min-w-[140px]"
              >
                {Object.keys(CITY_CENTERS).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button
                onClick={detectUserLocation}
                disabled={isDetectingLocation}
                className="h-14 px-4 border border-neutral-300 hover:border-neutral-900 rounded-lg cursor-pointer flex items-center justify-center disabled:opacity-50 hover:bg-neutral-50 shadow-sm"
                title={t.useMyLocation}
              >
                <i className={`w-5 h-5 flex items-center justify-center ${isDetectingLocation ? 'ri-loader-4-line animate-spin' : 'ri-crosshair-line'}`}></i>
              </button>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="h-14 px-8 bg-neutral-900 text-white text-base font-medium rounded-lg hover:opacity-90 whitespace-nowrap cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isSearching ? 'Searching...' : t.search}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH RESULTS */}
      {hasSearched && !isOutsideCoverage && (
        <section id="search-results" className={`bg-neutral-50 ${stickySearch ? 'pt-24' : ''}`}>
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {getSearchResultsHeader()}
              </h2>
              {totalResults > 0 && (
                <span className="text-neutral-600">
                  {t.showingResults(Math.min(searchResults.length, totalResults))}
                </span>
              )}
            </div>

            {isSearching ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-900"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                {/* Results Grid - 2 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                  {searchResults.map((v) => (
                    <article key={v.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-neutral-100">
                      <div className="flex h-48">
                        {/* Image - fixed width for consistency */}
                        <div className="w-48 flex-shrink-0">
                          <Img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0 pr-3">
                                <h3 className="font-semibold text-lg text-neutral-900 mb-1 line-clamp-1">{v.name}</h3>
                                <p className="text-sm text-neutral-600 mb-2">
                                  {v.category} • {v.sublocality || v.city}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {v.showsServesPill && v.distanceFromCity !== undefined && (
                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                      {t.serves(location, v.distanceFromCity)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-lg">
                                <i className="ri-star-fill text-yellow-400 w-4 h-4 flex items-center justify-center"></i>
                                <span className="text-sm font-medium text-neutral-900">{v.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-neutral-700 line-clamp-2 mb-4">
                              {v.description}
                            </p>
                          </div>
                          
                          {/* Action buttons - improved styling */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleVendorView(v.id)}
                              className="flex-1 px-4 py-2 border border-neutral-300 hover:border-neutral-900 rounded-lg whitespace-nowrap cursor-pointer text-center font-medium hover:bg-neutral-50 transition-colors"
                            >
                              {t.view}
                            </button>
                            {v.phone && (
                              <button 
                                onClick={() => handleVendorCall(v.id)}
                                className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 font-medium transition-colors"
                              >
                                <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                                {t.call}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {searchResults.length < totalResults && (
                  <div className="text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3 border border-neutral-300 hover:border-neutral-900 rounded-lg font-medium cursor-pointer hover:bg-neutral-50 transition-colors"
                    >
                      {t.loadMore}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <i className="ri-search-line text-4xl text-neutral-400"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.noResults}</h3>
                <p className="text-neutral-600 mb-8 max-w-md mx-auto">{t.noResultsMessage(location)}</p>
                
                {/* Quick search chips */}
                <div className="mb-10">
                  <p className="text-neutral-700 mb-4 font-medium">{t.trySearching}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {quickSearchChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => handleQuickSearch(chip.label)}
                        className="px-6 py-3 bg-white border border-neutral-300 hover:border-neutral-900 rounded-lg cursor-pointer flex items-center gap-3 font-medium hover:bg-neutral-50 transition-colors shadow-sm"
                      >
                        <i className={`${chip.icon} w-4 h-4 flex items-center justify-center`}></i>
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Explore Services suggestion */}
                <button 
                  onClick={handleExploreServices}
                  className="px-8 py-3 bg-neutral-900 text-white rounded-lg hover:opacity-90 cursor-pointer font-medium"
                >
                  {t.exploreServices}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CATEGORIES - enhanced styling */}
      {!hasSearched && !isOutsideCoverage && (
        <section id="categories" className="bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((c) => (
                <article key={c.key} className="bg-white shadow-sm flex flex-col overflow-hidden hover:shadow-lg transition-all cursor-pointer rounded-xl border border-neutral-100 hover:border-neutral-200">
                  <Img src={c.image} alt={t[c.key as keyof typeof t]} className="w-full h-48 object-cover object-top" />
                  <div className="p-6 flex flex-col flex-1 justify-between text-center">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{t[c.key as keyof typeof t]}</h3>
                      <p className="text-sm text-neutral-600 mb-4">{t[`${c.key}Tagline` as keyof typeof t]}</p>
                    </div>
                    <button 
                      onClick={() => handleCategoryExplore(c.key)}
                      className="px-6 py-2 border border-neutral-300 hover:border-neutral-900 rounded-lg whitespace-nowrap cursor-pointer font-medium hover:bg-neutral-50 transition-colors"
                    >
                      {t.explore}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED VENDORS - Clean Apple-inspired design */}
      {!hasSearched && !isOutsideCoverage && (
        <section id="featured" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.featured(location)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.slice(0, 6).map((v) => (
                <article key={v.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl hover:border-neutral-200 transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative">
                    <Img src={v.image} alt={v.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      <span className="text-sm font-semibold text-neutral-900">{v.rating}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">{v.name}</h3>
                      <p className="text-sm text-neutral-600">{v.category} • {v.sublocality || v.city}</p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-neutral-700 mb-4 line-clamp-2 leading-relaxed">{v.description}</p>
                    
                    {/* Featured Items - Only for non-ambulance businesses */}
                    {v.category !== 'Ambulance' && getFeaturedItemsForVendor(v).length > 0 && (
                      <>
                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-neutral-900 mb-3">Popular Items</h4>
                          {renderFeaturedItems(v)}
                        </div>
                        
                        {/* Search Input - Only for non-ambulance businesses */}
                        <div className="mb-5">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder={`Search in ${v.name}...`}
                              className="w-full px-4 py-2.5 text-sm border border-neutral-200 rounded-xl focus:border-neutral-400 focus:ring-0 outline-none bg-neutral-50 placeholder-neutral-500"
                              readOnly
                            />
                            <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm"></i>
                          </div>
                        </div>
                      </>
                    )}

                    {/* For Ambulance - Show service info instead */}
                    {v.category === 'Ambulance' && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="ri-heart-pulse-line text-red-600 text-lg"></i>
                          <span className="text-sm font-semibold text-red-800">Emergency Medical Service</span>
                        </div>
                        <p className="text-sm text-neutral-700 leading-relaxed">{v.description}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {getBusinessCTAs(v).map((cta, index) => (
                        <button 
                          key={index}
                          onClick={() => handleBusinessAction(v.id, cta.action)}
                          className={`flex-1 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${cta.style}`}
                        >
                          {cta.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Bottom note */}
            <div className="text-center mt-12">
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Each business tile shows popular items with quick ordering. Use search within each tile to find more products.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA - enhanced styling */}
      {!hasSearched && !isOutsideCoverage && (
        <section className="bg-neutral-900 text-white">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleExploreServices}
                className="bg-white text-neutral-900 px-8 py-4 text-lg font-medium rounded-lg hover:opacity-90 whitespace-nowrap cursor-pointer shadow-lg"
              >
                {t.exploreServices}
              </button>
              <button 
                onClick={handleListBusiness}
                className="border-2 border-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-white hover:text-neutral-900 whitespace-nowrap cursor-pointer transition-colors"
              >
                {t.listBusiness}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER - removed Made with Readdy */}
      <footer className="border-t border-neutral-200 mt-auto bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <span className="text-2xl font-bold mb-4 block" style={{ fontFamily: '"Pacifico", serif' }}>
                FindVee
              </span>
              <p className="text-neutral-600 max-w-md">
                Your one-stop platform for discovering local services in Udupi, Manipal, Kundapura & Koteshwara. 
                Find restaurants, pharmacies, PGs, shops and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.exploreServices}</a>
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.listBusiness}</a>
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.help}</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.terms}</a>
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.privacy}</a>
                <a href="#" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.support}</a>
                <a href="#about" className="block text-neutral-600 hover:text-neutral-900 cursor-pointer">{t.about}</a>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-6 text-center">
            <p className="text-neutral-600">© {new Date().getFullYear()} {t.copyright}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom styles for line clamping */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
