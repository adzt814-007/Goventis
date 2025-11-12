import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, CreditCard, Building2, Wallet, CheckCircle2, ChevronDown } from 'lucide-react';
import type { Traveler } from '../App';
import { COUNTRIES, getCountryFlagUrl } from '../App';

type PaymentProps = {
  travelers: Traveler[];
  user: { email: string; name: string } | null;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function Payment({ travelers, user, onNavigate, selectedCountry = 'Bali' }: PaymentProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [showBillingCountryDropdown, setShowBillingCountryDropdown] = useState(false);
  const billingCountryDropdownRef = useRef<HTMLDivElement>(null);

  // Calculate costs
  const visaCost = travelers.reduce((sum, t) => sum + 35, 0); // $35 per traveler (assuming tourist-30)
  const insuranceCost = travelers.length * 15;
  const taxCost = travelers.length * 10;
  const totalCost = visaCost + insuranceCost + taxCost;

  const paymentReference = `BALI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handleComplete = () => {
    // Payment successful - navigate to success screen
    onNavigate('payment-success');
  };

  // Close billing country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (billingCountryDropdownRef.current && !billingCountryDropdownRef.current.contains(event.target as Node)) {
        setShowBillingCountryDropdown(false);
      }
    };

    if (showBillingCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBillingCountryDropdown]);

  const handleBillingCountrySelect = (country: string) => {
    setBillingAddress({ ...billingAddress, country });
    setShowBillingCountryDropdown(false);
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => step === 1 ? onNavigate('arrival-tax') : setStep(step - 1)}
            className="text-white mb-3 p-0"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
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
            Payment
          </h1>
          <p className="text-white mt-2 mb-0">Step {step} of 3</p>
        </Container>
      </div>

      <Container>
        {/* Step 1: Order Summary */}
        {step === 1 && (
          <div>
            <Card style={{ borderWidth: '2px' }}>
              <CardContent className="pt-4">
                <h2 className="mb-4">Order Summary</h2>

                <div>
                  <div className="bg-light rounded p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="mb-0">Entry Visa Application</h3>
                      <Badge variant="outline">{travelers.length} {travelers.length === 1 ? 'traveler' : 'travelers'}</Badge>
                    </div>
                    {travelers.map((traveler, index) => (
                      <div key={traveler.id} className="d-flex align-items-center justify-content-between py-2 small border-top">
                        <span className="text-muted">
                          {traveler.personalDetails.firstName} {traveler.personalDetails.lastName} - Tourist Visa (30 days)
                        </span>
                        <span>$35.00</span>
                      </div>
                    ))}
                    <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-2">
                      <span>Visa Subtotal:</span>
                      <span className="text-success">${visaCost}.00</span>
                    </div>
                  </div>

                  <div className="bg-light rounded p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3 className="mb-0">{selectedCountry} Standard Insurance</h3>
                    </div>
                    <div className="d-flex align-items-center justify-content-between small">
                      <span className="text-muted">{travelers.length} {travelers.length === 1 ? 'traveler' : 'travelers'} × $15.00</span>
                      <span className="text-primary">${insuranceCost}.00</span>
                    </div>
                  </div>

                  <div className="bg-light rounded p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3 className="mb-0">Arrival Tax</h3>
                    </div>
                    <div className="d-flex align-items-center justify-content-between small">
                      <span className="text-muted">{travelers.length} {travelers.length === 1 ? 'traveler' : 'travelers'} × $10.00</span>
                      <span className="text-info">${taxCost}.00</span>
                    </div>
                  </div>

                  <div className="border-top border-2 pt-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <p className="mb-0">Total Amount Due</p>
                        <p className="small text-muted mb-0">All fees included</p>
                      </div>
                      <div className="text-end">
                        <p className="text-success mb-0">${totalCost}.00 USD</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-info bg-opacity-10 border border-info rounded p-3 mt-4">
                    <p className="small text-muted mb-0">
                      <strong>Secure Payment:</strong> Your payment is processed securely. All entry requirements 
                      will be processed simultaneously, and you'll receive your entry certificate and QR code 
                      immediately upon successful payment.
                    </p>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-end">
                  <Button onClick={() => setStep(2)} >
                    Continue to Billing
                    <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Billing Address */}
        {step === 2 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h2 className="mb-4">Billing Address</h2>

              <div className="bg-success bg-opacity-10 border border-success rounded p-3 mb-4">
                <p className="small text-muted mb-0">
                  <strong>Auto-filled:</strong> We've pre-filled your billing address from your profile. 
                  Please verify or update as needed.
                </p>
              </div>

              <div>
                <div className="mb-3">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={billingAddress.street}
                    onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                    placeholder="123 Main Street"
                    className="mt-2"
                  />
                </div>

                <Row className="g-3 mb-3">
                  <Col sm={6}>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      placeholder="New York"
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                      placeholder="NY"
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col sm={6}>
                    <Label htmlFor="postcode">Postal Code</Label>
                    <Input
                      id="postcode"
                      value={billingAddress.postcode}
                      onChange={(e) => setBillingAddress({ ...billingAddress, postcode: e.target.value })}
                      placeholder="10001"
                      className="mt-2"
                    />
                  </Col>
                  <Col sm={6}>
                    <Label htmlFor="country">Country</Label>
                    <div className="position-relative mt-2" ref={billingCountryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowBillingCountryDropdown(!showBillingCountryDropdown)}
                        className="d-flex align-items-center gap-2 border rounded w-100"
                        style={{
                          borderColor: 'var(--border)',
                          borderRadius: '6px',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          backgroundColor: '#fff',
                          color: 'var(--foreground)',
                          transition: 'all 0.2s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--primary-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff';
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      >
                        {billingAddress.country ? (
                          <>
                            <img 
                              src={getCountryFlagUrl(billingAddress.country, 'w40')}
                              alt={`${billingAddress.country} flag`}
                              style={{ 
                                width: '24px', 
                                height: '18px', 
                                objectFit: 'cover',
                                borderRadius: '2px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                flexShrink: 0
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <span className="flex-grow-1 text-start">{billingAddress.country}</span>
                          </>
                        ) : (
                          <span className="flex-grow-1 text-start text-muted">Select Country</span>
                        )}
                        <ChevronDown 
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            transform: showBillingCountryDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0
                          }} 
                        />
                      </button>
                      
                      {showBillingCountryDropdown && (
                        <div
                          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                          style={{
                            minWidth: '100%',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          {COUNTRIES.map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleBillingCountrySelect(country)}
                              className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: country === billingAddress.country ? 'var(--primary)' : 'transparent',
                                color: country === billingAddress.country ? 'white' : 'var(--foreground)',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (country !== billingAddress.country) {
                                  e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (country !== billingAddress.country) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                } else {
                                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                                }
                              }}
                            >
                              <img 
                                src={getCountryFlagUrl(country, 'w40')}
                                alt={`${country} flag`}
                                style={{ 
                                  width: '24px', 
                                  height: '18px', 
                                  objectFit: 'cover',
                                  borderRadius: '2px',
                                  border: '1px solid rgba(0, 0, 0, 0.1)',
                                  flexShrink: 0
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <span>{country}</span>
                              {country === billingAddress.country && (
                                <span className="ms-auto" style={{ color: 'white' }}>✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={() => setStep(3)}  style={{fontSize:"clamp(1rem, 2vw, 1.10rem)"}}>
                  Continue to Payment Method
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div>
            <Card style={{ borderWidth: '2px' }} className="mb-4">
              <CardContent className="pt-4">
                <h2 className="mb-4">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
                  <Card className={`mb-3 ${paymentMethod === 'card' ? 'border-success border-2' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="d-flex align-items-start gap-3">
                        <RadioGroupItem value="card" id="card" className="mt-1" />
                        <div className="flex-grow-1">
                          <Label htmlFor="card" style={{ cursor: 'pointer' }} className="d-flex align-items-center gap-2">
                            <CreditCard style={{ width: '20px', height: '20px' }} />
                            <span>Credit / Debit Card</span>
                            <Badge variant="outline">Recommended</Badge>
                          </Label>
                          <p className="small text-muted mt-2 mb-0">Instant processing with secure payment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`mb-3 ${paymentMethod === 'bank' ? 'border-success border-2' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="d-flex align-items-start gap-3">
                        <RadioGroupItem value="bank" id="bank" className="mt-1" />
                        <div className="flex-grow-1">
                          <Label htmlFor="bank" style={{ cursor: 'pointer' }} className="d-flex align-items-center gap-2">
                            <Building2 style={{ width: '20px', height: '20px' }} />
                            <span>Bank Transfer</span>
                          </Label>
                          <p className="small text-muted mt-2 mb-0">Processing may take 1-3 business days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`mb-3 ${paymentMethod === 'wallet' ? 'border-success border-2' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="d-flex align-items-start gap-3">
                        <RadioGroupItem value="wallet" id="wallet" className="mt-1" />
                        <div className="flex-grow-1">
                          <Label htmlFor="wallet" style={{ cursor: 'pointer' }} className="d-flex align-items-center gap-2">
                            <Wallet style={{ width: '20px', height: '20px' }} />
                            <span>E-Wallet</span>
                          </Label>
                          <p className="small text-muted mt-2 mb-0">PayPal, Apple Pay, Google Pay</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-light rounded">
                    <div className="mb-3">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" />
                    </div>
                    <Row className="g-3">
                      <Col sm={6}>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                      </Col>
                      <Col sm={6}>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-2" type="password" maxLength={3} />
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="mt-4 bg-success bg-opacity-10 border border-success rounded p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>Payment Reference:</span>
                    <Badge variant="outline">{paymentReference}</Badge>
                  </div>
                  <p className="small text-muted mb-0">
                    Save this reference number for your records. You'll also receive it via email.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-info bg-opacity-10 border-info mb-4">
              <CardContent className="pt-4">
                <div className="d-flex align-items-start gap-3">
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                  <div className="small text-muted">
                    <p className="mb-2">
                      <strong>Payment Processing:</strong> Once your payment is confirmed, we'll immediately 
                      generate your entry certificate with QR codes for all travelers. You'll receive:
                    </p>
                    <ul className="mb-0" style={{ paddingLeft: '20px' }}>
                      <li>Individual QR codes for each traveler</li>
                      <li>Digital entry certificate (downloadable)</li>
                      <li>Email confirmation with all documents</li>
                      <li>SMS notification with quick access link</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-0">Total Amount:</p>
                <p className="text-success mb-0">${totalCost}.00 USD</p>
              </div>
              <Button onClick={handleComplete}  style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}>
                Complete Payment
                <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
