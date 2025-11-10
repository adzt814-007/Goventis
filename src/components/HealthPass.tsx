import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import type { Traveler } from '../App';

type HealthPassProps = {
  travelers: Traveler[];
  onUpdate: (travelers: Traveler[]) => void;
  onNavigate: (page: string) => void;
};

export function HealthPass({ travelers, onUpdate, onNavigate }: HealthPassProps) {
  const [step, setStep] = useState(1);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const [symptoms, setSymptoms] = useState({
    fever: false,
    cough: false,
    breathing: false,
    fatigue: false,
    none: true,
  });
  const [exposureRisk, setExposureRisk] = useState('no');
  const [recentTravel, setRecentTravel] = useState('');

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
    onUpdate(updatedTravelers);

    if (currentTravelerIndex < travelers.length - 1) {
      setCurrentTravelerIndex(currentTravelerIndex + 1);
      setStep(1);
      setSymptoms({ fever: false, cough: false, breathing: false, fatigue: false, none: true });
      setExposureRisk('no');
    } else {
      onNavigate('insurance');
    }
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
          <h1 className="text-white mb-0">Health Pass - SATUSEHAT (SSHP)</h1>
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

        {/* Step 1: Health Symptom Screening */}
        {step === 1 && (
          <Card style={{ borderWidth: '2px' }}>
            <CardContent className="pt-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px',  }}>
                  <Heart style={{ width: '24px', height: '24px', color: '#dc3545' }} />
                </div>
                <div>
                  <h3 className="mb-0">Health Symptom Screening</h3>
                  <p className="text-muted small mb-0">Current health status assessment</p>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <Label className="mb-3 d-block">Are you currently experiencing any of the following symptoms?</Label>
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

                {!symptoms.none && (
                  <div className="bg-warning bg-opacity-10 border border-warning rounded p-3 mb-4">
                    <h4 className="mb-2 text-warning">Medical Attention Recommended</h4>
                    <p className="small text-muted mb-0">
                      If you are experiencing any of these symptoms, we recommend consulting with a healthcare 
                      professional before traveling. You may be subject to additional health screening upon arrival.
                    </p>
                  </div>
                )}

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
                  <div className="bg-success bg-opacity-10 border border-success rounded p-3">
                    <h4 className="mb-2">Health Declaration Statement</h4>
                    <p className="small text-muted mb-0">
                      I certify that the health information provided is true and accurate to the best of my knowledge. 
                      I understand that providing false health information may result in denial of entry, quarantine, 
                      or other legal consequences. I agree to comply with all health protocols and regulations during my stay.
                    </p>
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
                <Button onClick={handleComplete}>
                  {currentTravelerIndex < travelers.length - 1 ? 'Next Traveler' : 'Complete Health Pass'}
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
