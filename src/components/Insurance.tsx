import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Container } from "react-bootstrap";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react";
import type { Traveler } from "../App";
import { getCountryFlagUrl } from "../App";

type InsuranceProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function Insurance({
  travelers,
  onUpdate,
  onNavigate,
  selectedCountry = "Bali",
}: InsuranceProps) {
  const handleComplete = () => {
    const updatedTravelers = travelers.map((t) => ({
      ...t,
      entryRequirements: { ...t.entryRequirements, insurance: true },
    }));
    onUpdate(updatedTravelers);
    onNavigate("arrival-tax");
  };

  const totalCost = travelers.length * 15; // $15 per traveler

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => onNavigate("health-pass")}
            className="text-white mb-3 p-0"
            style={{ textDecoration: "none" }}
          >
            <ArrowLeft
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
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
            {selectedCountry} Standard Insurance
          </h1>
          <p className="text-white mt-2 mb-0">
            Required travel insurance coverage
          </p>
        </Container>
      </div>

      <Container>
        <Card style={{ borderWidth: "2px" }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "64px", height: "64px" }}
              >
                <Shield
                  style={{ width: "32px", height: "32px", color: "#fff" }}
                />
              </div>
              <div>
                <h2 className="mb-0">Mandatory Travel Insurance</h2>
                <p className="text-muted mb-0">
                  All travelers must have valid insurance coverage
                </p>
              </div>
            </div>

            <div className="bg-info bg-opacity-10 border border-info rounded p-4 mb-4">
              <h3 className="mb-3">
                {selectedCountry} Standard Insurance Policy
              </h3>
              <p className="text-muted mb-3">
                The {selectedCountry} Standard Insurance provides essential
                coverage for all international visitors to {selectedCountry}.
                This insurance is mandatory for entry and ensures you have basic
                protection during your stay.
              </p>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <Check
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#198754",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <div>
                      <p className="small mb-0">Medical Emergency Coverage</p>
                      <p className="small text-muted mb-0">Up to $25,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <Check
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#198754",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <div>
                      <p className="small mb-0">Emergency Evacuation</p>
                      <p className="small text-muted mb-0">Up to $50,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <Check
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#198754",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <div>
                      <p className="small mb-0">COVID-19 Coverage</p>
                      <p className="small text-muted mb-0">
                        Medical treatment included
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <Check
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#198754",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <div>
                      <p className="small mb-0">Accident Coverage</p>
                      <p className="small text-muted mb-0">24/7 assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="mb-3">Coverage Details</h3>

              <Card className="mb-3">
                <CardContent className="pt-4">
                  <h4 className="mb-3">What's Covered</h4>
                  <ul
                    className="small text-muted mb-0"
                    style={{ paddingLeft: "20px" }}
                  >
                    <li>Emergency medical treatment and hospitalization</li>
                    <li>Emergency dental treatment (up to $500)</li>
                    <li>Medical evacuation and repatriation</li>
                    <li>COVID-19 related medical expenses</li>
                    <li>24/7 emergency assistance hotline</li>
                    <li>Accidental death and permanent disability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h4 className="mb-3">Important Requirements</h4>
                  <div>
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <AlertCircle
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffc107",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <div className="small">
                        <p className="text-muted mb-1">
                          <strong>Coverage Period:</strong> Insurance must cover
                          your entire stay in {selectedCountry}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <AlertCircle
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffc107",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <div className="small">
                        <p className="text-muted mb-1">
                          <strong>Proof Required:</strong> Insurance certificate
                          will be generated upon payment
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <AlertCircle
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#ffc107",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <div className="small">
                        <p className="text-muted mb-1">
                          <strong>Border Control:</strong> May request to see
                          proof of insurance upon arrival
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div
              className="border border-primary rounded p-4"
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)",
              }}
            >
              <h4 className="mb-3">Insurance Cost Summary</h4>
              <div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted">Coverage per traveler:</span>
                  <span>$15 USD</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted">Number of travelers:</span>
                  <span>{travelers.length}</span>
                </div>
                <div className="border-top pt-2 mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Total Insurance Cost:</span>
                    <span className="text-primary">${totalCost} USD</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Badge bg="success" className="p-2">
                  Automatically included with your booking
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
          <p className="small text-muted mb-0">
            Insurance will be processed with final payment
          </p>
          <Button onClick={handleComplete} className="mt-2 mt-md-0">
            Continue to Arrival Tax
            <ArrowRight
              style={{ width: "16px", height: "16px", marginLeft: "8px" }}
            />
          </Button>
        </div>
      </Container>
    </div>
  );
}
