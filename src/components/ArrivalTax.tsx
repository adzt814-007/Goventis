import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, DollarSign, Users } from 'lucide-react';
import type { Traveler } from '../App';

type ArrivalTaxProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function ArrivalTax({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: ArrivalTaxProps) {
  const taxPerPerson = 10; // $10 USD per person
  const totalTax = travelers.length * taxPerPerson;

  const handleComplete = () => {
    const updatedTravelers = travelers.map(t => ({
      ...t,
      entryRequirements: { ...t.entryRequirements, tax: true },
    }));
    onUpdate(updatedTravelers);
    onNavigate('payment');
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => onNavigate('insurance')}
            className="text-white mb-3 p-0"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back
          </Button>
          <h1 className="text-white mb-0">{selectedCountry} Arrival Tax Payment</h1>
          <p className="text-white mt-2 mb-0">Mandatory tax for all visitors</p>
        </Container>
      </div>

      <Container>
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <DollarSign style={{ width: '32px', height: '32px', color: '#0dcaf0' }} />
              </div>
              <div>
                <h2 className="mb-0">Tourism Levy</h2>
                <p className="text-muted mb-0">Required for all foreign visitors to {selectedCountry}</p>
              </div>
            </div>

            <div className="bg-info bg-opacity-10 border border-info rounded p-4 mb-4">
              <h3 className="mb-3">About {selectedCountry} Arrival Tax</h3>
              <p className="text-muted mb-3">
                The {selectedCountry} government has implemented a tourism levy of IDR 150,000 (approximately $10 USD) 
                per foreign visitor. This tax helps fund environmental conservation, cultural preservation, and 
                infrastructure improvements across the island.
              </p>
              <div className="d-flex align-items-start gap-2 small text-muted">
                <span className="text-info">ℹ</span>
                <span>
                  By paying online before arrival, you can skip the payment queue at the airport and proceed 
                  directly to immigration with your digital receipt.
                </span>
              </div>
            </div>

            <Row className="g-3 mb-4">
              <Col md={6}>
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="mb-3">What the Tax Supports</h4>
                    <ul className="small text-muted mb-0" style={{ paddingLeft: '20px' }}>
                      <li>Environmental conservation and beach cleaning</li>
                      <li>Temple and cultural site preservation</li>
                      <li>Local infrastructure development</li>
                      <li>Tourism facilities and public services</li>
                    </ul>
                  </CardContent>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="mb-3">Important Information</h4>
                    <ul className="small text-muted mb-0" style={{ paddingLeft: '20px' }}>
                      <li>Mandatory for all foreign visitors</li>
                      <li>Valid for your entire stay duration</li>
                      <li>Digital receipt accepted at immigration</li>
                      <li>Non-refundable once processed</li>
                    </ul>
                  </CardContent>
                </Card>
              </Col>
            </Row>

            <div className="bg-info bg-opacity-10 border border-info rounded p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Users style={{ width: '24px', height: '24px', color: '#0dcaf0' }} />
                <h4 className="mb-0">Tax Calculation</h4>
              </div>
              
              <div>
                {travelers.map((traveler, index) => (
                  <div key={traveler.id} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div>
                      <p className="small mb-0">
                        {traveler.personalDetails.firstName} {traveler.personalDetails.lastName}
                      </p>
                      <p className="small text-muted mb-0">
                        {traveler.personalDetails.nationality}
                        {traveler.isMinor && <Badge variant="outline" className="ms-2">Minor</Badge>}
                      </p>
                    </div>
                    <span className="text-info">${taxPerPerson} USD</span>
                  </div>
                ))}
                
                <div className="border-top border-2 pt-3 mt-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="mb-0">Total Arrival Tax</p>
                      <p className="small text-muted mb-0">{travelers.length} {travelers.length === 1 ? 'traveler' : 'travelers'}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-info mb-0">${totalTax} USD</p>
                      <p className="small text-muted mb-0">≈ IDR {(totalTax * 15000).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-success bg-opacity-10 border border-success rounded p-3">
              <p className="small text-muted mb-0">
                <strong>✓ Benefits of Paying Online:</strong> Skip airport queues, faster immigration clearance, 
                instant digital receipt, and secure payment processing.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
          <p className="small text-muted mb-0">
            Tax will be processed with final payment
          </p>
          <Button onClick={handleComplete} style={{ backgroundColor: '#0d9488', borderColor: '#0d9488' }} className='mt-2 mt-md-0'>
            Proceed to Payment
            <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
          </Button>
        </div>
      </Container>
    </div>
  );
}
