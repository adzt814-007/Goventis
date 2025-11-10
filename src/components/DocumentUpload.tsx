import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Upload, FileCheck, Camera, UserPlus, Trash2, ChevronDown } from 'lucide-react';
import type { Traveler } from '../App';
import { getCountryFlagUrl } from '../App';

type DocumentUploadProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function DocumentUpload({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: DocumentUploadProps) {
  const [step, setStep] = useState(1);
  const [travelerCount, setTravelerCount] = useState(travelers.length || 1);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [fileNames, setFileNames] = useState<{[key: string]: string}>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const passportInputRef = useRef<HTMLInputElement>(null);
  const flightInputRef = useRef<HTMLInputElement>(null);
  const accommodationInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const initializeTravelers = () => {
    const newTravelers: Traveler[] = [];
    for (let i = 0; i < travelerCount; i++) {
      if (travelers[i]) {
        newTravelers.push(travelers[i]);
      } else {
        newTravelers.push({
          id: `traveler-${Date.now()}-${i}`,
          isMinor: false,
          personalDetails: {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            placeOfBirth: '',
            passportNumber: '',
            nationality: '',
            dateOfExpiry: '',
            issuingPlace: '',
            dateOfArrival: '',
            placeOfArrival: '',
            modeOfTransport: '',
            flightVesselNumber: '',
          },
          departureDetails: {
            dateOfDeparture: '',
            placeOfDeparture: '',
            modeOfTransport: '',
            flightVesselNumber: '',
          },
          accommodationDetails: {
            residenceType: '',
            address1: '',
            address2: '',
            postalCode: '',
          },
          contactDetails: {
            email: '',
            countryOfResidence: '',
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            state: '',
            phone: '',
            occupation: '',
          },
          documents: {
            passport: false,
            flight: false,
            accommodation: false,
          },
          entryRequirements: {
            visa: false,
            customs: false,
            health: false,
            insurance: false,
            tax: false,
          },
          visaDetails: {
            visaType: '',
            mainPurpose: '',
            subPurpose: '',
          },
          customsDetails: {
            accompaniedBaggage: 0,
            unaccompaniedBaggage: 0,
            imeiRegistration: {
              handphone: false,
              handheld: false,
              computer: false,
              tablet: false,
            },
            hasElectronics: false,
            hasCurrency: false,
            currencyAmount: '',
            familyDeclaration: false,
            agreed: false,
          },
          healthPassDetails: {
            hasSymptoms: false,
            symptoms: {
              fever: false,
              cough: false,
              breathing: false,
              fatigue: false,
              none: true,
            },
            exposureRisk: 'no',
            recentTravel: '',
            declared: false,
          },
        });
      }
    }
    onUpdate(newTravelers);
    setStep(2);
  };

  const handleFileUpload = (type: 'passport' | 'flight' | 'accommodation', event?: React.ChangeEvent<HTMLInputElement>) => {
    // Get the actual file name
    const fileName = event?.target.files?.[0]?.name || '';
    const fileKey = `${currentTravelerIndex}-${type}`;
    
    // Store the file name
    if (fileName) {
      setFileNames(prev => ({
        ...prev,
        [fileKey]: fileName
      }));
    }
    
    // Simulate file upload
    const updatedTravelers = [...travelers];
    updatedTravelers[currentTravelerIndex].documents[type] = true;
    
    // Auto-fill mock data from uploaded document
    if (type === 'passport') {
      updatedTravelers[currentTravelerIndex].personalDetails = {
        ...updatedTravelers[currentTravelerIndex].personalDetails,
        firstName: 'John',
        lastName: 'Smith',
        gender: 'Male',
        dateOfBirth: '1985-03-15',
        placeOfBirth: 'New York, USA',
        passportNumber: 'AB1234567',
        nationality: 'United States',
        dateOfExpiry: '2030-03-15',
        issuingPlace: 'New York',
        dateOfArrival: '2025-11-15',
        placeOfArrival: 'Denpasar Airport',
        modeOfTransport: 'Air',
        flightVesselNumber: 'GA815',
      };
    } else if (type === 'flight') {
      updatedTravelers[currentTravelerIndex].personalDetails = {
        ...updatedTravelers[currentTravelerIndex].personalDetails,
        dateOfArrival: '2025-11-15',
        placeOfArrival: 'Denpasar Airport',
        modeOfTransport: 'Air',
        flightVesselNumber: 'GA815',
      };
      updatedTravelers[currentTravelerIndex].departureDetails = {
        ...updatedTravelers[currentTravelerIndex].departureDetails,
        dateOfDeparture: '2025-11-25',
        placeOfDeparture: 'Denpasar Airport',
        modeOfTransport: 'Air',
        flightVesselNumber: 'GA816',
      };
    } else if (type === 'accommodation') {
      updatedTravelers[currentTravelerIndex].accommodationDetails = {
        ...updatedTravelers[currentTravelerIndex].accommodationDetails,
        residenceType: 'Hotel',
        address1: 'Jl. Raya Ubud No. 88',
        address2: 'Ubud, Gianyar',
        postalCode: '80571',
      };
    }
    
    onUpdate(updatedTravelers);
  };

  const currentTraveler = travelers[currentTravelerIndex];
  const progress = (step / 4) * 100;

  const canProceedToNextStep = () => {
    if (step === 2 && currentTraveler) {
      return currentTraveler.documents.passport;
    }
    if (step === 3 && currentTraveler) {
      return currentTraveler.documents.flight;
    }
    if (step === 4 && currentTraveler) {
      return currentTraveler.documents.accommodation;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 4) {
      if (currentTravelerIndex < travelers.length - 1) {
        setCurrentTravelerIndex(currentTravelerIndex + 1);
        setStep(2);
      } else {
        onNavigate('information-confirmation');
      }
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => step === 1 ? onNavigate('pre-arrival-intro') : setStep(step - 1)}
            className="text-white mb-3 p-0"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back
          </Button>
          <h1 className="text-white mb-0 d-flex align-items-center gap-2">
            <img 
              src={getCountryFlagUrl(selectedCountry, 'w40')}
              alt={`${selectedCountry} flag`}
              style={{ 
                width: '32px', 
                height: '24px', 
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            Document Upload
          </h1>
          <p className="text-white mt-2 mb-0">Step {step} of 4</p>
        </Container>
      </div>

      <Container>
        <div className="mb-4">
          <div className="bg-light rounded" style={{ height: '10px', borderRadius: '10px', overflow: 'hidden' }}>
            <div 
              className="rounded" 
              style={{ 
                height: '100%', 
                width: `${progress}%`, 
                backgroundColor: 'var(--primary)',
                transition: 'width 0.5s ease',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
              }} 
            />
          </div>
        </div>

        {/* Step 1: Traveler Count */}
        {step === 1 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h2 className="mb-4">How many travelers are in your group?</h2>
              <p className="text-muted mb-4">
                You can add up to 5 travelers. Each traveler will need to complete the documentation process.
              </p>

              <div className="mb-4">
                <Label htmlFor="travelerCount">Number of Travelers</Label>
                <div className="position-relative mt-2" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-100 d-flex align-items-center justify-content-between border rounded"
                    style={{
                      borderColor: 'var(--border)',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      minWidth: '100%',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      color: 'var(--foreground)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    <span className="text-start">
                      {travelerCount} {travelerCount === 1 ? 'Traveler' : 'Travelers'}
                    </span>
                    <ChevronDown 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </button>
                  
                  {showDropdown && (
                    <div
                      className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg w-100"
                      style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        borderColor: 'var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setTravelerCount(num);
                            setShowDropdown(false);
                          }}
                          className="w-100 d-flex align-items-center justify-content-between border-0 text-start p-2"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: num === travelerCount ? 'var(--primary)' : 'transparent',
                            color: num === travelerCount ? 'white' : 'var(--foreground)',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (num !== travelerCount) {
                              e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (num !== travelerCount) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <span>{num} {num === 1 ? 'Traveler' : 'Travelers'}</span>
                          {num === travelerCount && (
                            <span style={{ color: 'white' }}>✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-primary bg-opacity-10 border border-primary rounded p-3 mb-4">
                <p className="small text-white mb-0">
                  <strong>Note:</strong> Minors (under 18) have simplified documentation requirements. You'll be able to specify if any travelers are minors in the next steps.
                </p>
              </div>

              <div className="d-flex justify-content-end">
                <Button onClick={initializeTravelers} >
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps 2-4: Document Upload for each traveler */}
        {step >= 2 && currentTraveler && (
          <>
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <div>
                <h2 className="mb-1">Traveler {currentTravelerIndex + 1} of {travelers.length}</h2>
                <p className="text-muted mb-0">Upload required documents</p>
              </div>
              <Badge variant="outline" bg="secondary">
                {Object.values(currentTraveler.documents).filter(Boolean).length} / 3 Uploaded
              </Badge>
            </div>

            {/* Step 2: Passport Upload */}
            {step === 2 && (
              <Card style={{ borderWidth: '2px' }}>
                <CardContent className="pt-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="h5 mb-0">Upload Passport</h3>
                    {currentTraveler.documents.passport && (
                      <Badge bg="success">Uploaded</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted mb-4">
                    Upload a clear photo of your passport information page. This information will be used to auto-fill your personal details.
                  </p>

                  {!currentTraveler.documents.passport ? (
                    <div>
                      <div 
                        className="border border-2 border-dashed border-secondary rounded p-5 text-center mb-3" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => passportInputRef.current?.click()}
                      >
                        <Upload style={{ width: '48px', height: '48px', color: '#6c757d', margin: '0 auto 16px' }} />
                        <p className="mb-2">Click to upload or drag and drop</p>
                        <p className="small text-muted mb-0">PDF, JPG, PNG up to 10MB</p>
                        <input
                          ref={passportInputRef}
                          type="file"
                          className="d-none"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('passport', e)}
                        />
                      </div>

                      <div className="text-center mb-3">
                        <span className="text-muted px-3">or</span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-100"
                        onClick={() => handleFileUpload('passport')}
                      >
                        <Camera style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                        Take Photo with Camera
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-success bg-opacity-10 border border-success rounded p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-success rounded p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px' }}>
                          <FileCheck style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div>
                          <p className="mb-0">{fileNames[`${currentTravelerIndex}-passport`] || 'passport_scan.pdf'}</p>
                          <p className="small text-muted mb-0">Uploaded successfully</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        const updated = [...travelers];
                        updated[currentTravelerIndex].documents.passport = false;
                        const fileKey = `${currentTravelerIndex}-passport`;
                        setFileNames(prev => {
                          const newNames = { ...prev };
                          delete newNames[fileKey];
                          return newNames;
                        });
                        onUpdate(updated);
                      }}>
                        Replace Document
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 d-flex justify-content-end">
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedToNextStep()}
                      style={{
                        ...(!canProceedToNextStep() ? {
                          backgroundColor: '#e9ecef',
                          borderColor: '#e9ecef',
                          color: '#6c757d',
                          cursor: 'not-allowed',
                          opacity: 0.65
                        } : {})
                      }}
                    >
                      Continue
                      <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Flight/Ferry Confirmation */}
            {step === 3 && (
              <Card style={{ borderWidth: '2px' }}>
                <CardContent className="pt-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="h5 mb-0">Upload Flight or Ferry Confirmation</h3>
                    {currentTraveler.documents.flight && (
                      <Badge bg="success">Uploaded</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted mb-4">
                    Upload your flight booking confirmation or ferry ticket. This will auto-fill your arrival and departure details.
                  </p>

                  {!currentTraveler.documents.flight ? (
                    <div>
                      <div 
                        className="border border-2 border-dashed border-secondary rounded p-5 text-center mb-3" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => flightInputRef.current?.click()}
                      >
                        <Upload style={{ width: '48px', height: '48px', color: '#6c757d', margin: '0 auto 16px' }} />
                        <p className="mb-2">Click to upload or drag and drop</p>
                        <p className="small text-muted mb-0">PDF, JPG, PNG up to 10MB</p>
                        <input
                          ref={flightInputRef}
                          type="file"
                          className="d-none"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('flight', e)}
                        />
                      </div>

                      <div className="text-center mb-3">
                        <span className="text-muted px-3">or</span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-100"
                        onClick={() => handleFileUpload('flight')}
                      >
                        <Camera style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                        Take Photo with Camera
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-success bg-opacity-10 border border-success rounded p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-success rounded p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px' }}>
                          <FileCheck style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div>
                          <p className="mb-0">{fileNames[`${currentTravelerIndex}-flight`] || 'flight_confirmation.pdf'}</p>
                          <p className="small text-muted mb-0">Uploaded successfully</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        const updated = [...travelers];
                        updated[currentTravelerIndex].documents.flight = false;
                        const fileKey = `${currentTravelerIndex}-flight`;
                        setFileNames(prev => {
                          const newNames = { ...prev };
                          delete newNames[fileKey];
                          return newNames;
                        });
                        onUpdate(updated);
                      }}>
                        Replace Document
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 d-flex justify-content-end">
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedToNextStep()}
                      style={{
                        ...(!canProceedToNextStep() ? {
                          backgroundColor: '#e9ecef',
                          borderColor: '#e9ecef',
                          color: '#6c757d',
                          cursor: 'not-allowed',
                          opacity: 0.65
                        } : {})
                      }}
                    >
                      Continue
                      <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Accommodation Confirmation */}
            {step === 4 && (
              <Card style={{ borderWidth: '2px' }}>
                <CardContent className="pt-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="h5 mb-0">Upload Accommodation Confirmation</h3>
                    {currentTraveler.documents.accommodation && (
                      <Badge bg="success">Uploaded</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted mb-4">
                    Upload your hotel, villa, or accommodation booking confirmation. This will auto-fill your accommodation address.
                  </p>

                  {!currentTraveler.documents.accommodation ? (
                    <div>
                      <div 
                        className="border border-2 border-dashed border-secondary rounded p-5 text-center mb-3" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => accommodationInputRef.current?.click()}
                      >
                        <Upload style={{ width: '48px', height: '48px', color: '#6c757d', margin: '0 auto 16px' }} />
                        <p className="mb-2">Click to upload or drag and drop</p>
                        <p className="small text-muted mb-0">PDF, JPG, PNG up to 10MB</p>
                        <input
                          ref={accommodationInputRef}
                          type="file"
                          className="d-none"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('accommodation', e)}
                        />
                      </div>

                      <div className="text-center mb-3">
                        <span className="text-muted px-3">or</span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-100"
                        onClick={() => handleFileUpload('accommodation')}
                      >
                        <Camera style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                        Take Photo with Camera
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-success bg-opacity-10 border border-success rounded p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-success rounded p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px' }}>
                          <FileCheck style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div>
                          <p className="mb-0">{fileNames[`${currentTravelerIndex}-accommodation`] || 'accommodation_booking.pdf'}</p>
                          <p className="small text-muted mb-0">Uploaded successfully</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        const updated = [...travelers];
                        updated[currentTravelerIndex].documents.accommodation = false;
                        const fileKey = `${currentTravelerIndex}-accommodation`;
                        setFileNames(prev => {
                          const newNames = { ...prev };
                          delete newNames[fileKey];
                          return newNames;
                        });
                        onUpdate(updated);
                      }}>
                        Replace Document
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 d-flex justify-content-end">
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedToNextStep()}
                      style={{
                        ...(!canProceedToNextStep() ? {
                          backgroundColor: '#e9ecef',
                          borderColor: '#e9ecef',
                          color: '#6c757d',
                          cursor: 'not-allowed',
                          opacity: 0.65
                        } : {})
                      }}
                    >
                      {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Continue to Confirmation'}
                      <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
