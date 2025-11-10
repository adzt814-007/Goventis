import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, Clock, FileText, Users, Check } from 'lucide-react';
import { getCountryFlagUrl } from '../App';

type PreArrivalIntroProps = {
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function PreArrivalIntro({ onNavigate, selectedCountry = 'Bali' }: PreArrivalIntroProps) {
  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => onNavigate('dashboard')}
            className="text-white mb-3 p-0"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back to Dashboard
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
            Pre-Arrival Documentation
          </h1>
          <p className="text-white mt-2 mb-0">Complete your entry requirements in 8 simple steps</p>
        </Container>
      </div>

      <Container>
        {/* Overview Card */}
        <Card className="mb-4" style={{ borderWidth: '2px' }}>
          <CardContent className="pt-4">
            <h2 className="mb-3">Welcome to the Pre-Arrival Process</h2>
            <p className="text-muted mb-4">
              To ensure a smooth entry into {selectedCountry}, all travelers must complete the required documentation before arrival. This process is designed to be quick and straightforward.
            </p>

            <Row className="g-4 mb-4">
              <Col sm={12} md={4}>
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                    <Clock style={{ width: '20px', height: '20px', color: '#fff' }} />
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Estimated Time</p>
                    <p className="mb-0">10-15 minutes per traveler</p>
                  </div>
                </div>
              </Col>

              <Col sm={12} md={4}>
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-success bg-opacity-10 text-success rounded p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                    <FileText style={{ width: '20px', height: '20px' }} />
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Documents Required</p>
                    <p className="mb-0">3 documents to upload</p>
                  </div>
                </div>
              </Col>

              <Col sm={12} md={4}>
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-info bg-opacity-10 text-info rounded p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                    <Users style={{ width: '20px', height: '20px' }} />
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Multi-Traveler</p>
                    <p className="mb-0">Add up to 5 travelers</p>
                  </div>
                </div>
              </Col>
            </Row>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <h2 className="mb-4">8-Step Application Process</h2>

        <div className="mb-4">
          {/* Steps 1-4: Document Upload */}
          <Card className="mb-3">
            <CardContent className="pt-4">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  1-4
                </div>
                <div className="flex-grow-1">
                  <h3 className="h5 mb-2">Document Upload Section</h3>
                  <p className="text-muted mb-3">
                    Upload required travel documents for verification
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 1: Introduction and traveler count
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 2: Passport upload with camera/document capture
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 3: Flight or ferry confirmation
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-0">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 4: Accommodation confirmation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Steps 5-8: Information Confirmation */}
          <Card className="mb-3">
            <CardContent className="pt-4">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  5-8
                </div>
                <div className="flex-grow-1">
                  <h3 className="h5 mb-2">Information Confirmation & Contact Details</h3>
                  <p className="text-muted mb-3">
                    Review auto-filled information and provide contact details
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 5: Personal details (auto-filled from passport)
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 6: Flight details (auto-filled from booking)
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-2">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 7: Accommodation details (auto-filled)
                    </li>
                    <li className="d-flex align-items-center gap-2 small text-muted mb-0">
                      <Check style={{ width: '16px', height: '16px', color: 'green' }} />
                      Step 8: Manual contact information entry
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entry Requirements Preview */}
        <h2 className="mb-4">After Document Upload</h2>

        <div className="mb-4">
          <Card className="" style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)"
          }}>
            <CardContent className="pt-4">
              <p className=" mb-3">
                Once you complete the document upload process, you'll proceed to complete the following entry requirements:
              </p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center gap-2 mb-2">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  <span>Entry Visa Application (2 steps)</span>
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  <span>Customs Declaration (2 steps)</span>
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  <span>Health Pass - SATUSEHAT/SSHP (2 steps)</span>
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  <span>{selectedCountry} Standard Insurance verification</span>
                </li>
                <li className="d-flex align-items-center gap-2 mb-0">
                  <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  <span>Arrival Tax Payment</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mb-4 border-warning bg-warning bg-opacity-10">
          <CardContent className="pt-4">
            <h3 className="h5 mb-3">Important Information</h3>
            <ul className="list-unstyled mb-0 small text-muted">
              <li className="d-flex align-items-start gap-2 mb-2">
                <span className="text-warning mt-1">•</span>
                <span>All travelers, including minors, must complete this process</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-2">
                <span className="text-warning mt-1">•</span>
                <span>Minors have simplified forms with reduced information requirements</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-2">
                <span className="text-warning mt-1">•</span>
                <span>Documents should be clear, readable, and in PDF or image format</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-2">
                <span className="text-warning mt-1">•</span>
                <span>Your progress is automatically saved at each step</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-0">
                <span className="text-warning mt-1">•</span>
                <span>You can complete the process in multiple sessions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="d-flex justify-content-center">
          <Button
            size="lg"
            onClick={() => onNavigate('document-upload')}
            className="px-md-4 py-1 px-4"
          >
            Start Application
          </Button>
        </div>
      </Container>
    </div>
  );
}
