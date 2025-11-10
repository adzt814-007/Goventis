import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, FileText, CreditCard } from 'lucide-react';
import type { Traveler } from '../App';
import { getCountryFlagUrl } from '../App';

type VisaApplicationProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function VisaApplication({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: VisaApplicationProps) {
  const [step, setStep] = useState(1);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [visaType, setVisaType] = useState<string>(travelers[0]?.visaDetails?.visaType || 'tourist-30');
  const [mainPurpose, setMainPurpose] = useState<string>(travelers[0]?.visaDetails?.mainPurpose || '');
  const [subPurpose, setSubPurpose] = useState<string>(travelers[0]?.visaDetails?.subPurpose || '');
  const [signatureAgreed, setSignatureAgreed] = useState(false);

  const currentTraveler = travelers[currentTravelerIndex];

  // Purpose options
  const mainPurposeOptions = [
    { value: 'tourism', label: 'Tourism' },
    { value: 'business', label: 'Business' },
    { value: 'family', label: 'Family Visit' },
    { value: 'education', label: 'Education' },
    { value: 'medical', label: 'Medical Treatment' },
    { value: 'transit', label: 'Transit' },
    { value: 'other', label: 'Other' },
  ];

  const subPurposeOptions: { [key: string]: { value: string; label: string }[] } = {
    tourism: [
      { value: 'leisure', label: 'Leisure/Vacation' },
      { value: 'sightseeing', label: 'Sightseeing' },
      { value: 'adventure', label: 'Adventure Sports' },
      { value: 'cultural', label: 'Cultural Experience' },
      { value: 'beach', label: 'Beach Holiday' },
    ],
    business: [
      { value: 'meeting', label: 'Business Meeting' },
      { value: 'conference', label: 'Conference/Seminar' },
      { value: 'negotiation', label: 'Business Negotiation' },
      { value: 'exhibition', label: 'Trade Exhibition' },
      { value: 'training', label: 'Training/Workshop' },
    ],
    family: [
      { value: 'visit', label: 'Visit Family' },
      { value: 'wedding', label: 'Wedding/Ceremony' },
      { value: 'birth', label: 'Birth of Child' },
      { value: 'emergency', label: 'Family Emergency' },
    ],
    education: [
      { value: 'study', label: 'Study Program' },
      { value: 'research', label: 'Research' },
      { value: 'exchange', label: 'Student Exchange' },
      { value: 'training', label: 'Training Course' },
    ],
    medical: [
      { value: 'treatment', label: 'Medical Treatment' },
      { value: 'surgery', label: 'Surgery' },
      { value: 'checkup', label: 'Medical Checkup' },
      { value: 'rehabilitation', label: 'Rehabilitation' },
    ],
    transit: [
      { value: 'connecting', label: 'Connecting Flight' },
      { value: 'layover', label: 'Layover' },
    ],
    other: [
      { value: 'other', label: 'Other Purpose' },
    ],
  };

  const visaOptions = [
    {
      id: 'tourist-30',
      name: 'Tourist Visa - 30 Days',
      description: 'Standard tourist visa for stays up to 30 days',
      fee: 35,
    },
    {
      id: 'tourist-60',
      name: 'Tourist Visa - 60 Days',
      description: 'Extended tourist visa for stays up to 60 days (extendable)',
      fee: 50,
    },
    {
      id: 'visa-free',
      name: 'Visa-Free Entry',
      description: 'For eligible nationalities, stay up to 30 days (non-extendable)',
      fee: 0,
    },
  ];

  const selectedVisa = visaOptions.find(v => v.id === visaType);

  const handleComplete = () => {
    const updatedTravelers = [...travelers];
    updatedTravelers[currentTravelerIndex].entryRequirements.visa = true;
    updatedTravelers[currentTravelerIndex].visaDetails = {
      visaType,
      mainPurpose,
      subPurpose,
    };
    onUpdate(updatedTravelers);

    if (currentTravelerIndex < travelers.length - 1) {
      setCurrentTravelerIndex(currentTravelerIndex + 1);
      setStep(1);
      setVisaType(updatedTravelers[currentTravelerIndex + 1]?.visaDetails?.visaType || 'tourist-30');
      setMainPurpose(updatedTravelers[currentTravelerIndex + 1]?.visaDetails?.mainPurpose || '');
      setSubPurpose(updatedTravelers[currentTravelerIndex + 1]?.visaDetails?.subPurpose || '');
      setSignatureAgreed(false);
    } else {
      onNavigate('customs-declaration');
    }
  };

  const handleMainPurposeChange = (value: string) => {
    setMainPurpose(value);
    setSubPurpose(''); // Reset sub purpose when main purpose changes
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => step === 1 ? onNavigate('information-confirmation') : setStep(step - 1)}
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
            Entry Visa Application
          </h1>
          <p className="text-white mt-2 mb-0">Step {step} of 2</p>
        </Container>
      </div>

      <Container>
        <div className="mb-4">
          <h2>Traveler {currentTravelerIndex + 1} of {travelers.length}</h2>
          <p className="text-muted">
            {currentTraveler?.personalDetails.firstName} {currentTraveler?.personalDetails.lastName}
          </p>
        </div>

        {/* Step 1: Visa Type Selection */}
        {step === 1 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h3 className="mb-4">Select Visa Type</h3>
              <p className="text-muted mb-4">
                Choose the visa type that best matches your travel plans to {selectedCountry}.
              </p>

              <RadioGroup value={visaType} onValueChange={setVisaType} className="mb-4">
                {visaOptions.map((option) => (
                  <Card key={option.id} className={`mb-3 ${visaType === option.id ? 'border-success border-2' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="d-flex align-items-start gap-3">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-grow-1">
                          <Label htmlFor={option.id} style={{ cursor: 'pointer' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-medium">{option.name}</span>
                              {option.fee > 0 ? (
                                <Badge variant="outline">${option.fee} USD</Badge>
                              ) : (
                                <Badge bg="success">Free</Badge>
                              )}
                            </div>
                            <p className="small text-muted mb-0">{option.description}</p>
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>

              {/* Main Purpose of Visiting */}
              <div className="mt-4 mb-4">
                <Label className="mb-3 d-block">Main Purpose of Visiting</Label>
                <select
                  value={mainPurpose}
                  onChange={(e) => handleMainPurposeChange(e.target.value)}
                  className="form-select"
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Main Purpose</option>
                  {mainPurposeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Purpose of Visiting */}
              {mainPurpose && (
                <div className="mb-4">
                  <Label className="mb-3 d-block">Sub Purpose of Visiting</Label>
                  <select
                    value={subPurpose}
                    onChange={(e) => setSubPurpose(e.target.value)}
                    className="form-select"
                    style={{
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #dee2e6',
                      fontSize: '1rem',
                    }}
                  >
                    <option value="">Select Sub Purpose</option>
                    {subPurposeOptions[mainPurpose]?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-4 bg-info bg-opacity-10 border border-info rounded p-4">
                <h4 className="mb-3">Visa Fee Summary</h4>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted">Selected Visa Type:</span>
                  <span>{selectedVisa?.name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted">Fee:</span>
                  <span className="text-success">${selectedVisa?.fee} USD</span>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!mainPurpose || !subPurpose}
                >
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Signature & Confirmation */}
        {step === 2 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h3 className="mb-4">Signature & Declaration</h3>

              <div className="bg-light border rounded p-4 mb-4">
                <h4 className="mb-3">Visa Application Summary</h4>
                <div className="small">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Applicant:</span>
                    <span>{currentTraveler?.personalDetails.firstName} {currentTraveler?.personalDetails.lastName}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Passport:</span>
                    <span>{currentTraveler?.personalDetails.passportNumber}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Nationality:</span>
                    <span>{currentTraveler?.personalDetails.nationality}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Visa Type:</span>
                    <span>{selectedVisa?.name}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Arrival Date:</span>
                    <span>{currentTraveler?.personalDetails.dateOfArrival}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted">Departure Date:</span>
                    <span>{currentTraveler?.departureDetails.dateOfDeparture}</span>
                  </div>
                </div>
              </div>

              <div className="border border-2 border-dashed border-secondary rounded p-5 mb-4 bg-white">
                <div className="text-center">
                  <FileText style={{ width: '48px', height: '48px', color: '#6c757d', margin: '0 auto 16px' }} />
                  <p className="mb-2">Digital Signature Area</p>
                  <p className="small text-muted mb-3">Click below to sign digitally</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => setSignatureAgreed(true)}
                  >
                    {signatureAgreed ? 'Signature Captured ✓' : 'Sign Application'}
                  </Button>
                </div>
              </div>

              <div className="bg-warning bg-opacity-10 border border-warning rounded p-3 mb-4">
                <h4 className="mb-2">Declaration</h4>
                <p className="small text-muted mb-0">
                  I declare that all information provided in this visa application is true and correct. 
                  I understand that providing false information may result in visa denial or legal consequences.
                  I agree to comply with all laws and regulations of the Republic of Indonesia during my stay.
                </p>
              </div>

              <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
                <p className="small text-muted mb-0">
                  {signatureAgreed ? 'Signature captured' : 'Signature required to continue'}
                </p>
                <Button onClick={handleComplete} disabled={!signatureAgreed} className='mt-2 mt-md-0'
                >
                  {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Complete Visa Application'}
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}
