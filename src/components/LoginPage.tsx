import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import type { User } from "../App";
import { getCountryFlagUrl } from "../App";

type LoginPageProps = {
  onNavigate: (page: string) => void;
  onLogin: (user: User) => void;
  selectedCountry?: string;
};

export function LoginPage({ onNavigate, onLogin, selectedCountry = 'Bali' }: LoginPageProps) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInCaptcha, setSignInCaptcha] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [signUpCaptcha, setSignUpCaptcha] = useState(false);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (signInEmail && signInPassword && signInCaptcha) {
      onLogin({ email: signInEmail, name: signInEmail.split("@")[0] });
      onNavigate("dashboard");
    } else if (!signInCaptcha) {
      alert("Please complete the reCAPTCHA verification");
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (signUpEmail && signUpPassword && signUpPasswordConfirm && signUpCaptcha) {
      if (signUpPassword !== signUpPasswordConfirm) {
        alert("Passwords do not match!");
        return;
      }
      onLogin({ email: signUpEmail, name: signUpEmail.split("@")[0] });
      onNavigate("dashboard");
    } else if (!signUpCaptcha) {
      alert("Please complete the reCAPTCHA verification");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-2 px-md-4 pt-2 pt-md-3 pb-3 pb-md-4" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f8f9fa' }}>
      <Container className="max-w-4xl w-100">
        <Button
          variant="link"
          onClick={() => onNavigate("welcome")}
          className="mb-2 mb-md-4 text-muted text-decoration-none p-0 d-flex align-items-center"
          style={{ textDecoration: 'none', fontSize: '16px' }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Back to Home
        </Button>

        {/* Mobile View - Tab Based */}
        <div className="d-md-none bg-white w-100 mx-auto" style={{
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          maxWidth: '100%'
        }}>
          {/* Mobile Tabs */}
          <div className="d-flex border-bottom" style={{ borderColor: '#e5e7eb' }}>
            <button
              type="button"
              onClick={() => setIsRightPanelActive(false)}
              className="flex-fill py-3 border-0 bg-transparent fw-semibold"
              style={{
                color: !isRightPanelActive ? 'var(--primary)' : '#64748b',
                borderBottom: !isRightPanelActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-bottom-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                fontSize: '15px',
                letterSpacing: '0.3px'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRightPanelActive(true)}
              className="flex-fill py-3 border-0 bg-transparent fw-semibold"
              style={{
                color: isRightPanelActive ? 'var(--primary)' : '#64748b',
                borderBottom: isRightPanelActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-bottom-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                fontSize: '15px',
                letterSpacing: '0.3px'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Forms Container */}
          <div className="position-relative" style={{ minHeight: '470px' }}>
            {/* Mobile Sign In Form */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                opacity: !isRightPanelActive ? 1 : 0,
                transform: !isRightPanelActive ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: !isRightPanelActive ? 'auto' : 'none',
                zIndex: !isRightPanelActive ? 1 : 0
              }}
            >
              <Form
                onSubmit={handleSignInSubmit}
                className="bg-white d-flex align-items-center justify-content-center flex-column px-3 px-sm-4 py-4 text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <img 
                    src={getCountryFlagUrl(selectedCountry, 'w40')}
                    alt={`${selectedCountry} flag`}
                    style={{ 
                      width: '28px', 
                      height: '21px', 
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <h1 className="fw-bold m-0" style={{ fontSize: '24px', lineHeight: '1.3' }}>Sign in</h1>
                </div>
                <div className="my-2 mb-3 d-flex justify-content-center align-items-center gap-2">
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    style={{

                    }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/facebook.png', import.meta.url).href} alt="Facebook" />
                  </a>
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    // style={{ 
                    //   width: '40px', 
                    //   height: '40px',
                    //   borderColor: '#DDDDDD',
                    //   transition: 'all 0.2s ease'
                    // }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/google.png', import.meta.url).href} alt="Google" />

                  </a>
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    // style={{ 
                    //   width: '40px', 
                    //   height: '40px',
                    //   borderColor: '#DDDDDD',
                    //   transition: 'all 0.2s ease'
                    // }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/Linkedin.png', import.meta.url).href} alt="Google" />

                  </a>
                </div>
                <span className="text-muted mb-3" style={{ fontSize: '13px' }}>or use your account</span>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                  className="mb-3 w-100"
                  style={{
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '16px', // Prevents zoom on iOS
                    minHeight: '48px'
                  }}
                />
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                  className="mb-3 w-100"
                  style={{
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '16px', // Prevents zoom on iOS
                    minHeight: '48px'
                  }}
                />
                <a
                  href="#"
                  className="text-primary text-decoration-none mb-3"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    transition: 'all 0.2s ease',
                    fontSize: '13px',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  Forgot your password?
                </a>
                {/* CAPTCHA Checkbox */}
                <div className="mb-3 w-100 d-flex align-items-center justify-content-start" style={{ paddingLeft: '4px' }}>
                  <input
                    type="checkbox"
                    id="signInCaptchaMobile"
                    checked={signInCaptcha}
                    onChange={(e) => setSignInCaptcha(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      accentColor: 'var(--primary)'
                    }}
                  />
                  <label
                    htmlFor="signInCaptchaMobile"
                    style={{
                      fontSize: '13px',
                      color: '#64748b',
                      cursor: 'pointer',
                      margin: 0,
                      userSelect: 'none'
                    }}
                  >
                    reCAPTCHA
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-pill border text-white fw-bold py-3 px-4 text-uppercase mt-2 w-100"
                  style={{
                    borderColor: 'var(--primary)',
                    backgroundColor: 'var(--primary)',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    minHeight: '48px', // Touch-friendly size
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    e.currentTarget.style.borderColor = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Sign In
                </button>
              </Form>
            </div>

            {/* Mobile Sign Up Form */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                opacity: isRightPanelActive ? 1 : 0,
                transform: isRightPanelActive ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isRightPanelActive ? 'auto' : 'none',
                zIndex: isRightPanelActive ? 1 : 0
              }}
            >
              <Form
                onSubmit={handleSignUpSubmit}
                className="bg-white d-flex align-items-center justify-content-center flex-column px-3 px-sm-4 py-4 text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <img 
                    src={getCountryFlagUrl(selectedCountry, 'w40')}
                    alt={`${selectedCountry} flag`}
                    style={{ 
                      width: '28px', 
                      height: '21px', 
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <h1 className="fw-bold m-0" style={{ fontSize: '24px', lineHeight: '1.3' }}>Create Account</h1>
                </div>
                <div className="my-2 mb-3">
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderColor: '#DDDDDD',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/facebook.png', import.meta.url).href} alt="Google" />

                  </a>
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderColor: '#DDDDDD',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/google.png', import.meta.url).href} alt="Google" />

                  </a>
                  <a
                    href="#"
                    className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderColor: '#DDDDDD',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#DDDDDD';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <img src={new URL('../Images/Linkedin.png', import.meta.url).href} alt="Google" />

                  </a>
                </div>
                <span className="text-muted mb-3" style={{ fontSize: '13px' }}>or use your email for registration</span>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  className="mb-3 w-100"
                  style={{
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '16px', // Prevents zoom on iOS
                    minHeight: '48px'
                  }}
                />
                <Form.Control
                  type="password"
                  placeholder="Create Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  className="mb-3 w-100"
                  style={{
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '16px', // Prevents zoom on iOS
                    minHeight: '48px'
                  }}
                />
                <Form.Control
                  type="password"
                  placeholder="Re-type Password"
                  value={signUpPasswordConfirm}
                  onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                  required
                  className="mb-3 w-100"
                  style={{
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '16px', // Prevents zoom on iOS
                    minHeight: '48px'
                  }}
                />
                {/* CAPTCHA Checkbox */}
                <div className="mb-3 w-100 d-flex align-items-center justify-content-start" style={{ paddingLeft: '4px' }}>
                  <input
                    type="checkbox"
                    id="signUpCaptchaMobile"
                    checked={signUpCaptcha}
                    onChange={(e) => setSignUpCaptcha(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      accentColor: 'var(--primary)'
                    }}
                  />
                  <label
                    htmlFor="signUpCaptchaMobile"
                    style={{
                      fontSize: '13px',
                      color: '#64748b',
                      cursor: 'pointer',
                      margin: 0,
                      userSelect: 'none'
                    }}
                  >
                    reCAPTCHA
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-pill border text-white fw-bold py-3 px-4 text-uppercase mt-2 w-100"
                  style={{
                    borderColor: 'var(--primary)',
                    backgroundColor: 'var(--primary)',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    minHeight: '48px', // Touch-friendly size
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    e.currentTarget.style.borderColor = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Sign Up
                </button>
              </Form>
            </div>
          </div>
        </div>

        {/* Desktop View - Sliding Panel */}
        <div
          className="d-none d-md-block bg-white position-relative overflow-hidden w-100 mx-auto"
          style={{
            maxWidth: '768px',
            minHeight: 'clamp(480px, 60vh, 600px)',
            borderRadius: '10px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
          }}
        >
          {/* Sign Up Form Container */}
          <div
            className="position-absolute top-0 h-100 start-0 w-50"
            style={{
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
              transitionProperty: "transform, opacity",
              zIndex: isRightPanelActive ? 5 : 1,
              opacity: isRightPanelActive ? 1 : 0,
              pointerEvents: isRightPanelActive ? 'auto' : 'none'
            }}
          >
            <Form
              onSubmit={handleSignUpSubmit}
              className="bg-white d-flex align-items-center justify-content-center flex-column px-4 px-lg-5 py-0 h-100 text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <img 
                  src={getCountryFlagUrl(selectedCountry, 'w40')}
                  alt={`${selectedCountry} flag`}
                  style={{ 
                    width: '28px', 
                    height: '21px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>Create Account</h1>
              </div>
              <div className="my-4 d-flex justify-content-center align-items-center gap-2">
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/facebook.png', import.meta.url).href} alt="Facebook" style={{ width: '30px', height: '30px' }}/>

                </a>
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/google.png', import.meta.url).href} alt="google" style={{ width: '30px', height: '30px' }} />

                </a>
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/Linkedin.png', import.meta.url).href} alt="Linkedin" style={{ width: '30px', height: '30px' }} />

                </a>
              </div>
              <span className="small text-muted">or use your email for registration</span>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
                className="my-2 w-100"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px'
                }}
              />
              <Form.Control
                type="password"
                placeholder="Create Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
                className="my-2 w-100"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px'
                }}
              />
              <Form.Control
                type="password"
                placeholder="Re-type Password"
                value={signUpPasswordConfirm}
                onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                required
                className="my-2 w-100"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px'
                }}
              />
              {/* CAPTCHA Checkbox */}
              <div className="my-2 w-100 d-flex align-items-center justify-content-start" style={{ paddingLeft: '4px' }}>
                <input
                  type="checkbox"
                  id="signUpCaptchaDesktop"
                  checked={signUpCaptcha}
                  onChange={(e) => setSignUpCaptcha(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    accentColor: 'var(--primary)'
                  }}
                />
                <label
                  htmlFor="signUpCaptchaDesktop"
                  style={{
                    fontSize: '12px',
                    color: '#64748b',
                    cursor: 'pointer',
                    margin: 0,
                    userSelect: 'none'
                  }}
                >
                  reCAPTCHA
                </label>
              </div>
              <button
                type="submit"
                className="rounded-pill border text-white small fw-bold py-2 px-4 text-uppercase mt-2"
                style={{
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--primary)',
                  letterSpacing: '1px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Sign Up
              </button>
            </Form>
          </div>

          {/* Sign In Form Container */}
          <div
            className="position-absolute top-0 h-100 start-0 w-50"
            style={{
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
              transitionProperty: "transform, opacity",
              zIndex: isRightPanelActive ? 1 : 5,
              opacity: isRightPanelActive ? 0 : 1,
              pointerEvents: isRightPanelActive ? 'none' : 'auto'
            }}
          >
            <Form
              onSubmit={handleSignInSubmit}
              className="bg-white d-flex align-items-center justify-content-center flex-column px-4 px-lg-5 py-0 h-100 text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <img 
                  src={getCountryFlagUrl(selectedCountry, 'w40')}
                  alt={`${selectedCountry} flag`}
                  style={{ 
                    width: '28px', 
                    height: '21px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>Sign in</h1>
              </div>
              <div className="my-4 d-flex justify-content-center align-items-center gap-2">
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/facebook.png', import.meta.url).href} alt="Facebook" style={{ width: '30px', height: '30px' }} />

                </a>
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/google.png', import.meta.url).href} alt="google" style={{ width: '30px', height: '30px' }} />

                </a>
                <a
                  href="#"
                  className="border rounded-circle d-inline-flex justify-content-center align-items-center mx-1 text-muted text-decoration-none"
                  // style={{
                  //   width: '40px',
                  //   height: '40px',
                  //   borderColor: '#DDDDDD',
                  //   transition: 'all 0.2s ease'
                  // }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDDDDD';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <img src={new URL('../Images/Linkedin.png', import.meta.url).href} alt="Linkedin" style={{ width: '30px', height: '30px' }} />

                </a>
              </div>
              <span className="small text-muted">or use your account</span>
              <Form.Control
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
                className="my-2 w-100"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px'
                }}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
                className="my-2 w-100"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '6px'
                }}
              />
              <a
                href="#"
                className="text-primary small text-decoration-none my-3"
                onClick={(e) => e.preventDefault()}
                style={{ transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
              >
                Forgot your password?
              </a>
              {/* CAPTCHA Checkbox */}
              <div className="my-2 w-100 d-flex align-items-center justify-content-start" style={{ paddingLeft: '4px' }}>
                <input
                  type="checkbox"
                  id="signInCaptchaDesktop"
                  checked={signInCaptcha}
                  onChange={(e) => setSignInCaptcha(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    accentColor: 'var(--primary)'
                  }}
                />
                <label
                  htmlFor="signInCaptchaDesktop"
                  style={{
                    fontSize: '12px',
                    color: '#64748b',
                    cursor: 'pointer',
                    margin: 0,
                    userSelect: 'none'
                  }}
                >
                  reCAPTCHA
                </label>
              </div>
              <button
                type="submit"
                className="rounded-pill border text-white small fw-bold py-2 px-4 text-uppercase mt-2"
                style={{
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--primary)',
                  letterSpacing: '1px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Sign In
              </button>
            </Form>
          </div>

          {/* Overlay Container */}
          <div
            className="position-absolute top-0 start-50 w-50 h-100 overflow-hidden"
            style={{
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isRightPanelActive ? "translateX(-100%)" : "translateX(0)",
              transitionProperty: "transform",
              zIndex: 3
            }}
          >
            <div
              className="text-white position-relative h-100"
              style={{
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isRightPanelActive ? "translateX(50%)" : "translateX(0)",
                transitionProperty: "transform",
                background: 'linear-gradient(to right, var(--primary), var(--primary-hover))',
                left: '-100%',
                width: '200%'
              }}
            >
              {/* Overlay Left Panel */}
              <div
                className="position-absolute d-flex align-items-center justify-content-center flex-column px-3 px-lg-4 text-center top-0 h-100 w-50"
                style={{
                  transitionDuration: "700ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isRightPanelActive ? "translateX(0)" : "translateX(-20%)",
                  transitionProperty: "transform",
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>Welcome Back!</h1>
                <p className="small fw-light my-3 my-lg-4" style={{ lineHeight: '1.25', letterSpacing: '0.5px', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  type="button"
                  onClick={() => setIsRightPanelActive(false)}
                  className="rounded-pill border border-white bg-transparent text-white small fw-bold py-2 px-4 text-uppercase"
                  style={{
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Sign In
                </button>
              </div>

              {/* Overlay Right Panel */}
              <div
                className="position-absolute d-flex align-items-center justify-content-center flex-column px-3 px-lg-4 text-center top-0 h-100 w-50 end-0"
                style={{
                  transitionDuration: "700ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isRightPanelActive ? "translateX(20%)" : "translateX(0)",
                  transitionProperty: "transform",
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>Hello, Friend!</h1>
                <p className="small fw-light my-3 my-lg-4" style={{ lineHeight: '1.25', letterSpacing: '0.5px', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                  Enter your personal details and start journey with us
                </p>
                <button
                  type="button"
                  onClick={() => setIsRightPanelActive(true)}
                  className="rounded-pill border border-white bg-transparent text-white small fw-bold py-2 px-4 text-uppercase"
                  style={{
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 mt-md-3 px-2 px-md-4 pb-2">
          <p className="text-center mb-0" style={{
            lineHeight: '1.6',
            color: '#64748b',
            fontSize: '12px'
          }}>
            By continuing, you agree to{" "}
            <span style={{
              color: 'var(--primary)',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              {selectedCountry} Tourism's
            </span>{" "}
            <a
              href="#"
              className="text-decoration-none fw-semibold"
              style={{
                color: 'var(--primary)',
                transition: 'all 0.2s ease',
                borderBottom: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary-hover)';
                e.currentTarget.style.borderBottomColor = 'var(--primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-decoration-none fw-semibold"
              style={{
                color: 'var(--primary)',
                transition: 'all 0.2s ease',
                borderBottom: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary-hover)';
                e.currentTarget.style.borderBottomColor = 'var(--primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
