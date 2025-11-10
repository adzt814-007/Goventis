import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { NavBar } from './NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Download, Share2, Home, CheckCircle2, QrCode as QrCodeIcon } from 'lucide-react';
import type { Traveler } from '../App';
import { getCountryFlagUrl } from '../App';

type QRCodeProps = {
  travelers: Traveler[];
  onNavigate: (page: string) => void;
  user?: { email: string; name: string } | null;
  onLogout?: () => void;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function QRCode({ travelers, onNavigate, user, onLogout, currentPage, selectedCountry = 'Bali', onCountryChange }: QRCodeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTraveler = travelers[currentIndex];

  const generateQRCodeUrl = (travelerId: string) => {
    // Simulate QR code generation - in real app would use QR library
    const countryCode = selectedCountry.toUpperCase().replace(/\s+/g, '-');
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${countryCode}-ENTRY-${travelerId}`;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : travelers.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < travelers.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-vh-100 pb-5">
      <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      {/* Header */}
      <div className="bg-primary text-white py-4 mb-4" style={{ background: 'linear-gradient(to right, var(--primary), var(--ocean-blue))' }}>
        <Container>
          <div className="d-flex align-items-center gap-2 mb-3">
            <CheckCircle2 style={{ width: '32px', height: '32px', color: 'white' }} />
            <div className='p-2 px-3 ' style={{border:"1px solid white",borderRadius:"16px"}}>All Complete</div>
          </div>
          <h1 className="text-white mb-2 d-flex align-items-center gap-2">
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
            Entry Certificate Ready!
          </h1>
          <p className="text-white mb-0">
            Your pre-arrival documentation is complete. Show these QR codes at {selectedCountry} immigration.
          </p>
        </Container>
      </div>

      <Container>
        {/* Success Message */}
        <Card className="border-success border-2 bg-success bg-opacity-10 mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-start gap-3">
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <CheckCircle2 style={{ width: '24px', height: '24px' }} />
              </div>
              <div className="flex-grow-1">
                <h3 className="mb-2">Pre-Arrival Process Complete</h3>
                <p className="text-muted mb-3">
                  Congratulations! All {travelers.length} {travelers.length === 1 ? 'traveler has' : 'travelers have'} completed
                  the pre-arrival documentation process. Your entry certificates with QR codes are ready for use.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Badge bg="success">✓ Documents Uploaded</Badge>
                  <Badge bg="success">✓ Visa Approved</Badge>
                  <Badge bg="success">✓ Customs Declared</Badge>
                  <Badge bg="success">✓ Health Pass Issued</Badge>
                  <Badge bg="success">✓ Insurance Active</Badge>
                  <Badge bg="success">✓ Tax Paid</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="text-center mb-4">
              <div className="d-inline-block px-3 py-2 bg-primary bg-opacity-10 text-primary rounded-pill mb-3">
                <span className='text-white'>Traveler {currentIndex + 1} of {travelers.length}</span>
              </div>
              <h2 className="mb-2">
                {currentTraveler?.personalDetails.firstName} {currentTraveler?.personalDetails.lastName}
              </h2>
              <p className="text-muted">
                {currentTraveler?.personalDetails.nationality} • Passport: {currentTraveler?.personalDetails.passportNumber}
              </p>
            </div>

            {/* QR Code */}
            <div className="d-flex justify-content-center mb-4">
              <div className="bg-white p-4 rounded border border-4 border-secondary shadow-lg">
                <img
                  src={generateQRCodeUrl(currentTraveler?.id || '')}
                  alt="Entry QR Code"
                  style={{ width: '256px', height: '256px' }}
                />
                <div className="text-center mt-3">
                  <Badge bg="primary">
                    <QrCodeIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    Entry Certificate
                  </Badge>
                </div>
              </div>
            </div>

            {/* Traveler Details */}
            <div className="bg-light rounded p-4 mb-4">
              <Row className="g-3 small">
                <Col sm={6}>
                  <p className="text-muted mb-1">Arrival Date</p>
                  <p className="mb-0">{currentTraveler?.personalDetails.dateOfArrival}</p>
                </Col>
                <Col sm={6}>
                  <p className="text-muted mb-1">Departure Date</p>
                  <p className="mb-0">{currentTraveler?.departureDetails.dateOfDeparture}</p>
                </Col>
                <Col sm={6}>
                  <p className="text-muted mb-1">Flight Number</p>
                  <p className="mb-0">{currentTraveler?.personalDetails.flightVesselNumber}</p>
                </Col>
                <Col sm={6}>
                  <p className="text-muted mb-1">Accommodation</p>
                  <p className="mb-0">{currentTraveler?.accommodationDetails.residenceType}</p>
                </Col>
              </Row>
            </div>

            {/* Navigation Arrows */}
            {travelers.length > 1 && (
              <div className="d-flex align-items-center justify-content-between mb-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="d-flex align-items-center gap-2"
                >
                  <ChevronLeft style={{ width: '16px', height: '16px' }} />
                  Previous
                </Button>

                <div className="d-flex gap-2">
                  {travelers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`rounded-circle border-0 p-0`}
                      style={{
                        width: index === currentIndex ? '32px' : '8px',
                        height: '8px',
                        backgroundColor: index === currentIndex ? 'var(--primary)' : '#dee2e6',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="d-flex align-items-center gap-2"
                >
                  Next
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <Row className="g-3">
              <Col sm={6}>
                <Button variant="outline" className="w-100">
                  <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  Download Certificate
                </Button>
              </Col>
              <Col sm={6}>
                <Button variant="outline" className="w-100">
                  <Share2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  Share via Email
                </Button>
              </Col>
            </Row>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-info bg-opacity-10 border-info mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-3">How to Use Your QR Code at Immigration</h3>
            <div className="small text-muted">
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                  1
                </div>
                <p className="mb-0">
                  <strong>Save to your device:</strong> Take a screenshot or download the QR code to have it
                  readily available offline.
                </p>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                  2
                </div>
                <p className="mb-0">
                  <strong>At the airport:</strong> Present your QR code at the immigration counter along with
                  your passport.
                </p>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                  3
                </div>
                <p className="mb-0">
                  <strong>Quick scan:</strong> The officer will scan your code to verify all entry requirements
                  have been completed.
                </p>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                  4
                </div>
                <p className="mb-0">
                  <strong>Welcome to {selectedCountry}!</strong> Once verified, you'll receive your entry stamp and can proceed
                  to baggage claim.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Reminders */}
        <Card className="bg-warning bg-opacity-10 border-warning mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-3">Important Reminders</h3>
            <ul className="small text-muted mb-0" style={{ paddingLeft: '20px' }}>
              <li>Each traveler must present their individual QR code</li>
              <li>QR codes are valid from your arrival date through departure date</li>
              <li>Keep your passport handy - you'll need both the QR code and passport</li>
              <li>Email confirmation has been sent to your registered email address</li>
              <li>Have a printed copy as backup in case of technical issues</li>
            </ul>
          </CardContent>
        </Card>

        {/* Border Control Preview */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-3">Preview: Border Control View</h3>
            <p className="text-muted mb-3 small">
              When scanned, immigration officers will see your verified entry documentation:
            </p>
            <Button
              variant="outline"
              onClick={() => onNavigate('border-control')}
              className="w-100"
            >
              View Border Control Screen
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3">
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="outline"
            className="flex-grow-1"
          >
            <Home style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Return to Dashboard
          </Button>
          <Button
            onClick={() => window.print()}
            className="flex-grow-1"
            style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}
          >
            <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Print All Certificates
          </Button>
        </div>
      </Container>
    </div>
  );
}
