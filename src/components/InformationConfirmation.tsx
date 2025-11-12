import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Check, UserPlus, ChevronDown, CheckCircle2, Info } from 'lucide-react';
import type { Traveler } from '../App';
import { COUNTRIES, getCountryFlagUrl } from '../App';

type InformationConfirmationProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function InformationConfirmation({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: InformationConfirmationProps) {
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [step, setStep] = useState(5); // Steps 5-9
  const [showPleaseNote, setShowPleaseNote] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const nationalityDropdownRef = useRef<HTMLDivElement>(null);
  const [showResidenceTypeDropdown, setShowResidenceTypeDropdown] = useState(false);
  const residenceTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const occupationDropdownRef = useRef<HTMLDivElement>(null);
  const [showCountryOfResidenceDropdown, setShowCountryOfResidenceDropdown] = useState(false);
  const countryOfResidenceDropdownRef = useRef<HTMLDivElement>(null);

  const currentTraveler = travelers[currentTravelerIndex];

  const handleInputChange = (
    section: 'personalDetails' | 'departureDetails' | 'accommodationDetails' | 'contactDetails',
    field: string,
    value: string
  ) => {
    const updatedTravelers = [...travelers];
    (updatedTravelers[currentTravelerIndex][section] as any)[field] = value;
    onUpdate(updatedTravelers);
  };

  const handleNext = () => {
    if (step === 9) {
      if (currentTravelerIndex < travelers.length - 1) {
        setCurrentTravelerIndex(currentTravelerIndex + 1);
        setStep(5);
      } else {
        // Show Please Note screen first
        setShowPleaseNote(true);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handlePleaseNoteOk = () => {
    setShowPleaseNote(false);
    setShowThankYou(true);
  };

  const handleThankYouNext = () => {
    setShowThankYou(false);
    onNavigate('visa-application');
  };

  const handleBack = () => {
    if (step === 5) {
      onNavigate('document-upload');
    } else {
      setStep(step - 1);
    }
  };

  const toggleMinor = () => {
    const updatedTravelers = [...travelers];
    updatedTravelers[currentTravelerIndex].isMinor = !updatedTravelers[currentTravelerIndex].isMinor;
    onUpdate(updatedTravelers);
  };

  const progress = ((step - 4) / 5) * 100;

  // Close nationality dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nationalityDropdownRef.current && !nationalityDropdownRef.current.contains(event.target as Node)) {
        setShowNationalityDropdown(false);
      }
    };

    if (showNationalityDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNationalityDropdown]);

  const handleNationalitySelect = (nationality: string) => {
    handleInputChange('personalDetails', 'nationality', nationality);
    setShowNationalityDropdown(false);
  };

  // Close residence type dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (residenceTypeDropdownRef.current && !residenceTypeDropdownRef.current.contains(event.target as Node)) {
        setShowResidenceTypeDropdown(false);
      }
    };

    if (showResidenceTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showResidenceTypeDropdown]);

  const handleResidenceTypeSelect = (residenceType: string) => {
    handleInputChange('accommodationDetails', 'residenceType', residenceType);
    setShowResidenceTypeDropdown(false);
  };

  const RESIDENCE_TYPES = ['Hotel', 'Villa', 'Resort', 'Apartment', 'Guesthouse', 'Hostel', 'Other'];

  // Close occupation dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (occupationDropdownRef.current && !occupationDropdownRef.current.contains(event.target as Node)) {
        setShowOccupationDropdown(false);
      }
    };

    if (showOccupationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOccupationDropdown]);

  const handleOccupationSelect = (occupation: string) => {
    handleInputChange('contactDetails', 'occupation', occupation);
    setShowOccupationDropdown(false);
  };

  const OCCUPATIONS = ['Student', 'Employee', 'Self-Employed', 'Business Owner', 'Retired', 'Unemployed', 'Other'];

  // Close country of residence dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryOfResidenceDropdownRef.current && !countryOfResidenceDropdownRef.current.contains(event.target as Node)) {
        setShowCountryOfResidenceDropdown(false);
      }
    };

    if (showCountryOfResidenceDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryOfResidenceDropdown]);

  const handleCountryOfResidenceSelect = (country: string) => {
    handleInputChange('contactDetails', 'countryOfResidence', country);
    setShowCountryOfResidenceDropdown(false);
  };

  // Show Please Note screen
  if (showPleaseNote) {
    return (
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="bg-primary text-white py-5 mb-5" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <Container>
            <Button
              variant="link"
              onClick={() => {
                setShowPleaseNote(false);
                // Return to step 9 of Information Confirmation
                setStep(9);
              }}
              className="text-white mb-3 p-0"
              style={{ textDecoration: 'none' }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Back
            </Button>
            <h1 className="text-white mb-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <img 
                src={getCountryFlagUrl(selectedCountry, 'w40')}
                alt={`${selectedCountry} flag`}
                style={{ 
                  width: '40px', 
                  height: '30px', 
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              Please Note
            </h1>
          </Container>
        </div>

        <Container>
          <div className="d-flex justify-content-center">
            <Card style={{ 
              borderWidth: '0',
              maxWidth: '900px', 
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <CardContent className="p-5">
                <div className="text-center mb-5">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ 
                    width: '100px', 
                    height: '100px',
                    border: '3px solid rgba(13, 148, 136, 0.2)'
                  }}>
                    <Info style={{ width: '56px', height: '56px', color: 'white' }} />
                  </div>
                  <h2 className="mb-2" style={{ 
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>
                    Important Information
                  </h2>
                  <div className="bg-primary bg-opacity-10 rounded-pill d-inline-block px-4 py-2 mb-3">
                    <span className="small fw-semibold" style={{ color: 'white' }}>
                      Review Before Proceeding
                    </span>
                  </div>
                </div>
                
                <div className="mb-5">
                  <p className="text-muted mb-4 text-center" style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#64748b'
                  }}>
                    Before proceeding to the Entry Visa Application, please review the following important points:
                  </p>
                  <div className="bg-light rounded p-4" style={{ backgroundColor: '#f8fafc' }}>
                    <ul className="mb-0" style={{ 
                      fontSize: '1rem', 
                      lineHeight: '2.2', 
                      paddingLeft: '1.5rem',
                      color: '#475569'
                    }}>
                      <li className="mb-3 d-flex align-items-start">
                        <CheckCircle2 style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: 'var(--success)', 
                          marginRight: '12px',
                          marginTop: '4px',
                          flexShrink: 0
                        }} />
                        <span>All document uploads have been successfully completed and verified</span>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <CheckCircle2 style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: 'var(--success)', 
                          marginRight: '12px',
                          marginTop: '4px',
                          flexShrink: 0
                        }} />
                        <span>All personal information has been confirmed and is ready for visa processing</span>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <CheckCircle2 style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: 'var(--success)', 
                          marginRight: '12px',
                          marginTop: '4px',
                          flexShrink: 0
                        }} />
                        <span>Please ensure all details are accurate before proceeding to the visa application</span>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <CheckCircle2 style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: 'var(--success)', 
                          marginRight: '12px',
                          marginTop: '4px',
                          flexShrink: 0
                        }} />
                        <span>You will now proceed to the Entry Visa Application process</span>
                      </li>
                      <li className="d-flex align-items-start">
                        <CheckCircle2 style={{ 
                          width: '20px', 
                          height: '20px', 
                          color: 'var(--success)', 
                          marginRight: '12px',
                          marginTop: '4px',
                          flexShrink: 0
                        }} />
                        <span>Make sure you have all required documents ready for the visa application</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5 pt-4 border-top">
                  <Button 
                    onClick={handlePleaseNoteOk} 
                    size="lg" 
                    style={{ 
                      minWidth: '220px',
                      padding: '0.875rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                    }}
                  >
                    I Understand, Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  // Show Thank You screen
  if (showThankYou) {
    return (
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="bg-primary text-white py-5 mb-5" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <Container>
            <Button
              variant="link"
              onClick={() => {
                setShowThankYou(false);
                setShowPleaseNote(true);
              }}
              className="text-white mb-3 p-0"
              style={{ textDecoration: 'none' }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Back
            </Button>
            <h1 className="text-white mb-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <img 
                src={getCountryFlagUrl(selectedCountry, 'w40')}
                alt={`${selectedCountry} flag`}
                style={{ 
                  width: '40px', 
                  height: '30px', 
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              Thank You
            </h1>
          </Container>
        </div>

        <Container>
          <div className="d-flex justify-content-center">
            <Card style={{ 
              borderWidth: '0',
              maxWidth: '900px', 
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)'
            }}>
              <CardContent className="p-5">
                <div className="text-center mb-5">
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ 
                    width: '120px', 
                    height: '120px',
                    border: '4px solid rgba(25, 135, 84, 0.2)',
                    animation: 'pulse 2s infinite'
                  }}>
                    <CheckCircle2 style={{ 
                      width: '64px', 
                      height: '64px', 
                      color: 'var(--success)',
                      filter: 'drop-shadow(0 2px 4px rgba(25, 135, 84, 0.3))'
                    }} />
                  </div>
                  <h2 className="mb-3" style={{ 
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: '700',
                    color: '#1e293b',
                    letterSpacing: '-0.02em'
                  }}>
                    Thank You!
                  </h2>
                  <div className="bg-success bg-opacity-10 rounded-pill d-inline-block px-4 py-2 mb-4">
                    <span className="small fw-semibold" style={{ color: 'var(--success)' }}>
                      ✓ All Information Confirmed
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="bg-white rounded p-4 mb-4" style={{ 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}>
                    <p className="text-center mb-3" style={{ 
                      fontSize: '1.15rem', 
                      lineHeight: '1.8',
                      color: '#475569',
                      fontWeight: '500'
                    }}>
                      Thank you for providing all your details.
                    </p>
                    <p className="text-center mb-0" style={{ 
                      fontSize: '1rem', 
                      lineHeight: '1.8',
                      color: '#64748b'
                    }}>
                      Your document upload and information confirmation have been successfully completed and verified.
                    </p>
                  </div>
                  
                  <div className="bg-primary bg-opacity-5 border-start border-primary border-4 rounded p-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ 
                        width: '48px', 
                        height: '48px'
                      }}>
                        <CheckCircle2 style={{ 
                          width: '34px', 
                          height: '34px', 
                          color: 'white'
                        }} />
                      </div>
                      <div>
                        <h4 className="mb-2" style={{ color: 'white', fontSize: '1.1rem' }}>
                          Ready to Continue
                        </h4>
                        <p className="mb-0" style={{ 
                          fontSize: '0.95rem',
                          color: '#fff',
                          lineHeight: '1.7'
                        }}>
                          You can now proceed to the Entry Visa Application to continue with your travel documentation process. 
                          All your information is securely stored and ready for visa processing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5 pt-4 border-top">
                  <Button 
                    onClick={handleThankYouNext} 
                    size="lg" 
                    style={{ 
                      minWidth: '280px',
                      padding: '0.875rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                    }}
                  >
                    Continue to Entry Visa Application
                    <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={handleBack}
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
            Information Confirmation
          </h1>
          <p className="text-white mt-2 mb-0">Step {step} of 9</p>
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

        <div className="mb-4 d-md-flex align-items-center justify-content-between">
          <div>
            <h2 className="mb-1">Traveler {currentTravelerIndex + 1} of {travelers.length}</h2>
            <p className="text-muted mb-0">Confirm auto-filled information and add contact details</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Checkbox
              id="isMinor"
              checked={currentTraveler?.isMinor}
              onChange={(e) => toggleMinor()}
            />
            <Label htmlFor="isMinor" className="mb-0" style={{ cursor: 'pointer' }}>
              Minor (Under 18)
            </Label>
          </div>
        </div>

        {/* Step 5: Personal Details */}
        {step === 5 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="h5 mb-0">Personal Details</h3>
                <Badge variant="outline" style={{color:"#0d9488 "}}>Auto-filled from Passport</Badge>
              </div>

              <div>
                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={currentTraveler?.personalDetails.firstName || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={currentTraveler?.personalDetails.lastName || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label className="mb-2 d-block">Gender</Label>
                    <RadioGroup 
                      value={currentTraveler?.personalDetails.gender || ''} 
                      onValueChange={(value) => handleInputChange('personalDetails', 'gender', value)}
                      className="mt-2"
                    >
                      <div className="d-flex flex-row gap-3">
                        <div className="d-flex align-items-center">
                          <RadioGroupItem value="Male" id="gender-male" className="mt-1" />
                          <Label htmlFor="gender-male" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Male
                          </Label>
                        </div>
                        <div className="d-flex align-items-center">
                          <RadioGroupItem value="Female" id="gender-female" className="mt-1" />
                          <Label htmlFor="gender-female" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Female
                          </Label>
                        </div>
                        <div className="d-flex align-items-center">
                          <RadioGroupItem value="Other" id="gender-other" className="mt-1" />
                          <Label htmlFor="gender-other" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Other
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={currentTraveler?.personalDetails.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="placeOfBirth">Place of Birth</Label>
                    <Input
                      id="placeOfBirth"
                      value={currentTraveler?.personalDetails.placeOfBirth || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'placeOfBirth', e.target.value)}
                      className="mt-2"
                      placeholder="City, Country"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="passportNumber">Passport Number</Label>
                    <Input
                      id="passportNumber"
                      value={currentTraveler?.personalDetails.passportNumber || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'passportNumber', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="nationality">Nationality</Label>
                    <div className="position-relative mt-2" ref={nationalityDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowNationalityDropdown(!showNationalityDropdown)}
                        className="d-flex align-items-center gap-2 border rounded w-100"
                        style={{
                          borderColor: 'var(--border)',
                          borderRadius: '6px',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          backgroundColor: '#fff',
                          color: 'var(--foreground)',
                          transition: 'all 0.2s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--primary-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff';
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      >
                        {currentTraveler?.personalDetails.nationality ? (
                          <>
                            <img 
                              src={getCountryFlagUrl(currentTraveler.personalDetails.nationality, 'w40')}
                              alt={`${currentTraveler.personalDetails.nationality} flag`}
                              style={{ 
                                width: '24px', 
                                height: '18px', 
                                objectFit: 'cover',
                                borderRadius: '2px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                flexShrink: 0
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <span className="flex-grow-1 text-start">{currentTraveler.personalDetails.nationality}</span>
                          </>
                        ) : (
                          <span className="flex-grow-1 text-start text-muted">Select Nationality</span>
                        )}
                        <ChevronDown 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            transform: showNationalityDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0
                          }} 
                        />
                      </button>
                      
                      {showNationalityDropdown && (
                        <div
                          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                          style={{
                            minWidth: '100%',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          {COUNTRIES.map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleNationalitySelect(country)}
                              className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: country === currentTraveler?.personalDetails.nationality ? 'var(--primary)' : 'transparent',
                                color: country === currentTraveler?.personalDetails.nationality ? 'white' : 'var(--foreground)',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (country !== currentTraveler?.personalDetails.nationality) {
                                  e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (country !== currentTraveler?.personalDetails.nationality) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                } else {
                                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                                }
                              }}
                            >
                              <img 
                                src={getCountryFlagUrl(country, 'w40')}
                                alt={`${country} flag`}
                                style={{ 
                                  width: '24px', 
                                  height: '18px', 
                                  objectFit: 'cover',
                                  borderRadius: '2px',
                                  border: '1px solid rgba(0, 0, 0, 0.1)',
                                  flexShrink: 0
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <span>{country}</span>
                              {country === currentTraveler?.personalDetails.nationality && (
                                <span className="ms-auto" style={{ color: 'white' }}>✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="dateOfExpiry">Date of Expiry</Label>
                    <Input
                      id="dateOfExpiry"
                      type="date"
                      value={currentTraveler?.personalDetails.dateOfExpiry || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'dateOfExpiry', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col sm={12}>
                    <Label htmlFor="issuingPlace">Issuing Place</Label>
                    <Input
                      id="issuingPlace"
                      value={currentTraveler?.personalDetails.issuingPlace || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'issuingPlace', e.target.value)}
                      className="mt-2"
                      placeholder="City where passport was issued"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-4 bg-primary bg-opacity-10 border border-primary rounded p-3">
                <p className="small text-white mb-0">
                  <Check style={{ width: '16px', height: '16px', color: 'white', marginRight: '8px', display: 'inline' }} />
                  Information auto-filled from your passport. Please verify all details are correct.
                </p>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Arrival Details */}
        {step === 6 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="h5 mb-0">Arrival Details</h3>
                <Badge variant="outline">Auto-filled from Booking</Badge>
              </div>

              <div>
                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="dateOfArrival">Date of Arrival</Label>
                    <Input
                      id="dateOfArrival"
                      type="date"
                      value={currentTraveler?.personalDetails.dateOfArrival || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'dateOfArrival', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="placeOfArrival">Place of Arrival</Label>
                    <Input
                      id="placeOfArrival"
                      value={currentTraveler?.personalDetails.placeOfArrival || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'placeOfArrival', e.target.value)}
                      className="mt-2"
                      placeholder="Airport / Port Name"
                    />
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col sm={6}>
                    <Label htmlFor="modeOfTransport">Mode of Transport</Label>
                    <Input
                      id="modeOfTransport"
                      value={currentTraveler?.personalDetails.modeOfTransport || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'modeOfTransport', e.target.value)}
                      className="mt-2"
                      placeholder="Air / Sea"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="flightVesselNumber">Flight / Vessel Number</Label>
                    <Input
                      id="flightVesselNumber"
                      value={currentTraveler?.personalDetails.flightVesselNumber || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'flightVesselNumber', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-4 bg-primary bg-opacity-10 border border-primary rounded p-3">
                <p className="small text-white mb-0">
                  <Check style={{ width: '16px', height: '16px', color: 'white', marginRight: '8px', display: 'inline' }} />
                  Information auto-filled from your booking confirmation. Please verify all details are correct.
                </p>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Departure Details */}
        {step === 7 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="h5 mb-0">Departure Details</h3>
                <Badge variant="outline">Auto-filled from Booking</Badge>
              </div>

              <div>
                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="dateOfDeparture">Date of Departure</Label>
                    <Input
                      id="dateOfDeparture"
                      type="date"
                      value={currentTraveler?.departureDetails.dateOfDeparture || ''}
                      onChange={(e) => handleInputChange('departureDetails', 'dateOfDeparture', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="placeOfDeparture">Place of Departure</Label>
                    <Input
                      id="placeOfDeparture"
                      value={currentTraveler?.departureDetails.placeOfDeparture || ''}
                      onChange={(e) => handleInputChange('departureDetails', 'placeOfDeparture', e.target.value)}
                      className="mt-2"
                      placeholder="Airport / Port Name"
                    />
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col sm={6}>
                    <Label htmlFor="departureModeOfTransport">Mode of Transport</Label>
                    <Input
                      id="departureModeOfTransport"
                      value={currentTraveler?.departureDetails.modeOfTransport || ''}
                      onChange={(e) => handleInputChange('departureDetails', 'modeOfTransport', e.target.value)}
                      className="mt-2"
                      placeholder="Air / Sea"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="departureFlightVesselNumber">Flight / Vessel Number</Label>
                    <Input
                      id="departureFlightVesselNumber"
                      value={currentTraveler?.departureDetails.flightVesselNumber || ''}
                      onChange={(e) => handleInputChange('departureDetails', 'flightVesselNumber', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-4 bg-primary bg-opacity-10 border border-primary rounded p-3">
                <p className="small text-white mb-0">
                  <Check style={{ width: '16px', height: '16px', color: 'white', marginRight: '8px', display: 'inline' }} />
                  Information auto-filled from your booking confirmation. Please verify all details are correct.
                </p>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 8: Accommodation Details */}
        {step === 8 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="h5 mb-0">Accommodation Details</h3>
                <Badge variant="outline">Auto-filled from Booking</Badge>
              </div>

              <div>
                <div className="mb-3">
                  <Label htmlFor="residenceType">Residence Type</Label>
                  <div className="position-relative mt-2" ref={residenceTypeDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowResidenceTypeDropdown(!showResidenceTypeDropdown)}
                      className="d-flex align-items-center gap-2 border rounded w-100"
                      style={{
                        borderColor: 'var(--border)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        color: 'var(--foreground)',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--primary-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      {currentTraveler?.accommodationDetails.residenceType ? (
                        <span className="flex-grow-1 text-start">{currentTraveler.accommodationDetails.residenceType}</span>
                      ) : (
                        <span className="flex-grow-1 text-start text-muted">Select Residence Type</span>
                      )}
                      <ChevronDown 
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          transform: showResidenceTypeDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0
                        }} 
                      />
                    </button>
                    
                    {showResidenceTypeDropdown && (
                      <div
                        className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                        style={{
                          minWidth: '100%',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          zIndex: 1000,
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        {RESIDENCE_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleResidenceTypeSelect(type)}
                            className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                            style={{
                              cursor: 'pointer',
                              backgroundColor: type === currentTraveler?.accommodationDetails.residenceType ? 'var(--primary)' : 'transparent',
                              color: type === currentTraveler?.accommodationDetails.residenceType ? 'white' : 'var(--foreground)',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (type !== currentTraveler?.accommodationDetails.residenceType) {
                                e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (type !== currentTraveler?.accommodationDetails.residenceType) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              } else {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                              }
                            }}
                          >
                            <span>{type}</span>
                            {type === currentTraveler?.accommodationDetails.residenceType && (
                              <span className="ms-auto" style={{ color: 'white' }}>✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <Label htmlFor="address1">Address 1</Label>
                  <Input
                    id="address1"
                    value={currentTraveler?.accommodationDetails.address1 || ''}
                    onChange={(e) => handleInputChange('accommodationDetails', 'address1', e.target.value)}
                    className="mt-2"
                    placeholder="Street address"
                  />
                </div>

                <div className="mb-3">
                  <Label htmlFor="address2">Address 2</Label>
                  <Input
                    id="address2"
                    value={currentTraveler?.accommodationDetails.address2 || ''}
                    onChange={(e) => handleInputChange('accommodationDetails', 'address2', e.target.value)}
                    className="mt-2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>

                <Row className="g-3">
                  <Col sm={12}>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={currentTraveler?.accommodationDetails.postalCode || ''}
                      onChange={(e) => handleInputChange('accommodationDetails', 'postalCode', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-4 bg-primary bg-opacity-10 border border-primary rounded p-3">
                <p className="small text-white mb-0">
                  <Check style={{ width: '16px', height: '16px', color: 'white', marginRight: '8px', display: 'inline' }} />
                  Information auto-filled from your accommodation booking. Please verify all details are correct.
                </p>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 9: Contact Details */}
        {step === 9 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-md-flex align-items-center justify-content-between mb-4">
                <h3 className="h5 mb-0">Contact Information</h3>
                <Badge className='mt-2 mt-md-0'>Manual Input Required</Badge>
              </div>

              <p className="text-muted mb-4">
                Please provide your contact information. This will be used for important travel updates and notifications.
              </p>

              <div>
                <div className="mb-3">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentTraveler?.contactDetails.email || ''}
                    onChange={(e) => handleInputChange('contactDetails', 'email', e.target.value)}
                    className="mt-2"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-3">
                  <Label htmlFor="countryOfResidence">Country of Residence</Label>
                  <div className="position-relative mt-2" ref={countryOfResidenceDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowCountryOfResidenceDropdown(!showCountryOfResidenceDropdown)}
                      className="d-flex align-items-center gap-2 border rounded w-100"
                      style={{
                        borderColor: 'var(--border)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        color: 'var(--foreground)',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--primary-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      {currentTraveler?.contactDetails.countryOfResidence ? (
                        <>
                          <img 
                            src={getCountryFlagUrl(currentTraveler.contactDetails.countryOfResidence, 'w40')}
                            alt={`${currentTraveler.contactDetails.countryOfResidence} flag`}
                            style={{ 
                              width: '24px', 
                              height: '18px', 
                              objectFit: 'cover',
                              borderRadius: '2px',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              flexShrink: 0
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="flex-grow-1 text-start">{currentTraveler.contactDetails.countryOfResidence}</span>
                        </>
                      ) : (
                        <span className="flex-grow-1 text-start text-muted">Select Country</span>
                      )}
                      <ChevronDown 
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          transform: showCountryOfResidenceDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0
                        }} 
                      />
                    </button>
                    
                    {showCountryOfResidenceDropdown && (
                      <div
                        className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                        style={{
                          minWidth: '100%',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          zIndex: 1000,
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                      {COUNTRIES.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => handleCountryOfResidenceSelect(country)}
                            className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                            style={{
                              cursor: 'pointer',
                              backgroundColor: country === currentTraveler?.contactDetails.countryOfResidence ? 'var(--primary)' : 'transparent',
                              color: country === currentTraveler?.contactDetails.countryOfResidence ? 'white' : 'var(--foreground)',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (country !== currentTraveler?.contactDetails.countryOfResidence) {
                                e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (country !== currentTraveler?.contactDetails.countryOfResidence) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              } else {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                              }
                            }}
                          >
                            <img 
                              src={getCountryFlagUrl(country, 'w40')}
                              alt={`${country} flag`}
                              style={{ 
                                width: '24px', 
                                height: '18px', 
                                objectFit: 'cover',
                                borderRadius: '2px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                flexShrink: 0
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <span>{country}</span>
                            {country === currentTraveler?.contactDetails.countryOfResidence && (
                              <span className="ms-auto" style={{ color: 'white' }}>✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <Label htmlFor="streetAddress1">Street Address 1</Label>
                  <Input
                    id="streetAddress1"
                    value={currentTraveler?.contactDetails.streetAddress1 || ''}
                    onChange={(e) => handleInputChange('contactDetails', 'streetAddress1', e.target.value)}
                    className="mt-2"
                    placeholder="Street address"
                  />
                </div>

                <div className="mb-3">
                  <Label htmlFor="streetAddress2">Street Address 2</Label>
                  <Input
                    id="streetAddress2"
                    value={currentTraveler?.contactDetails.streetAddress2 || ''}
                    onChange={(e) => handleInputChange('contactDetails', 'streetAddress2', e.target.value)}
                    className="mt-2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={currentTraveler?.contactDetails.city || ''}
                      onChange={(e) => handleInputChange('contactDetails', 'city', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={currentTraveler?.contactDetails.state || ''}
                      onChange={(e) => handleInputChange('contactDetails', 'state', e.target.value)}
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={currentTraveler?.contactDetails.phone || ''}
                      onChange={(e) => handleInputChange('contactDetails', 'phone', e.target.value)}
                      className="mt-2"
                      placeholder="+1 234 567 8900"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="occupation">Occupation</Label>
                    <div className="position-relative mt-2" ref={occupationDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowOccupationDropdown(!showOccupationDropdown)}
                        className="d-flex align-items-center gap-2 border rounded w-100"
                        style={{
                          borderColor: 'var(--border)',
                          borderRadius: '6px',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          backgroundColor: '#fff',
                          color: 'var(--foreground)',
                          transition: 'all 0.2s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--primary-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff';
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      >
                        {currentTraveler?.contactDetails.occupation ? (
                          <span className="flex-grow-1 text-start">{currentTraveler.contactDetails.occupation}</span>
                        ) : (
                          <span className="flex-grow-1 text-start text-muted">Select Occupation</span>
                        )}
                        <ChevronDown 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            transform: showOccupationDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0
                          }} 
                        />
                      </button>
                      
                      {showOccupationDropdown && (
                        <div
                          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                          style={{
                            minWidth: '100%',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          {OCCUPATIONS.map((occupation) => (
                            <button
                              key={occupation}
                              type="button"
                              onClick={() => handleOccupationSelect(occupation)}
                              className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: occupation === currentTraveler?.contactDetails.occupation ? 'var(--primary)' : 'transparent',
                                color: occupation === currentTraveler?.contactDetails.occupation ? 'white' : 'var(--foreground)',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (occupation !== currentTraveler?.contactDetails.occupation) {
                                  e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (occupation !== currentTraveler?.contactDetails.occupation) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                } else {
                                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                                }
                              }}
                            >
                              <span>{occupation}</span>
                              {occupation === currentTraveler?.contactDetails.occupation && (
                                <span className="ms-auto" style={{ color: 'white' }}>✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              {currentTraveler?.isMinor && (
                <div className="mt-4 bg-warning bg-opacity-10 border border-warning rounded p-3">
                  <p className="small text-muted mb-0">
                    <strong>Minor Contact Information:</strong> For travelers under 18, please provide parent or guardian contact details.
                  </p>
                </div>
              )}

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleNext}>
                  {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Continue to Entry Requirements'}
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Traveler Navigation */}
        {travelers.length > 1 && (
          <div className="mt-4 d-flex align-items-center justify-content-center gap-2">
            {travelers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTravelerIndex(index)}
                className={`rounded-circle border-0 p-0`}
                style={{ 
                  width: '12px', 
                  height: '12px',
                  backgroundColor: index === currentTravelerIndex ? 'var(--primary)' : '#dee2e6',
                  transition: 'background-color 0.2s'
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
