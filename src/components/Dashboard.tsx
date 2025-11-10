import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FileCheck,
  Shield,
  Heart,
  CreditCard,
  QrCode,
  CheckCircle2,
  Circle,
  User as UserIcon,
  Plane
} from 'lucide-react';
import { NavBar } from './NavBar';
import type { User, Traveler } from '../App';
import { Footer } from './Footer';
import { getSupportInfo } from '../App';

type DashboardProps = {
  user: User | null;
  travelers: Traveler[];
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function Dashboard({ user, travelers, onNavigate, onLogout, currentPage, selectedCountry = 'Bali', onCountryChange }: DashboardProps) {
  const supportInfo = getSupportInfo(selectedCountry);
  
  const calculateProgress = () => {
    if (travelers.length === 0) return 0;

    const totalSteps = 8; // Documents (3) + Entry Requirements (5)
    let totalCompletedSteps = 0;

    travelers.forEach(traveler => {
      let travelerCompletedSteps = 0;

      // Count document steps (3 total)
      if (traveler.documents.passport) travelerCompletedSteps += 1;
      if (traveler.documents.flight) travelerCompletedSteps += 1;
      if (traveler.documents.accommodation) travelerCompletedSteps += 1;

      // Count entry requirement steps (5 total)
      if (traveler.entryRequirements.visa) travelerCompletedSteps += 1;
      if (traveler.entryRequirements.customs) travelerCompletedSteps += 1;
      if (traveler.entryRequirements.health) travelerCompletedSteps += 1;
      if (traveler.entryRequirements.insurance) travelerCompletedSteps += 1;
      if (traveler.entryRequirements.tax) travelerCompletedSteps += 1;

      totalCompletedSteps += travelerCompletedSteps;
    });

    const totalPossibleSteps = totalSteps * travelers.length;
    return Math.round((totalCompletedSteps / totalPossibleSteps) * 100);
  };

  const progress = calculateProgress();
  const hasCompletedDocuments = travelers.length > 0 && travelers.every(t =>
    t.documents.passport && t.documents.flight && t.documents.accommodation
  );
  const hasCompletedEntryReqs = travelers.length > 0 && travelers.every(t =>
    t.entryRequirements.visa && t.entryRequirements.customs &&
    t.entryRequirements.health && t.entryRequirements.insurance && t.entryRequirements.tax
  );

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
      {/* Navigation Bar */}
      <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />

      {/* Hero Header Section */}
      <div className="bg-primary text-white py-5 mb-4" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)' }}>
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h1 className="mb-2 text-white d-flex align-items-center gap-2" style={{ fontSize: 'clamp(26px, 5vw, 2rem)', fontWeight: 'bold' }}>
                Welcome back, {user?.name || 'Traveler'}! <img src={new URL('../Images/airplane.png', import.meta.url).href} alt="Airplane" style={{ objectFit: 'contain' }} />
              </h1>
              <p className="text-white mb-0" style={{ fontSize: '1.1rem' }}>
                {user?.email}
              </p>
            </div>
            <div className="text-end">
              <div className="bg-white bg-opacity-20 rounded-pill px-4 py-2 backdrop-filter" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="medium fw-semibold" style={{ color: '#0d9488' }}>Trip Progress {progress}%</div>
                {/* <div className="h3 mb-0 fw-bold" style={{ color: '#0d9488' }}>{progress}%</div> */}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-4">

        {/* Progress Overview Card */}
        <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div className="bg-gradient-travel text-white p-4">
            <div className="d-md-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 className="h4 text-white mb-2 fw-bold">Pre-Arrival Checklist</h3>
                <p className="text-white mb-0">Complete all requirements before your trip to {selectedCountry}</p>
              </div>
              <div className="d-flex justify-content-center mt-md-0 mt-2">
              <div className="bg-white bg-opacity-20  " style={{borderRadius: '10px', padding: '2px',width: '120px'}}>
                <div className="text-center">
                  <div className="h4 mb-0 fw-bold" style={{ color: '#0d9488' }}>{progress}%</div>
                  <div className="small" style={{ color: '#0d9488' }}>Done</div>
                </div>
              </div>
              </div>
            </div>
            <div className="rounded" style={{ height: '10px', backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)' }}>
              <div
                className="rounded"
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#ffffff',
                  transition: 'width 0.5s ease',
                  boxShadow: '0 2px 8px rgba(255, 255, 255, 0.5)'
                }}
              />
            </div>
          </div>
          <CardContent className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
                  <UserIcon style={{ width: '24px', height: '24px', color: '#fff' }} />
                </div>
                <div>
                  <div className="fw-semibold">{travelers.length} {travelers.length === 1 ? 'Traveler' : 'Travelers'}</div>
                  <div className="small text-muted">Added to your trip</div>
                </div>
              </div>
              {progress === 100 ? (
                <Badge bg="success" className="px-3 py-2" style={{ fontSize: '0.9rem' }}>
                  <CheckCircle2 style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                  All Complete
                </Badge>
              ) : progress > 0 ? (
                <Badge bg="warning" className="px-3 py-2" style={{ fontSize: '0.9rem' }}>
                  In Progress
                </Badge>
              ) : (
                <Badge variant="secondary" className="px-3 py-2" style={{ fontSize: '0.9rem' }}>
                  Not Started
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {travelers.length === 0 && (
          <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)' }}>
            <CardContent className="p-4">
              <div className="d-flex align-items-start gap-4">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm" style={{ width: '64px', height: '64px' }}>
                  <Plane style={{ width: '32px', height: '32px' }} />
                </div>
                <div className="flex-grow-1">
                  <h3 className="h4 mb-2 fw-bold">Ready to Start Your Journey?</h3>
                  <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    Begin by uploading your documents and completing the pre-arrival process. It takes only 10-15 minutes per traveler to get everything ready for your {selectedCountry} adventure.
                  </p>
                  <Button
                    onClick={() => onNavigate('pre-arrival-intro')}
                    variant="default"
                    className="px-md-4 py-md-2 px-2 py-2 fw-semibold"
                    style={{
                      borderRadius: '10px',
                      fontSize: 'clamp(15px, 2vw, 1.25rem)',
                      backgroundColor: 'var(--primary)',
                      borderColor: 'var(--primary)',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                    }}
                  >
                    <Plane style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                    Start Pre-Arrival Process
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Process Steps */}
        <div>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
              <FileCheck style={{ width: '24px', height: '24px', color: '#fff' }} />
            </div>
            <h2 className="mb-0 fw-bold" style={{ fontSize: '1.75rem' }}>Complete These Steps</h2>
          </div>

          {/* Step 1: Document Upload */}
          <Card className={`mb-3 border-0 shadow-sm ${hasCompletedDocuments ? 'border-success' : ''}`} style={{ borderRadius: '16px', borderWidth: hasCompletedDocuments ? '2px' : '0' }}>
            <CardContent className="p-4">
              <div className="d-flex align-items-start gap-4">
                <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm ${hasCompletedDocuments ? 'bg-success text-white' : 'bg-primary text-white'
                  }`} style={{ width: '64px', height: '64px' }}>
                  {hasCompletedDocuments ? <CheckCircle2 style={{ width: '32px', height: '32px' }} /> : <FileCheck style={{ width: '32px', height: '32px' }} />}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3 className="h5 mb-0 fw-bold">Step 1: Document Upload</h3>
                    {hasCompletedDocuments && (
                      <Badge bg="success" className="px-3 py-2">
                        <CheckCircle2 style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Upload passport, flight confirmation, and accommodation details for all travelers. This information will be used to auto-fill your entry requirements.
                  </p>
                  <Button
                    onClick={() => onNavigate(travelers.length === 0 ? 'pre-arrival-intro' : 'document-upload')}
                    variant={hasCompletedDocuments ? 'outline' : 'default'}
                    className="px-4 py-2 fw-semibold"
                    style={{
                      borderRadius: '10px',
                      fontSize: '1rem',
                      ...(hasCompletedDocuments ? {
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)'
                      } : {
                        backgroundColor: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                      })
                    }}
                  >
                    {hasCompletedDocuments ? 'Review Documents' : travelers.length === 0 ? 'Start Application' : 'Continue Upload'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Entry Requirements */}
          <Card className={`mb-3 border-0 shadow-sm ${hasCompletedEntryReqs ? 'border-success' : ''} ${travelers.length === 0 ? 'opacity-50' : ''}`} style={{ borderRadius: '16px', borderWidth: travelers.length > 0 && !hasCompletedEntryReqs ? '2px' : hasCompletedEntryReqs ? '2px' : '0' }}>
            <CardContent className="p-4">
              <div className="d-flex align-items-start gap-4">
                <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm ${hasCompletedEntryReqs ? 'bg-success text-white' : travelers.length > 0 ? 'bg-primary text-white' : 'bg-light text-muted'
                  }`} style={{ width: '64px', height: '64px' }}>
                  {hasCompletedEntryReqs ? <CheckCircle2 style={{ width: '32px', height: '32px' }} /> : <Shield style={{ width: '32px', height: '32px' }} />}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3 className="h5 mb-0 fw-bold">Step 2: Entry Requirements</h3>
                    {hasCompletedEntryReqs && (
                      <Badge bg="success" className="px-3 py-2">
                        <CheckCircle2 style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Complete visa application, customs declaration, health pass, insurance, and arrival tax for all travelers
                  </p>
                  <div className="bg-light rounded p-3 mb-4" style={{ borderRadius: '12px' }}>
                    <Row className="g-3">
                      <Col sm={6}>
                        <div className="d-flex align-items-center gap-2">
                          {travelers.every(t => t.entryRequirements.visa) ? (
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                          ) : (
                            <Circle style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                          )}
                          <span className="fw-medium">Entry Visa</span>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="d-flex align-items-center gap-2">
                          {travelers.every(t => t.entryRequirements.customs) ? (
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                          ) : (
                            <Circle style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                          )}
                          <span className="fw-medium">Customs Declaration</span>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="d-flex align-items-center gap-2">
                          {travelers.every(t => t.entryRequirements.health) ? (
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                          ) : (
                            <Circle style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                          )}
                          <span className="fw-medium">Health Pass (SSHP)</span>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="d-flex align-items-center gap-2">
                          {travelers.every(t => t.entryRequirements.insurance) ? (
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                          ) : (
                            <Circle style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                          )}
                          <span className="fw-medium">{selectedCountry} Standard Insurance</span>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="d-flex align-items-center gap-2">
                          {travelers.every(t => t.entryRequirements.tax) ? (
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                          ) : (
                            <Circle style={{ width: '20px', height: '20px', color: '#6c757d' }} />
                          )}
                          <span className="fw-medium">Arrival Tax Payment</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Button
                    onClick={() => onNavigate('visa-application')}
                    disabled={!hasCompletedDocuments}
                    variant={hasCompletedEntryReqs ? 'outline' : 'default'}
                    className="px-4 py-2 fw-semibold"
                    style={{
                      borderRadius: '10px',
                      fontSize: '1rem',
                      ...(hasCompletedEntryReqs ? {
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)'
                      } : {
                        backgroundColor: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                      })
                    }}
                  >
                    {hasCompletedEntryReqs ? 'Review Requirements' : 'Complete Requirements'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: QR Code & Entry Certificate */}
          <Card className={`mb-3 border-0 shadow-sm ${progress === 100 ? 'border-success' : 'opacity-50'}`} style={{ borderRadius: '16px', borderWidth: progress === 100 ? '2px' : '0' }}>
            <CardContent className="p-4">
              <div className="d-flex align-items-start gap-4">
                <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm ${progress === 100 ? 'bg-success text-white' : 'bg-light text-muted'
                  }`} style={{ width: '64px', height: '64px' }}>
                  {progress === 100 ? <CheckCircle2 style={{ width: '32px', height: '32px' }} /> : <QrCode style={{ width: '32px', height: '32px' }} />}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3 className="h5 mb-0 fw-bold">Step 3: Entry Certificate & QR Code</h3>
                    {progress === 100 && (
                      <Badge bg="success" className="px-3 py-2">
                        <CheckCircle2 style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                        Ready
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Get your entry certificate with QR code for quick processing at border control. Download and print before your departure.
                  </p>
                  <Button
                    onClick={() => onNavigate('qr-code')}
                    disabled={progress < 100}
                    variant={progress === 100 ? 'default' : 'secondary'}
                    className="px-4 py-2 fw-semibold"
                    style={{
                      borderRadius: '10px',
                      fontSize: '1rem',
                      ...(progress === 100 ? {
                        backgroundColor: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                      } : {})
                    }}
                  >
                    {progress === 100 ? 'View QR Code' : 'Complete All Steps First'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="mt-4 border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)' }}>
          <CardContent className="p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '48px', height: '48px' }}>
                <Heart style={{ width: '24px', height: '24px', color: '#fff' }} />
              </div>
              <h3 className="h5 mb-0 fw-bold">Need Help?</h3>
            </div>
            <Row className="g-4">
              <Col sm={6}>
                <div className="bg-white rounded p-3 shadow-sm" style={{ borderRadius: '12px' }}>
                  <p className="text-muted mb-2 small fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>Email Support</p>
                  <a href={`mailto:${supportInfo.email}`} className="text-primary text-decoration-none fw-semibold" style={{ fontSize: '1.05rem' }}>
                    {supportInfo.email}
                  </a>
                </div>
              </Col>
              <Col sm={6}>
                <div className="bg-white rounded p-3 shadow-sm" style={{ borderRadius: '12px' }}>
                  <p className="text-muted mb-2 small fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>Phone Support</p>
                  <a href={`tel:${supportInfo.phone.replace(/\s/g, '')}`} className="text-primary text-decoration-none fw-semibold" style={{ fontSize: '1.05rem' }}>
                    {supportInfo.phone}
                  </a>
                </div>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Container>
      <Footer selectedCountry={selectedCountry} />
    </div>
  );
}
