import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Traveler } from '../App';
import { getCountryFlagUrl } from '../App';

type CustomsDeclarationProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function CustomsDeclaration({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: CustomsDeclarationProps) {
  const [step, setStep] = useState(1);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [baggageType, setBaggageType] = useState('accompanied');
  const [accompaniedBaggage, setAccompaniedBaggage] = useState<number>(
    travelers[0]?.customsDetails?.accompaniedBaggage || 0
  );
  const [unaccompaniedBaggage, setUnaccompaniedBaggage] = useState<number>(
    travelers[0]?.customsDetails?.unaccompaniedBaggage || 0
  );
  const [imeiRegistration, setImeiRegistration] = useState({
    handphone: travelers[0]?.customsDetails?.imeiRegistration?.handphone || false,
    handheld: travelers[0]?.customsDetails?.imeiRegistration?.handheld || false,
    computer: travelers[0]?.customsDetails?.imeiRegistration?.computer || false,
    tablet: travelers[0]?.customsDetails?.imeiRegistration?.tablet || false,
  });
  const [hasElectronics, setHasElectronics] = useState(false);
  const [hasCurrency, setHasCurrency] = useState(false);
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [familyDeclaration, setFamilyDeclaration] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const currentTraveler = travelers[currentTravelerIndex];

  const handleComplete = () => {
    const updatedTravelers = [...travelers];
    updatedTravelers[currentTravelerIndex].entryRequirements.customs = true;
    updatedTravelers[currentTravelerIndex].customsDetails = {
      accompaniedBaggage,
      unaccompaniedBaggage,
      imeiRegistration,
      hasElectronics,
      hasCurrency,
      currencyAmount,
      familyDeclaration,
      agreed: true,
    };
    onUpdate(updatedTravelers);

    if (currentTravelerIndex < travelers.length - 1) {
      setCurrentTravelerIndex(currentTravelerIndex + 1);
      setStep(1);
      setAccompaniedBaggage(updatedTravelers[currentTravelerIndex + 1]?.customsDetails?.accompaniedBaggage || 0);
      setUnaccompaniedBaggage(updatedTravelers[currentTravelerIndex + 1]?.customsDetails?.unaccompaniedBaggage || 0);
      setImeiRegistration(updatedTravelers[currentTravelerIndex + 1]?.customsDetails?.imeiRegistration || {
        handphone: false,
        handheld: false,
        computer: false,
        tablet: false,
      });
      setAgreed(false);
    } else {
      onNavigate('health-pass');
    }
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => step === 1 ? onNavigate('visa-application') : setStep(step - 1)}
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
            Customs Declaration
          </h1>
          <p className="text-white mt-2 mb-0">Step {step} of 2</p>
        </Container>
      </div>

      <Container>
        <div className="mb-4">
          <h2>Traveler {currentTravelerIndex + 1} of {travelers.length}</h2>
          <p className="text-muted">
            {currentTraveler?.personalDetails.firstName} {currentTraveler?.personalDetails.lastName}
          </p>
        </div>

        {/* Step 1: Baggage & Electronics */}
        {step === 1 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h3 className="mb-4">Baggage Information & Electronic Goods</h3>

              <div>
                {/* Baggage Numbers */}
                <div className="mb-4">
                  <Label className="mb-3 d-block">Baggage Information</Label>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Label htmlFor="accompaniedBaggage" className="mb-2">Number of Accompanied Baggage</Label>
                      <Input
                        id="accompaniedBaggage"
                        type="number"
                        min="0"
                        value={accompaniedBaggage}
                        onChange={(e) => setAccompaniedBaggage(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="mt-2"
                      />
                      <p className="small text-muted mt-1 mb-0">Baggage traveling with you</p>
                    </div>
                    <div className="col-md-6">
                      <Label htmlFor="unaccompaniedBaggage" className="mb-2">Number of Unaccompanied Baggage</Label>
                      <Input
                        id="unaccompaniedBaggage"
                        type="number"
                        min="0"
                        value={unaccompaniedBaggage}
                        onChange={(e) => setUnaccompaniedBaggage(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="mt-2"
                      />
                      <p className="small text-muted mt-1 mb-0">Baggage shipped separately</p>
                    </div>
                  </div>
                </div>

                {/* IMEI Registration */}
                <div className="border-top pt-4">
                  <Label className="mb-3 d-block">IMEI Registration</Label>
                  <p className="small text-muted mb-3">
                    Please indicate which electronic devices you are bringing that require IMEI registration:
                  </p>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <Label htmlFor="imei-handphone" className="mb-0" style={{ cursor: 'pointer' }}>
                        Handphone / Mobile Phone
                      </Label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="imei-handphone"
                          checked={imeiRegistration.handphone}
                          onChange={(e) => setImeiRegistration({ ...imeiRegistration, handphone: e.target.checked })}
                          style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <Label htmlFor="imei-handheld" className="mb-0" style={{ cursor: 'pointer' }}>
                        Handheld Device
                      </Label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="imei-handheld"
                          checked={imeiRegistration.handheld}
                          onChange={(e) => setImeiRegistration({ ...imeiRegistration, handheld: e.target.checked })}
                          style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <Label htmlFor="imei-computer" className="mb-0" style={{ cursor: 'pointer' }}>
                        Computer / Laptop
                      </Label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="imei-computer"
                          checked={imeiRegistration.computer}
                          onChange={(e) => setImeiRegistration({ ...imeiRegistration, computer: e.target.checked })}
                          style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <Label htmlFor="imei-tablet" className="mb-0" style={{ cursor: 'pointer' }}>
                        Tablet
                      </Label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="imei-tablet"
                          checked={imeiRegistration.tablet}
                          onChange={(e) => setImeiRegistration({ ...imeiRegistration, tablet: e.target.checked })}
                          style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 bg-info bg-opacity-10 border border-info rounded p-3">
                    <p className="small text-muted mb-0">
                      IMEI registration is required for electronic devices brought into {selectedCountry}. 
                      Please ensure all devices are registered upon arrival.
                    </p>
                  </div>
                </div>

                {/* Prohibited Items Warning */}
                <div className="border-top pt-4">
                  <div className="bg-danger bg-opacity-10 border border-danger rounded p-3">
                    <h4 className="mb-2 text-danger">Prohibited Items</h4>
                    <p className="small mb-2">
                      The following items are strictly prohibited and will result in confiscation:
                    </p>
                    <ul className="small mb-0" style={{ paddingLeft: '20px' }}>
                      <li>Illegal drugs and narcotics</li>
                      <li>Weapons and ammunition</li>
                      <li>Pornographic materials</li>
                      <li>Counterfeit goods</li>
                      <li>Endangered species and products</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={() => setStep(2)}>
                  Continue
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Currency Declaration */}
        {step === 2 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h3 className="mb-4">Currency Declaration</h3>

              <div>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <Checkbox
                    id="currency"
                    checked={hasCurrency}
                    onChange={(e) => setHasCurrency(e.target.checked)}
                  />
                  <div className="flex-grow-1">
                    <Label htmlFor="currency" style={{ cursor: 'pointer' }}>
                      I am carrying currency exceeding USD $10,000 (or equivalent)
                    </Label>
                    <p className="small text-muted mt-1 mb-0">
                      Indonesian law requires declaration of cash amounts over $10,000 USD or equivalent
                    </p>
                  </div>
                </div>

                {hasCurrency && (
                  <div className="ms-5 mb-4">
                    <div className="mb-3">
                      <Label htmlFor="currencyAmount">Total Amount (USD)</Label>
                      <Input
                        id="currencyAmount"
                        type="number"
                        value={currencyAmount}
                        onChange={(e) => setCurrencyAmount(e.target.value)}
                        placeholder="Enter amount in USD"
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-warning bg-opacity-10 border border-warning rounded p-3">
                      <p className="small text-muted mb-0">
                        You will need to provide documentation for the source of funds. This may include 
                        bank statements or other proof of legitimate origin.
                      </p>
                    </div>
                  </div>
                )}

                {/* Family Group Declaration */}
                {travelers.length > 1 && (
                  <div className="border-top pt-4">
                    <div className="d-flex align-items-start gap-3">
                      <Checkbox
                        id="family"
                        checked={familyDeclaration}
                        onChange={(e) => setFamilyDeclaration(e.target.checked)}
                      />
                      <div>
                        <Label htmlFor="family" style={{ cursor: 'pointer' }}>
                          This is a family group declaration
                        </Label>
                        <p className="small text-muted mt-1 mb-0">
                          All {travelers.length} travelers are traveling together as a family unit
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Declaration Statement */}
                <div className="border-top pt-4">
                  <div className="bg-info bg-opacity-10 border border-info rounded p-3 mb-3">
                    <h4 className="mb-2">Customs Declaration Statement</h4>
                    <p className="small text-muted mb-0">
                      I declare that all information provided in this customs declaration is true and accurate. 
                      I understand that providing false information is a serious offense and may result in 
                      penalties, fines, or criminal prosecution. I agree to comply with all Indonesian customs 
                      laws and regulations.
                    </p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Checkbox
                      id="customs-agreed"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <Label htmlFor="customs-agreed" style={{ cursor: 'pointer' }}>
                      I agree to the above declaration and confirm that all information provided is accurate.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleComplete} disabled={!agreed}>
                  {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Complete Customs Declaration'}
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}

