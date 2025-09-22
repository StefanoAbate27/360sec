import React, { createContext, useContext, useEffect, useState } from 'react';

type ABTestVariant = 'A' | 'B';

interface ABTestContextType {
  variant: ABTestVariant;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<ABTestVariant>('A');

  useEffect(() => {
    // Obtener o generar variant del usuario
    let userVariant = localStorage.getItem('ab-test-variant') as ABTestVariant;
    
    if (!userVariant) {
      // Asignar aleatoriamente 50/50
      userVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('ab-test-variant', userVariant);
    }
    
    setVariant(userVariant);
  }, []);

  const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
    // En un entorno real, esto enviaría datos a analytics
    console.log('A/B Test Event:', {
      event: eventName,
      variant,
      timestamp: new Date().toISOString(),
      ...properties
    });
  };

  return (
    <ABTestContext.Provider value={{ variant, trackEvent }}>
      {children}
    </ABTestContext.Provider>
  );
}

export function useABTest() {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }
  return context;
}

export function ABTestComponent({ 
  variantA, 
  variantB 
}: { 
  variantA: React.ReactNode;
  variantB: React.ReactNode;
}) {
  const { variant } = useABTest();
  return <>{variant === 'A' ? variantA : variantB}</>;
}