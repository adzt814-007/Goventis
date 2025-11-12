import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Bell,
  Globe,
  Edit2,
  Save,
  ChevronDown
} from 'lucide-react';
import type { User as UserType } from '../App';
import { getCountryFlagUrl } from '../App';

type ProfileProps = {
  user: UserType | null;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

// Custom Toggle Switch Component
function ToggleSwitch({ checked, onChange, id }: { checked: boolean; onChange: (checked: boolean) => void; id: string }) {
  return (
    <div 
      className="form-check form-switch"
      style={{ margin: 0 }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: '3rem',
          height: '1.5rem',
          cursor: 'pointer',
          backgroundColor: checked ? 'var(--primary)' : '#6c757d',
          borderColor: checked ? 'var(--primary)' : '#6c757d',
        }}
      />
    </div>
  );
}

const NATIONALITIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Portugal',
  'Greece',
  'Ireland',
  'New Zealand',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Singapore',
  'Malaysia',
  'Thailand',
  'Philippines',
  'Indonesia',
  'Vietnam',
  'Brazil',
  'Argentina',
  'Mexico',
  'Chile',
  'Colombia',
  'South Africa',
  'Egypt',
  'Turkey',
  'Israel',
  'United Arab Emirates',
  'Saudi Arabia',
  'Russia',
  'Ukraine',
  'Czech Republic',
  'Hungary',
  'Romania',
  'Bulgaria',
  'Croatia',
  'Serbia',
  'Other'
];

export function Profile({ user, onNavigate, onLogout, currentPage, selectedCountry = 'Bali', onCountryChange }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    dateOfBirth: '1985-03-15',
    nationality: 'United States',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [marketingCommunications, setMarketingCommunications] = useState(false);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const nationalityDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nationalityDropdownRef.current && !nationalityDropdownRef.current.contains(event.target as Node)) {
        setShowNationalityDropdown(false);
      }
    };

    if (showNationalityDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNationalityDropdown]);

  const handleNationalitySelect = (nationality: string) => {
    setProfileData({ ...profileData, nationality });
    setShowNationalityDropdown(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, would save to backend
  };

  return (
    <div className="min-vh-100 ">
      <NavBar onNavigate={onNavigate} user={user} onLogout={onLogout} currentPage={currentPage} selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      <div className="bg-primary text-white py-4 mb-4" style={{ background: 'linear-gradient(to right, var(--primary), var(--ocean-blue))' }}>
        <Container>
          <h1 className="text-white mb-2 d-flex align-items-center gap-2">
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
            My Profile
          </h1>
          <p className="text-white mb-0">Manage your account settings and preferences</p>
        </Container>
      </div>

      <Container>
        {/* Profile Header */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-md-flex align-items-start justify-content-between ">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '80px', height: '80px', background: 'linear-gradient(to bottom right, var(--primary), var(--ocean-blue))' }}>
                  <User style={{ width: '40px', height: '40px' }} />
                </div>
                <div>
                  <h2 className="mb-1">{profileData.name}</h2>
                  <p className="text-muted mb-0">{profileData.email}</p>
                  <Badge bg="success" className="mt-2 p-2">Account Verified</Badge>
                </div>
              </div>
              <div className="mt-3 mt-md-0 d-flex justify-content-end">
              <Button
                variant={isEditing ? 'default' : 'outline'}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                style={isEditing ? { 
                  backgroundColor: 'var(--primary)', 
                  borderColor: 'var(--primary)', 
                  color: '#fff' 
                } : { 
                  color: 'var(--primary)', 
                  borderColor: 'var(--primary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }
                }}
              >
                {isEditing ? (
                  <>
                    <Save style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Edit Profile
                  </>
                )}
              </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-4">Personal Information
              
            </h3>
            
            <div>
              <Row className="g-3 mb-3">
                <Col sm={6}>
                  <Label htmlFor="name" className="d-flex align-items-center gap-2">
                    <User style={{ width: '16px', height: '16px' }} />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </Col>
                <Col sm={6}>
                  <Label htmlFor="email" className="d-flex align-items-center gap-2">
                    <Mail style={{ width: '16px', height: '16px' }} />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </Col>
              </Row>

              <Row className="g-3 mb-3">
                <Col sm={6}>
                  <Label htmlFor="phone" className="d-flex align-items-center gap-2">
                    <Phone style={{ width: '16px', height: '16px' }} />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </Col>
                <Col sm={6}>
                  <Label htmlFor="dateOfBirth" className="d-flex align-items-center gap-2">
                    <Calendar style={{ width: '16px', height: '16px' }} />
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </Col>
              </Row>

              <Row className="g-3">
                <Col sm={6}>
                  <Label htmlFor="nationality" className="d-flex align-items-center gap-2">
                    <Globe style={{ width: '16px', height: '16px' }} />
                    Nationality
                  </Label>
                  <div className="position-relative mt-2" ref={nationalityDropdownRef}>
                    <button
                      type="button"
                      onClick={() => isEditing && setShowNationalityDropdown(!showNationalityDropdown)}
                      disabled={!isEditing}
                      className="w-100 d-flex align-items-center justify-content-between border rounded"
                      style={{
                        borderColor: !isEditing ? '#e9ecef' : 'var(--primary)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        cursor: isEditing ? 'pointer' : 'not-allowed',
                        backgroundColor: !isEditing ? '#e9ecef' : '#fff',
                        color: !isEditing ? '#212529' : 'var(--foreground)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (isEditing) {
                          e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--primary-hover)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isEditing) {
                          e.currentTarget.style.backgroundColor = '#fff';
                          e.currentTarget.style.borderColor = 'var(--primary)';
                        }
                      }}
                    >
                      <span>{profileData.nationality}</span>
                      <ChevronDown 
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          transform: showNationalityDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          opacity: isEditing ? 1 : 0.5
                        }} 
                      />
                    </button>
                    
                    {showNationalityDropdown && isEditing && (
                      <div
                        className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg w-100"
                        style={{
                          maxHeight: '300px',
                          overflowY: 'auto',
                          zIndex: 1000,
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        {NATIONALITIES.map((nationality) => (
                          <button
                            key={nationality}
                            type="button"
                            onClick={() => handleNationalitySelect(nationality)}
                            className={`w-100 d-flex align-items-center gap-2 border-0 text-start p-2 ${
                              nationality === profileData.nationality ? 'bg-primary bg-opacity-10' : ''
                            }`}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: nationality === profileData.nationality ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                              color: nationality === profileData.nationality ? '#FFF' : 'var(--foreground)',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (nationality !== profileData.nationality) {
                                e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (nationality !== profileData.nationality) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <span>{nationality}</span>
                            {nationality === profileData.nationality && (
                              <span className="ms-auto text-primary">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={6}>
                  <Label htmlFor="address" className="d-flex align-items-center gap-2">
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    Home Address
                  </Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </Col>
              </Row>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Shield style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
              <h3 className="mb-0">Security Settings</h3>
            </div>
            
            <div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div>
                  <p className="mb-0">Password</p>
                  <p className="small text-muted mb-0">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div>
                  <p className="mb-0">Two-Factor Authentication</p>
                  <p className="small text-muted mb-0">Add an extra layer of security</p>
                </div>
                <ToggleSwitch 
                  checked={twoFactorEnabled} 
                  onChange={setTwoFactorEnabled}
                  id="twoFactorToggle"
                />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                <div>
                  <p className="mb-0">Login History</p>
                  <p className="small text-muted mb-0">View your recent login activity</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Bell style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
              <h3 className="mb-0">Notification Preferences</h3>
            </div>
            
            <div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div>
                  <p className="mb-0">Email Notifications</p>
                  <p className="small text-muted mb-0">Receive updates about your trips</p>
                </div>
                <ToggleSwitch 
                  checked={emailNotifications} 
                  onChange={setEmailNotifications}
                  id="emailNotificationsToggle"
                />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
                <div>
                  <p className="mb-0">SMS Notifications</p>
                  <p className="small text-muted mb-0">Get text messages for important updates</p>
                </div>
                <ToggleSwitch 
                  checked={smsNotifications} 
                  onChange={setSmsNotifications}
                  id="smsNotificationsToggle"
                />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                <div>
                  <p className="mb-0">Marketing Communications</p>
                  <p className="small text-muted mb-0">Special offers and travel tips</p>
                </div>
                <ToggleSwitch 
                  checked={marketingCommunications} 
                  onChange={setMarketingCommunications}
                  id="marketingCommunicationsToggle"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel History */}
        <Card style={{ borderWidth: '2px' }} className="mb-4">
          <CardContent className="pt-4">
            <h3 className="mb-4">Travel History</h3>
            
            <div>
              <div className="p-3 bg-info bg-opacity-10 border border-info rounded mb-2">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <p className="mb-0">{selectedCountry}</p>
                  <Badge bg="primary" className="p-2">Current Trip</Badge>
                </div>
                <p className="small text-muted mb-0">November 15 - November 25, 2025</p>
              </div>

              <div className="p-3 bg-light rounded">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <p className="mb-0">No previous trips</p>
                  <Badge variant="outline">History</Badge>
                </div>
                <p className="small text-muted mb-0">Your past trips will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3">
          <Button
            onClick={() => onNavigate('dashboard')}
            className="flex-grow-1"
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            className="flex-grow-1"
            onClick={() => {
              onLogout();
            }}
          >
            Log Out
          </Button>
        </div>
      </Container>
      <Footer selectedCountry={selectedCountry} />
    </div>
  );
}
