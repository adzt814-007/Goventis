import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Home, Plane, UserCircle, LogOut, LogIn, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { COUNTRIES, getCountryFlagUrl } from '../App';

type NavBarProps = {
  onNavigate: (page: string) => void;
  variant?: 'light' | 'dark';
  user?: { email: string; name: string } | null;
  onLogout?: () => void;
  showLogin?: boolean;
  currentPage?: string;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
};

export function NavBar({ onNavigate, variant = 'light', user, onLogout, showLogin = false, currentPage, selectedCountry = 'Bali', onCountryChange }: NavBarProps) {
  const isDark = variant === 'dark';
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (page: string) => currentPage === page;
  
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  
  const handleNavClick = (page: string) => {
    onNavigate(page);
    handleCloseOffcanvas();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleCountrySelect = (country: string) => {
    onCountryChange?.(country);
    setShowDropdown(false);
  };
  
  return (
    <Navbar 
      expand="lg" 
      bg="white"
      className="sticky-top shadow-sm"
      style={{ 
        zIndex: 1030,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem'
      }}
    >
      <Container fluid="lg">
        <Navbar.Brand 
          className="d-flex align-items-center gap-2 text-primary fw-bold" 
          style={{ 
            fontSize: '1.125rem',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate(user ? 'dashboard' : 'welcome')}
        >
          <div 
            className="bg-primary rounded d-flex align-items-center justify-content-center text-white shadow-sm" 
            style={{ 
              width: '44px', 
              height: '44px',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Plane style={{ width: '24px', height: '24px' }} />
          </div>
          <span className="d-none d-md-inline" style={{ letterSpacing: '-0.01em' }}>
            {selectedCountry} Tourism Portal
          </span>
          <span className="d-inline d-md-none" style={{ letterSpacing: '-0.01em' }}>
            {selectedCountry} Tourism Portal
          </span>
        </Navbar.Brand>
        
        <Button
          variant="link"
          onClick={handleShowOffcanvas}
          className="d-lg-none border-0 p-2"
          style={{
            color: 'var(--primary)',
            padding: '0.25rem 0.5rem'
          }}
        >
          <Menu style={{ width: '24px', height: '24px' }} />
        </Button>
        
        {/* <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="d-none d-lg-block"
          style={{ border: 'none', padding: '0.25rem 0.5rem' }}
        /> */}
        
        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-block">
          <Nav className="ms-auto d-flex align-items-center" style={{ gap: '0.5rem' }}>
            {/* Country Dropdown */}
            <div className="d-flex align-items-center gap-2 me-3 position-relative" ref={dropdownRef}>
              <Globe style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
              <div className="position-relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="d-flex align-items-center gap-2 border rounded "
                  style={{
                    borderColor: 'var(--primary)',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.875rem',
                    minWidth: '180px',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    color: 'var(--foreground)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                    e.currentTarget.style.borderColor = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                >
                  <img 
                    src={getCountryFlagUrl(selectedCountry, 'w40')}
                    alt={`${selectedCountry} flag`}
                    style={{ 
                      width: '24px', 
                      height: '18px', 
                      objectFit: 'cover',
                      borderRadius: '2px',
                      border: '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="flex-grow-1 text-start">{selectedCountry}</span>
                  <ChevronDown 
                    style={{ 
                      width: '16px', 
                      height: '16px',
                      transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </button>
                
                {showDropdown && (
                  <div
                    className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                    style={{
                      minWidth: '180px',
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
                        onClick={() => handleCountrySelect(country)}
                        className={`w-100 d-flex align-items-center gap-2 border-0 text-start p-2 ${
                          country === selectedCountry ? 'bg-primary bg-opacity-10' : ''
                        }`}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: country === selectedCountry ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                          color: country === selectedCountry ? 'white' : 'var(--foreground)',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (country !== selectedCountry) {
                            e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (country !== selectedCountry) {
                            e.currentTarget.style.backgroundColor = 'transparent';
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
                        {country === selectedCountry && (
                          <span className="ms-auto text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {!user ? (
              showLogin ? (
                <Button 
                  variant="default"
                  size="sm" 
                  onClick={() => onNavigate('login')}
                  className="px-3 py-2"
                  style={{
                    borderRadius: '6px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    backgroundColor: 'var(--primary)',
                    borderColor: 'var(--primary)',
                    color: '#fff'
                  }}
                >
                  <LogIn style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                  Login
                </Button>
              ) : null
            ) : (
              <>
            <Button 
                  variant="link" 
              size="sm" 
              onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-2 text-decoration-none ${
                    isActive('dashboard') 
                      ? 'text-primary fw-semibold' 
                      : 'text-muted'
                  }`}
                  style={{
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('dashboard')) {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('dashboard')) {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                >
                  <Home style={{ width: '18px', height: '18px', marginRight: '6px' }} />
                  <span className="d-none d-sm-inline">Home</span>
                  {isActive('dashboard') && (
                    <span 
                      className="position-absolute bottom-0 start-50 translate-middle-x bg-primary"
                      style={{
                        width: '24px',
                        height: '2px',
                        borderRadius: '2px'
                      }}
                    />
                  )}
            </Button>
                
            <Button 
                  variant="link" 
              size="sm" 
              onClick={() => onNavigate('my-trip')}
                  className={`px-3 py-2 text-decoration-none ${
                    isActive('my-trip') 
                      ? 'text-primary fw-semibold' 
                      : 'text-muted'
                  }`}
                  style={{
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('my-trip')) {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('my-trip')) {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                >
                  <Plane style={{ width: '18px', height: '18px', marginRight: '6px' }} />
                  <span className="d-none d-sm-inline">My Trip</span>
                  {isActive('my-trip') && (
                    <span 
                      className="position-absolute bottom-0 start-50 translate-middle-x bg-primary"
                      style={{
                        width: '24px',
                        height: '2px',
                        borderRadius: '2px'
                      }}
                    />
                  )}
            </Button>
                
            <Button 
                  variant="link" 
              size="sm" 
              onClick={() => onNavigate('profile')}
                  className={`px-3 py-2 text-decoration-none ${
                    isActive('profile') 
                      ? 'text-primary fw-semibold' 
                      : 'text-muted'
                  }`}
                  style={{
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('profile')) {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('profile')) {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                >
                  <UserCircle style={{ width: '18px', height: '18px', marginRight: '6px' }} />
                  <span className="d-none d-sm-inline">Profile</span>
                  {isActive('profile') && (
                    <span 
                      className="position-absolute bottom-0 start-50 translate-middle-x bg-primary"
                      style={{
                        width: '24px',
                        height: '2px',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </Button>
                
                {onLogout ? (
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={onLogout}
                    className="px-3 py-2 text-decoration-none text-muted"
                    style={{
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#dc3545';
                      e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <LogOut style={{ width: '18px', height: '18px', marginRight: '6px' }} />
                    <span className="d-none d-sm-inline">Log Out</span>
            </Button>
                ) : (
            <Button 
                    variant="link" 
              size="sm" 
              onClick={() => onNavigate('welcome')}
                    className="px-3 py-2 text-decoration-none text-muted"
                    style={{
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#dc3545';
                      e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <LogOut style={{ width: '18px', height: '18px', marginRight: '6px' }} />
                    <span className="d-none d-sm-inline">Log Out</span>
            </Button>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      {/* Off-canvas Sidebar for Mobile */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={handleCloseOffcanvas} 
        placement="end"
        style={{ width: '280px' }}
      >
        <Offcanvas.Header 
          style={{ 
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}
        >
          <Offcanvas.Title className="d-flex align-items-center gap-2 text-primary fw-bold">
            <div 
              className="bg-primary rounded d-flex align-items-center justify-content-center text-white shadow-sm" 
              style={{ 
                width: '44px', 
                height: '44px'
              }}
            >
              <Plane style={{ width: '24px', height: '24px' }} />
            </div>
            <span style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
              {selectedCountry}
            </span>
          </Offcanvas.Title>
          <Button
            variant="link"
            onClick={handleCloseOffcanvas}
            className="ms-auto p-0"
            style={{ color: 'var(--foreground)' }}
          >
            <X style={{ width: '24px', height: '24px' }} />
          </Button>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="p-0 d-flex flex-column">
          {/* Country Selector */}
          <div className="px-3 mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Globe style={{ width: '20px', height: '20px', color: '#0d9488' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Location</span>
            </div>
            <div className="position-relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-100 d-flex align-items-center gap-2 border rounded"
                style={{
                  borderColor: '#0d9488',
                  borderRadius: '6px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  color: '#0f172a',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                <img 
                  src={getCountryFlagUrl(selectedCountry, 'w40')}
                  alt={`${selectedCountry} flag`}
                  style={{ 
                    width: '24px', 
                    height: '18px', 
                    objectFit: 'cover',
                    borderRadius: '2px',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="flex-grow-1 text-start">{selectedCountry}</span>
                <ChevronDown 
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} 
                />
              </button>
              
              {showDropdown && (
                <div
                  className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg w-100"
                  style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    borderColor: 'rgba(15, 23, 42, 0.1)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-100 d-flex align-items-center gap-2 border-0 text-start p-2"
                      style={{
                        cursor: 'pointer',
                        backgroundColor: country === selectedCountry ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        color: '#0f172a',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (country !== selectedCountry) {
                          e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (country !== selectedCountry) {
                          e.currentTarget.style.backgroundColor = country === selectedCountry ? 'rgba(13, 148, 136, 0.1)' : 'transparent';
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
                      {country === selectedCountry && (
                        <span className="ms-auto" style={{ color: '#0d9488' }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-grow-1">
            {!user ? (
              showLogin ? (
                <div className="px-3">
                  <Button 
                    variant="default"
                    size="sm" 
                    onClick={() => handleNavClick('login')}
                    className="w-100"
                    style={{
                      borderRadius: '6px',
                      fontWeight: 500,
                      backgroundColor: '#0d9488',
                      borderColor: '#0d9488',
                      color: '#fff'
                    }}
                  >
                    <LogIn style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                    Login
                  </Button>
                </div>
              ) : null
            ) : (
              <>
                <div 
                  className="px-3 py-2 d-flex align-items-center gap-3"
                  onClick={() => handleNavClick('dashboard')}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isActive('dashboard') ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderLeft: isActive('dashboard') ? '3px solid #0d9488' : '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('dashboard')) {
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('dashboard')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Home 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: isActive('dashboard') ? '#0d9488' : '#64748b'
                    }} 
                  />
                  <span style={{ 
                    fontSize: '1rem',
                    fontWeight: isActive('dashboard') ? 600 : 400,
                    color: isActive('dashboard') ? '#0d9488' : '#0f172a'
                  }}>
                    Home
                  </span>
                </div>
                
                <div 
                  className="px-3 py-2 d-flex align-items-center gap-3"
                  onClick={() => handleNavClick('my-trip')}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isActive('my-trip') ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderLeft: isActive('my-trip') ? '3px solid #0d9488' : '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('my-trip')) {
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('my-trip')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Plane 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: isActive('my-trip') ? '#0d9488' : '#64748b'
                    }} 
                  />
                  <span style={{ 
                    fontSize: '1rem',
                    fontWeight: isActive('my-trip') ? 600 : 400,
                    color: isActive('my-trip') ? '#0d9488' : '#0f172a'
                  }}>
                    My Trip
                  </span>
                </div>
                
                <div 
                  className="px-3 py-2 d-flex align-items-center gap-3"
                  onClick={() => handleNavClick('profile')}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isActive('profile') ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderLeft: isActive('profile') ? '3px solid #0d9488' : '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('profile')) {
                      e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('profile')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <UserCircle 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: isActive('profile') ? '#0d9488' : '#64748b'
                    }} 
                  />
                  <span style={{ 
                    fontSize: '1rem',
                    fontWeight: isActive('profile') ? 600 : 400,
                    color: isActive('profile') ? '#0d9488' : '#0f172a'
                  }}>
                    Profile
                  </span>
                </div>
                
                {onLogout && (
                  <div 
                    className="px-3 py-2 d-flex align-items-center gap-3"
                    onClick={() => {
                      onLogout();
                      handleCloseOffcanvas();
                    }}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <LogOut 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        color: '#64748b'
                      }} 
                    />
                    <span style={{ 
                      fontSize: '1rem',
                      color: '#0f172a'
                    }}>
                      Log Out
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
