import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import type { Traveler } from '../App';
import { getCountryFlagUrl } from '../App';

type HealthPassProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function HealthPass({ travelers, onUpdate, onNavigate, selectedCountry = 'Bali' }: HealthPassProps) {
  const [step, setStep] = useState(1);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [hasSymptoms, setHasSymptoms] = useState<boolean>(
    travelers[0]?.healthPassDetails?.hasSymptoms || false
  );
  const [symptoms, setSymptoms] = useState({
    fever: travelers[0]?.healthPassDetails?.symptoms?.fever || false,
    cough: travelers[0]?.healthPassDetails?.symptoms?.cough || false,
    breathing: travelers[0]?.healthPassDetails?.symptoms?.breathing || false,
    fatigue: travelers[0]?.healthPassDetails?.symptoms?.fatigue || false,
    none: travelers[0]?.healthPassDetails?.symptoms?.none !== undefined 
      ? travelers[0]?.healthPassDetails?.symptoms?.none 
      : true,
  });
  const [exposureRisk, setExposureRisk] = useState(
    travelers[0]?.healthPassDetails?.exposureRisk || 'no'
  );
  const [recentTravel, setRecentTravel] = useState(
    travelers[0]?.healthPassDetails?.recentTravel || ''
  );
  const [declared, setDeclared] = useState(false);

  const currentTraveler = travelers[currentTravelerIndex];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (symptom === 'none' && checked) {
      setSymptoms({ fever: false, cough: false, breathing: false, fatigue: false, none: true });
    } else {
      setSymptoms(prev => ({
        ...prev,
        [symptom]: checked,
        none: false,
      }));
    }
  };

  const handleComplete = () => {
    const updatedTravelers = [...travelers];
    updatedTravelers[currentTravelerIndex].entryRequirements.health = true;
    updatedTravelers[currentTravelerIndex].healthPassDetails = {
      hasSymptoms,
      symptoms,
      exposureRisk,
      recentTravel,
      declared: true,
    };
    onUpdate(updatedTravelers);

    if (currentTravelerIndex < travelers.length - 1) {
      setCurrentTravelerIndex(currentTravelerIndex + 1);
      setStep(1);
      setHasSymptoms(updatedTravelers[currentTravelerIndex + 1]?.healthPassDetails?.hasSymptoms || false);
      setSymptoms(updatedTravelers[currentTravelerIndex + 1]?.healthPassDetails?.symptoms || {
        fever: false,
        cough: false,
        breathing: false,
        fatigue: false,
        none: true,
      });
      setExposureRisk(updatedTravelers[currentTravelerIndex + 1]?.healthPassDetails?.exposureRisk || 'no');
      setRecentTravel(updatedTravelers[currentTravelerIndex + 1]?.healthPassDetails?.recentTravel || '');
      setDeclared(false);
    } else {
      setStep(3); // Show completed screen
    }
  };

  const handleContinueToInsurance = () => {
    onNavigate('insurance');
  };

  return (
    <div className="min-vh-100 pb-5">
      <div className="bg-primary text-white py-4 mb-4">
        <Container>
          <Button
            variant="link"
            onClick={() => step === 1 ? onNavigate('customs-declaration') : setStep(step - 1)}
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
            Health Pass - SATUSEHAT (SSHP)
          </h1>
          <p className="text-white mt-2 mb-0">
            {step === 3 ? 'Completed' : `Step ${step} of 2`}
          </p>
        </Container>
      </div>

      <Container>
        <div className="mb-4">
          <h2>Traveler {currentTravelerIndex + 1} of {travelers.length}</h2>
          <p className="text-muted">
            {currentTraveler?.personalDetails.firstName} {currentTraveler?.personalDetails.lastName}
          </p>
        </div>

        {/* Step 1: Health Symptom Screening */}
        {step === 1 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px',  }}>
                  <Heart style={{ width: '24px', height: '24px', color: '#dc3545' }} />
                </div>
                <div>
                  <h3 className="mb-0" style={{fontSize:"clamp(19px, 2vw, 1.45rem)"}}>Health Symptom Screening</h3>
                  <p className="text-muted small mb-0">Current health status assessment</p>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <Label className="mb-3 d-block">Do you have any of the following symptoms?</Label>
                  <div className="mb-3">
                    <RadioGroup value={hasSymptoms ? 'yes' : 'no'} onValueChange={(value) => {
                      setHasSymptoms(value === 'yes');
                      if (value === 'no') {
                        setSymptoms({ fever: false, cough: false, breathing: false, fatigue: false, none: true });
                      }
                    }}>
                      <div className="d-flex gap-4">
                        <div className="d-flex align-items-center">
                          <RadioGroupItem value="yes" id="symptoms-yes" />
                          <Label htmlFor="symptoms-yes" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Yes
                          </Label>
                        </div>
                        <div className="d-flex align-items-center">
                          <RadioGroupItem value="no" id="symptoms-no" />
                          <Label htmlFor="symptoms-no" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            No
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  {hasSymptoms && (
                    <div>
                      <Label className="mb-3 d-block">Please select which symptoms you are experiencing:</Label>
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <Checkbox
                            id="fever"
                            checked={symptoms.fever}
                            onChange={(e) => handleSymptomChange('fever', e.target.checked)}
                          />
                          <Label htmlFor="fever" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Fever (temperature above 38°C / 100.4°F)
                          </Label>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Checkbox
                            id="cough"
                            checked={symptoms.cough}
                            onChange={(e) => handleSymptomChange('cough', e.target.checked)}
                          />
                          <Label htmlFor="cough" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Persistent cough or sore throat
                          </Label>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Checkbox
                            id="breathing"
                            checked={symptoms.breathing}
                            onChange={(e) => handleSymptomChange('breathing', e.target.checked)}
                          />
                          <Label htmlFor="breathing" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Difficulty breathing or shortness of breath
                          </Label>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Checkbox
                            id="fatigue"
                            checked={symptoms.fatigue}
                            onChange={(e) => handleSymptomChange('fatigue', e.target.checked)}
                          />
                          <Label htmlFor="fatigue" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            Unusual fatigue or body aches
                          </Label>
                        </div>
                        <div className="d-flex align-items-center pt-2 border-top">
                          <Checkbox
                            id="none"
                            checked={symptoms.none}
                            onChange={(e) => handleSymptomChange('none', e.target.checked)}
                          />
                          <Label htmlFor="none" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                            None of the above - I am in good health
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-info bg-opacity-10 border border-info rounded p-3">
                  <h4 className="mb-2">SATUSEHAT Health Pass Information</h4>
                  <p className="small text-muted mb-0">
                    The SATUSEHAT (SSHP) is Indonesia's integrated health surveillance system. This declaration 
                    helps protect public health and ensures a safe travel environment for all visitors and residents.
                  </p>
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

        {/* Step 2: Exposure Risk Assessment */}
        {step === 2 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <h3 className="mb-4">Exposure Risk Assessment</h3>

              <div>
                <div className="mb-4">
                  <Label className="mb-3 d-block">
                    In the past 14 days, have you had close contact with anyone confirmed to have a contagious disease?
                  </Label>
                  <RadioGroup value={exposureRisk} onValueChange={setExposureRisk}>
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <RadioGroupItem value="no" id="exposure-no" />
                        <Label htmlFor="exposure-no" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                          No, I have not had any such contact
                        </Label>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <RadioGroupItem value="yes" id="exposure-yes" />
                        <Label htmlFor="exposure-yes" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                          Yes, I have had contact with someone who was sick
                        </Label>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <RadioGroupItem value="unsure" id="exposure-unsure" />
                        <Label htmlFor="exposure-unsure" className="mb-0 ms-2" style={{ cursor: 'pointer' }}>
                          I'm not sure
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {exposureRisk === 'yes' && (
                  <div className="bg-danger bg-opacity-10 border border-danger rounded p-3 mb-4">
                    <h4 className="mb-2 text-danger">Additional Screening Required</h4>
                    <p className="small text-muted mb-0">
                      You may be subject to additional health screening and monitoring upon arrival. Please have 
                      documentation of your exposure and any medical consultations available.
                    </p>
                  </div>
                )}

                <div className="border-top pt-4">
                  <div className="bg-success bg-opacity-10 border border-success rounded p-3 mb-3">
                    <h4 className="mb-2">Health Declaration Statement</h4>
                    <p className="small text-muted mb-0">
                      I certify that the health information provided is true and accurate to the best of my knowledge. 
                      I understand that providing false health information may result in denial of entry, quarantine, 
                      or other legal consequences. I agree to comply with all health protocols and regulations during my stay.
                    </p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Checkbox
                      id="health-declared"
                      checked={declared}
                      onChange={(e) => setDeclared(e.target.checked)}
                    />
                    <Label htmlFor="health-declared" style={{ cursor: 'pointer' }}>
                      I declare that all health information provided is accurate and complete.
                    </Label>
                  </div>
                </div>

                {currentTraveler?.isMinor && (
                  <div className="bg-info bg-opacity-10 border border-info rounded p-3 mt-4">
                    <p className="small text-muted mb-0">
                      <strong>Minor Health Declaration:</strong> This health declaration has been completed by a 
                      parent or legal guardian on behalf of the minor traveler.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <Button onClick={handleComplete} disabled={!declared}>
                  {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Confirm Health Pass'}
                  <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Completed Screen */}
        {step === 3 && (
          <Card style={{ borderWidth: '2px', borderColor: 'var(--success)' }} className="border-success">
            <CardContent className="pt-4 text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                <CheckCircle2 style={{ width: '48px', height: '48px', color: 'var(--success)' }} />
              </div>
              <h2 className="mb-3 text-success">Health Pass Completed!</h2>
              <p className="text-muted mb-4">
                All travelers have completed the Health Pass - SATUSEHAT (SSHP) declaration. 
                You can now proceed to the Insurance page.
              </p>
              <Button onClick={handleContinueToInsurance} size="lg">
                Continue to Insurance
                <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}
