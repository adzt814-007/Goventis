import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel, 
  FileText, 
  Download,
  CheckCircle2,
  Clock
} from 'lucide-react';
import type { Traveler } from '../App';

type MyTripProps = {
  travelers: Traveler[];
  onNavigate: (page: string) => void;
  user?: { email: string; name: string } | null;
  onLogout?: () => void;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function MyTrip({ travelers, onNavigate, user, onLogout, currentPage, selectedCountry = 'Bali', onCountryChange }: MyTripProps) {
  const mainTraveler = travelers[0];
  
  if (!mainTraveler) {
    return (
      <div className="min-vh-100">
        <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
        <div className="bg-primary text-white py-4 mb-4" style={{ background: 'linear-gradient(to right, var(--primary), var(--ocean-blue))' }}>
          <Container>
            <h1 className="text-white mb-0">My Trip</h1>
            <p className="text-white-50 mt-2 mb-0">Your travel itinerary and documents</p>
          </Container>
        </div>
        <Container>
          <Card>
            <CardContent className="pt-4 text-center py-5">
              <p className="text-muted mb-3">No trip details available yet</p>
              <Button onClick={() => onNavigate('dashboard')}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  const calculateDaysUntilTrip = () => {
    const arrivalDate = new Date(mainTraveler.personalDetails.dateOfArrival);
    const today = new Date();
    const diffTime = arrivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilTrip = calculateDaysUntilTrip();

  return (
    <div className="min-vh-100">
      <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      <div className="bg-primary text-white py-4 mb-4" style={{ background: 'linear-gradient(to right, var(--primary), var(--ocean-blue))' }}>
        <Container>
          <h1 className="text-white mb-2">My Trip to {selectedCountry}</h1>
          <p className="text-white mb-0">Your complete travel itinerary and documentation</p>
          {daysUntilTrip > 0 && (
            <div className="mt-3 d-inline-flex align-items-center gap-2 bg-white bg-opacity-20 rounded-pill px-3 py-2">
              <Clock style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
              <span className="small" style={{ color: 'var(--primary)' }}>{daysUntilTrip} days until your trip</span>
            </div>
          )}
        </Container>
      </div>

      <Container>
        {/* Trip Overview */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">Trip Overview</h2>
              <Badge bg="primary">
                {travelers.length} {travelers.length === 1 ? 'Traveler' : 'Travelers'}
              </Badge>
            </div>

            <Row className="g-4">
              {/* Flight Details */}
              <Col md={6}>
                <div>
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-primary bg-opacity-10 rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <Plane style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-2">Flight Information</h4>
                      <div className="small text-muted">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span>Flight Number:</span>
                          <span className="text-dark">{mainTraveler.personalDetails.flightVesselNumber}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span>Transport:</span>
                          <span className="text-dark">{mainTraveler.personalDetails.modeOfTransport}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-success bg-opacity-10 rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <Calendar style={{ width: '20px', height: '20px', color: '#198754' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-2">Travel Dates</h4>
                      <div className="small text-muted">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span>Arrival:</span>
                          <span className="text-dark">{mainTraveler.personalDetails.dateOfArrival}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span>Departure:</span>
                          <span className="text-dark">{mainTraveler.departureDetails.dateOfDeparture}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Accommodation */}
              <Col md={6}>
                <div>
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-primary bg-opacity-10 rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <Hotel style={{ width: '20px', height: '20px', color: '#fff' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-2">Accommodation</h4>
                      <div className="small">
                        <p className="text-dark mb-2">{mainTraveler.accommodationDetails.address1} {mainTraveler.accommodationDetails.address2}</p>
                        <div className="d-flex gap-2">
                          <Badge variant="outline">{mainTraveler.accommodationDetails.residenceType}</Badge>
                          <Badge variant="outline">{mainTraveler.accommodationDetails.postalCode}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-warning bg-opacity-10 rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <MapPin style={{ width: '20px', height: '20px', color: '#fd7e14' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-2">Destination</h4>
                      <p className="small text-muted mb-1">{selectedCountry}</p>
                      <p className="small text-muted mb-0">International Airport</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </CardContent>
        </Card>

        {/* Travelers List */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <h2 className="mb-4">Travelers</h2>
            <div>
              {travelers.map((traveler, index) => (
                <div key={traveler.id} className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="mb-0">
                        {traveler.personalDetails.firstName} {traveler.personalDetails.lastName}
                      </p>
                      <p className="small text-muted mb-0">
                        {traveler.personalDetails.nationality} • {traveler.personalDetails.passportNumber}
                      </p>
                    </div>
                  </div>
                  {traveler.isMinor && (
                    <Badge variant="outline">Minor</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">Travel Documents</h2>
              <Button variant="outline" size="sm">
                <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Download All
              </Button>
            </div>

            <div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                  <div>
                    <p className="mb-0">Entry Certificate & QR Codes</p>
                    <p className="small text-muted mb-0">All travelers</p>
                  </div>
                </div>
                <Button variant="link" style={{ color: 'var(--primary)' }} size="sm" onClick={() => onNavigate('qr-code')}>
                  View
                </Button>
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: '#198754' }} />
                  <div>
                    <p className="mb-0">Visa Confirmation</p>
                    <p className="small text-muted mb-0">Tourist Visa - 30 Days</p>
                  </div>
                </div>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#198754' }} />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: '#6f42c1' }} />
                  <div>
                    <p className="mb-0">Customs Declaration</p>
                    <p className="small text-muted mb-0">Completed for all travelers</p>
                  </div>
                </div>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#198754' }} />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: '#dc3545' }} />
                  <div>
                    <p className="mb-0">Health Pass (SATUSEHAT)</p>
                    <p className="small text-muted mb-0">Valid health declaration</p>
                  </div>
                </div>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#198754' }} />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: '#4f46e5' }} />
                  <div>
                    <p className="mb-0">Travel Insurance Certificate</p>
                    <p className="small text-muted mb-0">{selectedCountry} Standard Insurance</p>
                  </div>
                </div>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#198754' }} />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                <div className="d-flex align-items-center gap-3">
                  <FileText style={{ width: '20px', height: '20px', color: '#0dcaf0' }} />
                  <div>
                    <p className="mb-0">Arrival Tax Receipt</p>
                    <p className="small text-muted mb-0">Payment confirmed</p>
                  </div>
                </div>
                <CheckCircle2 style={{ width: '20px', height: '20px', color: '#198754' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Tips */}
        <Card className="bg-info bg-opacity-10 border-info mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-3">Travel Tips for {selectedCountry}</h3>
            <ul className="small text-muted mb-0" style={{ paddingLeft: '20px' }}>
              <li>Arrive at the airport at least 3 hours before your international flight</li>
              <li>Have your QR code ready on your phone or printed for quick immigration clearance</li>
              <li>Keep your passport easily accessible throughout your journey</li>
              <li>Download offline maps and translation apps before your trip</li>
              <li>Exchange some currency at the airport for immediate expenses</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="mt-4 d-flex justify-content-center">
          <Button onClick={() => onNavigate('dashboard')} >
            Back to Dashboard
          </Button>
        </div>
      </Container>
      <Footer selectedCountry={selectedCountry} />
    </div>
  );
}
