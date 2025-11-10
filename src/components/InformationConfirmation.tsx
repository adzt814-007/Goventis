import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Check, UserPlus, ChevronDown } from 'lucide-react';
import type { Traveler } from '../App';
import { COUNTRIES } from '../App';

type InformationConfirmationProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
};

export function InformationConfirmation({ travelers, onUpdate, onNavigate }: InformationConfirmationProps) {
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [step, setStep] = useState(5); // Steps 5-8

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
        onNavigate('visa-application');
      }
    } else {
      setStep(step + 1);
    }
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
          <h1 className="text-white mb-0">Information Confirmation</h1>
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
                <Badge variant="outline">Auto-filled from Passport</Badge>
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
                    <Input
                      id="nationality"
                      value={currentTraveler?.personalDetails.nationality || ''}
                      onChange={(e) => handleInputChange('personalDetails', 'nationality', e.target.value)}
                      className="mt-2"
                    />
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
                  <div className="position-relative mt-2">
                    <select
                      id="residenceType"
                      value={currentTraveler?.accommodationDetails.residenceType || ''}
                      onChange={(e) => handleInputChange('accommodationDetails', 'residenceType', e.target.value)}
                      className="form-select"
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem',
                        width: '100%'
                      }}
                    >
                      <option value="">Select Residence Type</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Villa">Villa</option>
                      <option value="Resort">Resort</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Guesthouse">Guesthouse</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Other">Other</option>
                    </select>
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
                  <div className="position-relative mt-2">
                    <select
                      id="countryOfResidence"
                      value={currentTraveler?.contactDetails.countryOfResidence || ''}
                      onChange={(e) => handleInputChange('contactDetails', 'countryOfResidence', e.target.value)}
                      className="form-select"
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem',
                        width: '100%'
                      }}
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
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
                    <div className="position-relative mt-2">
                      <select
                        id="occupation"
                        value={currentTraveler?.contactDetails.occupation || ''}
                        onChange={(e) => handleInputChange('contactDetails', 'occupation', e.target.value)}
                        className="form-select"
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          fontSize: '0.875rem',
                          width: '100%'
                        }}
                      >
                        <option value="">Select Occupation</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Retired">Retired</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Other">Other</option>
                      </select>
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
