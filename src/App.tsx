import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { PreArrivalIntro } from './components/PreArrivalIntro';
import { DocumentUpload } from './components/DocumentUpload';
import { InformationConfirmation } from './components/InformationConfirmation';
import { VisaApplication } from './components/VisaApplication';
import { CustomsDeclaration } from './components/CustomsDeclaration';
import { HealthPass } from './components/HealthPass';
import { Insurance } from './components/Insurance';
import { ArrivalTax } from './components/ArrivalTax';
import { Payment } from './components/Payment';
import { QRCode } from './components/QRCode';
import { BorderControl } from './components/BorderControl';
import { MyTrip } from './components/MyTrip';
import { Profile } from './components/Profile';
import { PaymentSuccess } from './components/PaymentSuccess';

export type User = {
  email: string;
  name: string;
};

export type Traveler = {
  id: string;
  isMinor: boolean;
  personalDetails: {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    passportNumber: string;
    nationality: string;
    dateOfExpiry: string;
    issuingPlace: string;
    dateOfArrival: string;
    placeOfArrival: string;
    modeOfTransport: string;
    flightVesselNumber: string;
  };
  departureDetails: {
    dateOfDeparture: string;
    placeOfDeparture: string;
    modeOfTransport: string;
    flightVesselNumber: string;
  };
  accommodationDetails: {
    residenceType: string;
    address1: string;
    address2: string;
    postalCode: string;
  };
  contactDetails: {
    email: string;
    countryOfResidence: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    phone: string;
    occupation: string;
  };
  documents: {
    passport: boolean;
    flight: boolean;
    accommodation: boolean;
  };
  entryRequirements: {
    visa: boolean;
    customs: boolean;
    health: boolean;
    insurance: boolean;
    tax: boolean;
  };
};

export const COUNTRIES = [
  'Bali',
  'Morocco',
  'Lebanon',
  'Cyprus',
  'Greece',
  'Portugal',
  'Spain',
  'Kenya',
  'Tanzania',
  'Nigeria',
  'Bahamas',
  'Costa Rica',
  'Aruba',
  'Mexico'
];

// Country ISO codes for flag API
export const COUNTRY_CODES: { [key: string]: string } = {
  'Bali': 'id', // Indonesia (Bali is part of Indonesia)
  'Morocco': 'ma',
  'Lebanon': 'lb',
  'Cyprus': 'cy',
  'Greece': 'gr',
  'Portugal': 'pt',
  'Spain': 'es',
  'Kenya': 'ke',
  'Tanzania': 'tz',
  'Nigeria': 'ng',
  'Bahamas': 'bs',
  'Costa Rica': 'cr',
  'Aruba': 'aw',
  'Mexico': 'mx'
};

// Function to get flag image URL from FlagCDN API (free)
export const getCountryFlagUrl = (country: string, size: 'w20' | 'w40' | 'w80' | 'w160' | 'w320' = 'w40'): string => {
  const countryCode = COUNTRY_CODES[country]?.toLowerCase() || 'id';
  return `https://flagcdn.com/${size}/${countryCode}.png`;
};

// Support information data structure
export type SupportInfo = {
  email: string;
  phone: string;
};

// Support information for each country
export const SUPPORT_INFO: { [key: string]: SupportInfo } = {
  'Bali': {
    email: 'support@balitourism.gov.id',
    phone: '+62 361 234 567'
  },
  'Morocco': {
    email: 'support@moroccotourism.ma',
    phone: '+212 522 123 456'
  },
  'Lebanon': {
    email: 'support@lebanontourism.gov.lb',
    phone: '+961 1 234 567'
  },
  'Cyprus': {
    email: 'support@visitcyprus.com.cy',
    phone: '+357 22 691 100'
  },
  'Greece': {
    email: 'support@visitgreece.gr',
    phone: '+30 210 331 0392'
  },
  'Portugal': {
    email: 'support@visitportugal.com',
    phone: '+351 21 031 2700'
  },
  'Spain': {
    email: 'support@spain.info',
    phone: '+34 901 200 300'
  },
  'Kenya': {
    email: 'support@magicalkenya.com',
    phone: '+254 20 271 3122'
  },
  'Tanzania': {
    email: 'support@tanzaniatourism.go.tz',
    phone: '+255 22 212 9161'
  },
  'Nigeria': {
    email: 'support@ntdc.gov.ng',
    phone: '+234 9 234 5678'
  },
  'Bahamas': {
    email: 'support@bahamas.com',
    phone: '+1 242 302 2000'
  },
  'Costa Rica': {
    email: 'support@visitcostarica.com',
    phone: '+506 2299 5800'
  },
  'Aruba': {
    email: 'support@aruba.com',
    phone: '+297 582 3777'
  },
  'Mexico': {
    email: 'support@visitmexico.com',
    phone: '+52 55 5250 0123'
  }
};

// Function to get support information for a country
export const getSupportInfo = (country: string): SupportInfo => {
  return SUPPORT_INFO[country] || SUPPORT_INFO['Bali'];
};

// Taxi service data structure
export type TaxiService = {
  name: string;
  rating: number;
  description: string;
  phone: string;
};

// Top 3 taxi services for each country
export const TAXI_SERVICES: { [key: string]: TaxiService[] } = {
  'Bali': [
    {
      name: 'Bali Taxi Express',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and island tours. English-speaking drivers.',
      phone: '+62 361 123-4567'
    },
    {
      name: 'Blue Bird Bali',
      rating: 4.6,
      description: 'Reliable metered taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+62 361 234-5678'
    },
    {
      name: 'Grab Bali',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Bali. Easy mobile app booking available.',
      phone: '+62 361 345-6789'
    }
  ],
  'Morocco': [
    {
      name: 'Petit Taxi Casablanca',
      rating: 4.7,
      description: 'Professional taxi service with experienced drivers. Available 24/7 for airport transfers and city tours.',
      phone: '+212 522 123-4567'
    },
    {
      name: 'Grand Taxi Marrakech',
      rating: 4.5,
      description: 'Reliable intercity taxi service. Perfect for long-distance travel and airport transfers. Comfortable vehicles.',
      phone: '+212 524 234-5678'
    },
    {
      name: 'Careem Morocco',
      rating: 4.6,
      description: 'Popular ride-hailing service with app booking. Real-time GPS tracking. Easy mobile app booking available.',
      phone: '+212 522 345-6789'
    }
  ],
  'Lebanon': [
    {
      name: 'Beirut Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+961 1 123-4567'
    },
    {
      name: 'Allo Taxi Lebanon',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+961 1 234-5678'
    },
    {
      name: 'Uber Lebanon',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Lebanon. Easy mobile app booking.',
      phone: '+961 1 345-6789'
    }
  ],
  'Cyprus': [
    {
      name: 'Nicosia Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+357 22 123-4567'
    },
    {
      name: 'Limassol Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and coastal tours. Competitive rates.',
      phone: '+357 25 234-5678'
    },
    {
      name: 'Paphos Taxi Network',
      rating: 4.7,
      description: 'Extensive coverage across Paphos area. Reliable service with real-time GPS tracking. Easy mobile app booking.',
      phone: '+357 26 345-6789'
    }
  ],
  'Greece': [
    {
      name: 'Athens Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+30 210 123-4567'
    },
    {
      name: 'Mykonos Taxi Express',
      rating: 4.6,
      description: 'Reliable taxi service for island transfers. Perfect for airport transfers and beach tours. Competitive rates.',
      phone: '+30 228 234-5678'
    },
    {
      name: 'Santorini Taxi Network',
      rating: 4.7,
      description: 'Extensive coverage across Santorini. Reliable service with real-time GPS tracking. Easy mobile app booking.',
      phone: '+30 228 345-6789'
    }
  ],
  'Portugal': [
    {
      name: 'Lisbon Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+351 21 123-4567'
    },
    {
      name: 'Porto Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+351 22 234-5678'
    },
    {
      name: 'Uber Portugal',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Portugal. Easy mobile app booking.',
      phone: '+351 21 345-6789'
    }
  ],
  'Spain': [
    {
      name: 'Madrid Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+34 91 123-4567'
    },
    {
      name: 'Barcelona Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+34 93 234-5678'
    },
    {
      name: 'Cabify Spain',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Spain. Easy mobile app booking.',
      phone: '+34 91 345-6789'
    }
  ],
  'Kenya': [
    {
      name: 'Nairobi Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+254 20 123-4567'
    },
    {
      name: 'Mombasa Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and coastal tours. Competitive rates.',
      phone: '+254 41 234-5678'
    },
    {
      name: 'Uber Kenya',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Kenya. Easy mobile app booking.',
      phone: '+254 20 345-6789'
    }
  ],
  'Tanzania': [
    {
      name: 'Dar es Salaam Taxi',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+255 22 123-4567'
    },
    {
      name: 'Zanzibar Taxi Express',
      rating: 4.6,
      description: 'Reliable taxi service for island transfers. Perfect for airport transfers and beach tours. Competitive rates.',
      phone: '+255 24 234-5678'
    },
    {
      name: 'Bolt Tanzania',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Tanzania. Easy mobile app booking.',
      phone: '+255 22 345-6789'
    }
  ],
  'Nigeria': [
    {
      name: 'Lagos Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+234 1 123-4567'
    },
    {
      name: 'Abuja Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+234 9 234-5678'
    },
    {
      name: 'Bolt Nigeria',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Nigeria. Easy mobile app booking.',
      phone: '+234 1 345-6789'
    }
  ],
  'Bahamas': [
    {
      name: 'Nassau Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and island tours. English-speaking drivers.',
      phone: '+1 242 123-4567'
    },
    {
      name: 'Paradise Island Taxi',
      rating: 4.6,
      description: 'Reliable taxi service for island transfers. Perfect for airport transfers and beach tours. Competitive rates.',
      phone: '+1 242 234-5678'
    },
    {
      name: 'Grand Bahama Taxi',
      rating: 4.7,
      description: 'Extensive coverage across Grand Bahama. Reliable service with real-time GPS tracking. Easy mobile app booking.',
      phone: '+1 242 345-6789'
    }
  ],
  'Costa Rica': [
    {
      name: 'San José Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+506 2 123-4567'
    },
    {
      name: 'Liberia Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service with GPS tracking. Perfect for airport transfers and city tours. Competitive rates.',
      phone: '+506 2 234-5678'
    },
    {
      name: 'Uber Costa Rica',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Costa Rica. Easy mobile app booking.',
      phone: '+506 2 345-6789'
    }
  ],
  'Aruba': [
    {
      name: 'Oranjestad Taxi Service',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and island tours. English-speaking drivers.',
      phone: '+297 582 123-4567'
    },
    {
      name: 'Palm Beach Taxi',
      rating: 4.6,
      description: 'Reliable taxi service for beach transfers. Perfect for airport transfers and resort tours. Competitive rates.',
      phone: '+297 586 234-5678'
    },
    {
      name: 'Aruba Taxi Network',
      rating: 4.7,
      description: 'Extensive coverage across Aruba. Reliable service with real-time GPS tracking. Easy mobile app booking.',
      phone: '+297 587 345-6789'
    }
  ],
  'Mexico': [
    {
      name: 'Mexico City Taxi',
      rating: 4.8,
      description: 'Professional drivers with clean vehicles. Available 24/7 for airport transfers and city tours. English-speaking drivers.',
      phone: '+52 55 1234-5678'
    },
    {
      name: 'Cancún Express Taxi',
      rating: 4.6,
      description: 'Reliable taxi service for resort transfers. Perfect for airport transfers and beach tours. Competitive rates.',
      phone: '+52 998 234-5678'
    },
    {
      name: 'Uber Mexico',
      rating: 4.7,
      description: 'Popular ride-hailing service with app booking. Extensive coverage across Mexico. Easy mobile app booking.',
      phone: '+52 55 3456-7890'
    }
  ]
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('Bali');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setTravelers([]);
    setCurrentPage('welcome');
  };

  const handleUpdateTravelers = (updatedTravelers: Traveler[]) => {
    setTravelers(updatedTravelers);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      {currentPage === 'welcome' && (
        <WelcomePage 
          onNavigate={handleNavigate} 
          user={user}
          onLogout={handleLogout}
          currentPage={currentPage}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} selectedCountry={selectedCountry} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          user={user}
          travelers={travelers}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          currentPage={currentPage}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'pre-arrival-intro' && (
        <PreArrivalIntro onNavigate={handleNavigate} selectedCountry={selectedCountry} />
      )}

      {currentPage === 'document-upload' && (
        <DocumentUpload
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'information-confirmation' && (
        <InformationConfirmation
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'visa-application' && (
        <VisaApplication
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
        />
      )}

      {currentPage === 'customs-declaration' && (
        <CustomsDeclaration
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'health-pass' && (
        <HealthPass
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'insurance' && (
        <Insurance
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
        />
      )}

      {currentPage === 'arrival-tax' && (
        <ArrivalTax
          travelers={travelers}
          onUpdate={handleUpdateTravelers}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
        />
      )}

      {currentPage === 'payment' && (
        <Payment
          travelers={travelers}
          user={user}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
        />
      )}

      {currentPage === 'qr-code' && (
        <QRCode
          travelers={travelers}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
          currentPage={currentPage}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'border-control' && (
        <BorderControl
          travelers={travelers}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'my-trip' && (
        <MyTrip
          travelers={travelers}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
          currentPage={currentPage}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'profile' && (
        <Profile
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          currentPage={currentPage}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      )}

      {currentPage === 'payment-success' && (
        <PaymentSuccess
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
