import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Container } from 'react-bootstrap';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { getCountryFlagUrl } from '../App';

type PaymentSuccessProps = {
  onNavigate: (page: string) => void;
  selectedCountry?: string;
};

export function PaymentSuccess({ onNavigate, selectedCountry = 'Bali' }: PaymentSuccessProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)' }}>
        <Container>
          <Card className="border-0 shadow-lg" style={{ maxWidth: '500px', width: '100%', margin: '0 auto', borderRadius: '20px', overflow: 'hidden' }}>
            <CardContent className="p-5 text-center" style={{ backgroundColor: '#fff' }}>
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '100px', height: '100px' }}>
                <Loader2 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    color: 'white',
                    animation: 'spin 1s linear infinite'
                  }} 
                />
              </div>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <img 
                  src={getCountryFlagUrl(selectedCountry, 'w40')}
                  alt={`${selectedCountry} flag`}
                  style={{ 
                    width: '32px', 
                    height: '24px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h2 className="mb-0 fw-bold" style={{ color: 'var(--foreground)', fontSize: '1.75rem' }}>Processing Payment</h2>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                Please wait while we process your payment and generate your entry certificates...
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--ocean-blue) 100%)' }}>
      <Container>
        <Card className="border-0 shadow-lg" style={{ maxWidth: '500px', width: '100%', margin: '0 auto', borderRadius: '20px', overflow: 'hidden' }}>
          <CardContent className="p-5 text-center" style={{ backgroundColor: '#fff' }}>
            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '100px', height: '100px' }}>
              <CheckCircle2 style={{ width: '56px', height: '56px', color: 'white' }} />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
              <img 
                src={getCountryFlagUrl(selectedCountry, 'w40')}
                alt={`${selectedCountry} flag`}
                style={{ 
                  width: '32px', 
                  height: '24px', 
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h2 className="mb-0 fw-bold" style={{ color: 'var(--foreground)', fontSize: '1.75rem' }}>Payment Successful!</h2>
            </div>
            <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
              Your payment has been processed successfully. Your entry certificates and QR codes are now ready.
            </p>
            <div className="d-flex flex-column gap-3">
              <Button 
                onClick={() => onNavigate('qr-code')} 
                className="w-100 fw-semibold"
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  borderColor: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 148, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
                }}
              >
                View QR Codes
              </Button>
              <Button 
                onClick={() => onNavigate('dashboard')} 
                variant="outline"
                className="w-100 fw-semibold"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
