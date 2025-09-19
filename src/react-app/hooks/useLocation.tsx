import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedCity = 'Udupi' | 'Manipal' | 'Kundapura' | 'Koteshwara';

export const SUPPORTED_CITIES: SupportedCity[] = ['Udupi', 'Manipal', 'Kundapura', 'Koteshwara'];

interface LocationContextType {
  selectedCity: SupportedCity;
  setSelectedCity: (city: SupportedCity) => void;
  isDetecting: boolean;
  hasLocationPermission: boolean;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [selectedCity, setSelectedCityState] = useState<SupportedCity>('Udupi');
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  // Load saved city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('findvee-selected-city');
    if (savedCity && SUPPORTED_CITIES.includes(savedCity as SupportedCity)) {
      setSelectedCityState(savedCity as SupportedCity);
    }
  }, []);

  const setSelectedCity = (city: SupportedCity) => {
    setSelectedCityState(city);
    localStorage.setItem('findvee-selected-city', city);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('locationChanged', { detail: { city } }));
  };

  const detectCityFromCoordinates = (latitude: number, longitude: number): SupportedCity => {
    // Approximate coordinates for the cities (you can refine these)
    const cityCoordinates = {
      Udupi: { lat: 13.3409, lng: 74.7421 },
      Manipal: { lat: 13.3472, lng: 74.7880 },
      Kundapura: { lat: 13.6275, lng: 74.6895 },
      Koteshwara: { lat: 13.8180, lng: 74.7084 }
    };

    let closestCity: SupportedCity = 'Udupi';
    let minDistance = Infinity;

    Object.entries(cityCoordinates).forEach(([city, coords]) => {
      const distance = Math.sqrt(
        Math.pow(latitude - coords.lat, 2) + Math.pow(longitude - coords.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city as SupportedCity;
      }
    });

    return closestCity;
  };

  const requestLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      return;
    }

    setIsDetecting(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      const detectedCity = detectCityFromCoordinates(latitude, longitude);
      
      setSelectedCity(detectedCity);
      setHasLocationPermission(true);
      
    } catch (error) {
      console.warn('Could not get location:', error);
      setHasLocationPermission(false);
    } finally {
      setIsDetecting(false);
    }
  };

  // Try to detect location on first load
  useEffect(() => {
    const hasAskedBefore = localStorage.getItem('findvee-location-asked');
    if (!hasAskedBefore && navigator.geolocation) {
      localStorage.setItem('findvee-location-asked', 'true');
      requestLocation();
    }
  }, []);

  const value: LocationContextType = {
    selectedCity,
    setSelectedCity,
    isDetecting,
    hasLocationPermission,
    requestLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
