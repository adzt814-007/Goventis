import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Plane, MapPin, Shield, FileCheck, Phone, Star, Car } from 'lucide-react';
import { NavBar } from './NavBar';
import type { User } from '../App';
import { TAXI_SERVICES } from '../App';

type WelcomePageProps = {
  onNavigate: (page: string) => void;
  user: User | null;
  onLogout: () => void;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function WelcomePage({ onNavigate, user, onLogout, currentPage, selectedCountry = 'Bali', onCountryChange }: WelcomePageProps) {
  return (
    <div className="min-vh-100">
      {/* Header */}
      <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} showLogin={true} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />

      {/* Hero Section */}
      <div className="position-relative overflow-hidden w-100" style={{ height: '92vh' }}>
        <video
          src={new URL('../Images/beachlooping.mp4', import.meta.url).href}
          className="w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'linear-gradient(to bottom, rgba(13, 148, 136, 0.5), rgba(13, 148, 136, 0.4), rgba(13, 148, 136, 0.8))',
          height: '92vh'
        }} />

        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center px-4 text-center text-white" style={{ height: '92vh' }}>
          <div className="mb-4">
            <div className="d-inline-block px-4 py-2 rounded-pill mb-3" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)'
            }}>
              <span className="small" style={{ letterSpacing: '0.05em' }}>OFFICIAL {selectedCountry.toUpperCase()} TOURISM PORTAL</span>
            </div>
          </div>

          <h1 className="mb-4" style={{ fontSize: "clamp(20px, 5vw, 55px)", maxWidth: '56rem', fontWeight: 'bold' }}>
            WELCOME TO {selectedCountry.toUpperCase()}
          </h1>

          <p className="mb-5" style={{ maxWidth: '42rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Complete your pre-arrival documentation quickly and securely. Start your journey to paradise with a smooth entry process.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
            <Button
              onClick={() => onNavigate('login')}
              size="lg"
              className="px-5 py-3 fw-bold text-uppercase"
              style={{ 
                backgroundColor: '#fff',
                color: 'var(--primary)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                minWidth: '280px',
                fontSize: '1rem',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              <Plane style={{ width: '20px', height: '20px', marginRight: '10px', display: 'inline-block' }} />
              Get Started
            </Button>
            {/* <Button
              onClick={() => onNavigate('login')}
              size="lg"
              variant="outline-light"
              className="px-5 py-3 fw-semibold"
              style={{ 
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                transition: 'all 0.3s ease',
                minWidth: '280px',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Sign In
            </Button> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="mb-3">Complete Pre-Arrival Process</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '42rem' }}>
            Streamlined documentation for a hassle-free arrival in {selectedCountry}. Complete all requirements in 10-15 minutes per traveler.
          </p>
        </div>

        <Row className="g-4">
          <Col md={6} lg={3} className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-primary bg-opacity-10 text-primary" style={{ width: '64px', height: '64px' }}>
              <FileCheck style={{ width: '32px', height: '32px', color: "white" }} />
            </div>
            <h3 className="h5 mb-2">Document Upload</h3>
            <p className="text-muted">Upload passport, flight, and accommodation confirmations securely</p>
          </Col>

          <Col md={6} lg={3} className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-success bg-opacity-10 text-success" style={{ width: '64px', height: '64px' }}>
              <Shield style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className="h5 mb-2">Entry Requirements</h3>
            <p className="text-muted">Complete visa, customs, health pass, and insurance in one place</p>
          </Col>

          <Col md={6} lg={3} className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-warning bg-opacity-10 text-warning" style={{ width: '64px', height: '64px' }}>
              <Plane style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className="h5 mb-2">Multi-Traveler Support</h3>
            <p className="text-muted">Add up to 5 travelers with simplified forms for minors</p>
          </Col>

          <Col md={6} lg={3} className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-info bg-opacity-10 text-info" style={{ width: '64px', height: '64px' }}>
              <MapPin style={{ width: '32px', height: '32px' }} />
            </div>
            <h3 className="h5 mb-2">QR Code Entry</h3>
            <p className="text-muted">Get your entry certificate with QR code for quick border control</p>
          </Col>
        </Row>
      </Container>

      {/* Information Section */}
      <div className="bg-white py-5">
        <Container>
          <Row className="g-3 align-items-center">
            <Col md={6}>
              <h2 className="mb-4">Your Journey Starts Here</h2>
              <p className="text-muted mb-4">
                The official {selectedCountry} tourism portal makes your pre-arrival process simple and efficient. Complete all necessary documentation before you travel.
              </p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start gap-3 mb-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }}>✓</div>
                  <span className="text-muted">Secure document storage and processing</span>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }}>✓</div>
                  <span className="text-muted">Auto-fill functionality from uploaded documents</span>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }}>✓</div>
                  <span className="text-muted">Real-time progress tracking</span>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }}>✓</div>
                  <span className="text-muted">Mobile-optimized for convenience</span>
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <div className="position-relative  overflow-hidden shadow-lg" style={{ height: '400px', borderRadius: '25px' }}>
                <ImageWithFallback
                  src={new URL('../Images/23368.jpg', import.meta.url).href}
                  alt="Tropical Beach, Bali"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Local Taxi Services Section */}
      <div className="bg-light py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="mb-3 fw-bold">Local Taxi Services</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '42rem' }}>
              Reliable and convenient taxi services for your transportation needs in <span style={{ color: 'var(--primary)' , fontWeight: '600'}}>{selectedCountry}</span>
            </p>
          </div>

          <Row className="g-4">
            {(TAXI_SERVICES[selectedCountry] || TAXI_SERVICES['Bali']).map((taxi, index) => (
              <Col md={4} key={index}>
                <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                    <ImageWithFallback
                      src={new URL('../Images/42635.jpg', import.meta.url).href}
                      alt="Taxi Service"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                      background: 'linear-gradient(to bottom, rgba(13, 148, 136, 0.3), rgba(13, 148, 136, 0.6))'
                    }} />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', backdropFilter: 'blur(10px)' }}>
                        <Car style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
                      </div>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3 className="h5 mb-0 fw-bold">{taxi.name}</h3>
                      <div className="d-flex align-items-center gap-1">
                        <Star style={{ width: '16px', height: '16px', color: '#ffc107', fill: '#ffc107' }} />
                        <span className="small fw-semibold">{taxi.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted small mb-3" style={{ minHeight: '60px' }}>
                      {taxi.description}
                    </p>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Phone style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
                      <span className="small fw-semibold" style={{ color: 'var(--primary)' }}>{taxi.phone}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-100"
                      style={{
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                    >
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <div className="bg-primary text-white py-4">
        <Container>
          <p className="text-center mb-0" style={{ color: 'white' }}>© 2025 Official {selectedCountry} Tourism Portal. All rights reserved.</p>
        </Container>
      </div>
    </div>
  );
}
