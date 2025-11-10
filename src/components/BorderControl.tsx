import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Container, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, CheckCircle2, Shield, FileCheck, Heart, Plane, ArrowLeft, X } from 'lucide-react';
import type { Traveler } from '../App';

type BorderControlProps = {
  travelers: Traveler[];
  onNavigate: (page: string) => void;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function BorderControl({ travelers, onNavigate, selectedCountry = 'Bali', onCountryChange }: BorderControlProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTraveler = travelers[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < travelers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f8fafc' }}>
      {/* Border Control Header */}
      <div className="bg-primary text-white py-4 mb-4" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)' }}>
        <Container>
        <Button
            variant="outline"
            onClick={() => onNavigate('qr-code')}
            className="d-flex align-items-center gap-2 fw-semibold text-white mb-4"
            style={{ 
              borderRadius: '8px',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              color: '#fff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Traveler View
          </Button>
          <div className="d-md-flex align-items-center justify-content-between mb-1">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', backdropFilter: 'blur(10px)' }}>
                <Shield style={{ width: '28px', height: '28px', color: 'var(--primary)' }} />
              </div>
              <div>
                <h1 className="text-white mb-0 fw-bold" style={{ fontSize: 'clamp(1.5rem, 2vw, 1.75rem)' }}>Border Control System</h1>
                <p className="text-white small mb-0">Immigration Officer View</p>
              </div>
            </div>
            <div className="text-end mt-md-0 mt-3">
              <p className="small text-white mb-0">International Airport</p>
              <p className="small text-white mb-0">{selectedCountry}</p>
            </div>
          </div>
          
        </Container>
      </div>

      <Container>
        {/* Scan Status */}
        <Card className="border-success border-2 bg-success bg-opacity-10 mb-4" style={{ borderRadius: '16px' }}>
          <CardContent className="pt-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white" style={{ padding: '10px' }}>
                <CheckCircle2 style={{ width: '32px', height: '32px' }} />
              </div>
              <div>
                <h2 className="mb-1 fw-bold" style={{ color: 'var(--foreground)',fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>Entry Certificate Verified</h2>
                <p className="text-success small mb-0 fw-semibold">All pre-arrival requirements completed • QR Code Valid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traveler Navigation */}
        {travelers.length > 1 && (
          <div className="d-flex align-items-center justify-content-between mb-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="d-flex align-items-center gap-2"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                borderRadius: '8px'
              }}
            >
              <ChevronLeft style={{ width: '16px', height: '16px' }} />
              Previous Traveler
            </Button>
            
            <div className="text-center">
              <p className="text-muted small mb-1">Group Travel</p>
              <p className="mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>
                Traveler {currentIndex + 1} of {travelers.length}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === travelers.length - 1}
              className="d-flex align-items-center gap-2"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                borderRadius: '8px'
              }}
            >
              Next Traveler
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </Button>
          </div>
        )}

        {/* Main Document View */}
        <Row className="g-4 mb-4">
          {/* Personal Information */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <CardContent className="pt-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
                    <FileCheck style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h3 className="mb-0 fw-bold" style={{ color: 'var(--foreground)' }}>Personal Information</h3>
                </div>

                <div>
                  <Row className="g-3 mb-3">
                    <Col sm={6}>
                      <p className="text-muted small mb-1">First Name</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.firstName}</p>
                    </Col>
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Last Name</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.lastName}</p>
                    </Col>
                  </Row>

                  <Row className="g-3 mb-3">
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Date of Birth</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.dateOfBirth}</p>
                    </Col>
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Gender</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.gender}</p>
                    </Col>
                  </Row>

                  <Row className="g-3 mb-3">
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Passport Number</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.passportNumber}</p>
                    </Col>
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Nationality</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.nationality}</p>
                    </Col>
                  </Row>

                  {currentTraveler?.isMinor && (
                    <div className="bg-warning bg-opacity-10 border border-warning rounded p-3" style={{ borderRadius: '12px' }}>
                      <Badge bg="warning">Minor Traveler</Badge>
                      <p className="text-warning small mt-2 mb-0">Under 18 years old</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Col>

          {/* Travel Information */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <CardContent className="pt-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
                    <Plane style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h3 className="mb-0 fw-bold" style={{ color: 'var(--foreground)' }}>Travel Information</h3>
                </div>

                <div>
                  <Row className="g-3 mb-3">
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Arrival Date</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.dateOfArrival}</p>
                    </Col>
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Departure Date</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.departureDetails.dateOfDeparture}</p>
                    </Col>
                  </Row>

                  <Row className="g-3 mb-3">
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Transport Mode</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.modeOfTransport}</p>
                    </Col>
                    <Col sm={6}>
                      <p className="text-muted small mb-1">Flight Number</p>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.personalDetails.flightVesselNumber}</p>
                    </Col>
                  </Row>

                  <div className="border-top pt-3" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-muted small mb-2">Accommodation Address</p>
                    <p className="mb-2 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.accommodationDetails.address1} {currentTraveler?.accommodationDetails.address2}</p>
                    <div className="d-flex gap-2">
                      <Badge variant="outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        {currentTraveler?.accommodationDetails.residenceType}
                      </Badge>
                      <Badge variant="outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        {currentTraveler?.accommodationDetails.postalCode}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Col>
        </Row>

        {/* Entry Requirements Status */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
          <CardContent className="pt-4">
            <h3 className="mb-4 fw-bold" style={{ color: 'var(--foreground)' }}>Entry Requirements Status</h3>
            
            <Row className="g-3">
              {/* Visa */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.entryRequirements.visa 
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Entry Visa</h4>
                    {currentTraveler?.entryRequirements.visa ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">
                    {currentTraveler?.entryRequirements.visa ? 'Approved' : 'Pending'}
                  </p>
                  <p className="small text-muted mb-0">Tourist Visa - 30 Days</p>
                </div>
              </Col>

              {/* Customs */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.entryRequirements.customs 
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Customs Declaration</h4>
                    {currentTraveler?.entryRequirements.customs ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">
                    {currentTraveler?.entryRequirements.customs ? 'Declared' : 'Pending'}
                  </p>
                  <p className="small text-muted mb-0">All items declared</p>
                </div>
              </Col>

              {/* Health Pass */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.entryRequirements.health 
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Health Pass</h4>
                    {currentTraveler?.entryRequirements.health ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">
                    {currentTraveler?.entryRequirements.health ? 'Cleared' : 'Pending'}
                  </p>
                  <p className="small text-muted mb-0">SATUSEHAT (SSHP)</p>
                </div>
              </Col>

              {/* Insurance */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.entryRequirements.insurance 
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Insurance</h4>
                    {currentTraveler?.entryRequirements.insurance ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">
                    {currentTraveler?.entryRequirements.insurance ? 'Active' : 'Pending'}
                  </p>
                  <p className="small text-muted mb-0">{selectedCountry} Standard Insurance</p>
                </div>
              </Col>

              {/* Arrival Tax */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.entryRequirements.tax 
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Arrival Tax</h4>
                    {currentTraveler?.entryRequirements.tax ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">
                    {currentTraveler?.entryRequirements.tax ? 'Paid' : 'Pending'}
                  </p>
                  <p className="small text-muted mb-0">$10 USD</p>
                </div>
              </Col>

              {/* Documents */}
              <Col sm={6} lg={4}>
                <div className={`p-3 rounded border-2 ${
                  currentTraveler?.documents.passport && currentTraveler?.documents.flight && currentTraveler?.documents.accommodation
                    ? 'bg-success bg-opacity-10 border-success' 
                    : 'bg-danger bg-opacity-10 border-danger'
                }`} style={{ borderRadius: '12px' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="small mb-0 fw-semibold" style={{ color: 'var(--foreground)' }}>Documents</h4>
                    {currentTraveler?.documents.passport && currentTraveler?.documents.flight && currentTraveler?.documents.accommodation ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--tropical-green)' }} />
                    ) : (
                      <span className="text-danger">✕</span>
                    )}
                  </div>
                  <p className="small text-muted mb-1">All Verified</p>
                  <p className="small text-muted mb-0">3/3 documents uploaded</p>
                </div>
              </Col>
            </Row>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
          <CardContent className="pt-4">
            <h3 className="mb-3 fw-bold" style={{ color: 'var(--foreground)' }}>Contact Information</h3>
            <Row className="g-4">
              <Col sm={6}>
                <p className="text-muted small mb-1">Email Address</p>
                <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.contactDetails.email || 'Not provided'}</p>
              </Col>
              <Col sm={6}>
                <p className="text-muted small mb-1">Phone Number</p>
                <p className="mb-0 fw-medium" style={{ color: 'var(--foreground)' }}>{currentTraveler?.contactDetails.phone || 'Not provided'}</p>
              </Col>
            </Row>
          </CardContent>
        </Card>

        {/* Officer Actions */}
        <Card className="border-0 shadow mb-4" style={{ borderRadius: '16px' }}>
          <CardContent className="pt-4">
            <h3 className="mb-3 fw-bold" style={{ color: 'var(--foreground)' }}>Officer Actions</h3>
            <div className="d-flex flex-wrap gap-3">
              <Button 
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  borderColor: 'var(--primary)',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary-hover)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 148, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                }}
              >
                ✓ Approve Entry
              </Button>
              <Button 
                variant="outline" 
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.15)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.15)';
                }}
              >
                Flag for Secondary Inspection
              </Button>
              <Button 
                variant="outline" 
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.15)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.15)';
                }}
              >
                Print Entry Stamp
              </Button>
              <Button 
                variant="outline" 
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.15)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.15)';
                }}
              >
                View Full Application
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-4 text-center text-muted small">
          <p className="mb-1">Border Control System v2.0 • {selectedCountry} Immigration Authority</p>
          <p className="mb-0">This is a preview of how immigration officers view your entry certificate</p>
        </div>
      </Container>
    </div>
  );
}
