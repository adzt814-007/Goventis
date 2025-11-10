import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Plane, Mail, Phone, MapPin } from 'lucide-react';
import { getSupportInfo } from '../App';

type FooterProps = {
  selectedCountry?: string;
};

export function Footer({ selectedCountry = 'Bali' }: FooterProps) {
  const supportInfo = getSupportInfo(selectedCountry);
  
  return (
    <footer className="bg-primary text-white mt-5">
      <Container className="py-5">
        <Row className="g-4 mb-4">
          {/* Brand */}
          <Col md={3}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary bg-opacity-75 rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Plane style={{ width: '24px', height: '24px' }} />
              </div>
              <span>{selectedCountry} Tourism Portal</span>
            </div>
            <p className="text-white small mb-0">
              Official pre-arrival documentation system for visitors to {selectedCountry}.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h4 className="mb-3">Quick Links</h4>
            <ul className="list-unstyled small text-white">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>About {selectedCountry}</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Entry Requirements</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Travel Advisory</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>FAQs</a></li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={3}>
            <h4 className="mb-3">Support</h4>
            <ul className="list-unstyled small text-white">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Terms of Service</a></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h4 className="mb-3">Contact Information</h4>
            <ul className="list-unstyled small text-white">
              <li className="d-flex align-items-start gap-2 mb-3">
                <Mail style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }} />
                <span>{supportInfo.email}</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-3">
                <Phone style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }} />
                <span>{supportInfo.phone}</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <MapPin style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }} />
                <span>{selectedCountry} Tourism Office</span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="border-top border-primary border-opacity-50 pt-4 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 small text-white">
          <p className="mb-0">© 2025 Government of {selectedCountry}. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Privacy</a>
            <a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Terms</a>
            <a href="#" className="text-white text-decoration-none" style={{ transition: 'color 0.2s' }}>Accessibility</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
