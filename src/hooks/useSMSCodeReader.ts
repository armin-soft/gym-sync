
import { useEffect, useRef } from 'react';

interface UseSMSCodeReaderProps {
  onCodeReceived: (code: string) => void;
  enabled?: boolean;
}

export const useSMSCodeReader = ({ onCodeReceived, enabled = true }: UseSMSCodeReaderProps) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled || !('OTPCredential' in window)) {
      console.log('Web OTP API not supported or disabled');
      return;
    }

    const startSMSListener = async () => {
      try {
        // Cancel any existing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        console.log('Starting SMS code listener...');
        
        const credential = await (navigator.credentials as any).get({
          otp: { transport: ['sms'] },
          signal: abortControllerRef.current.signal
        });

        if (credential && credential.code) {
          console.log('SMS code received:', credential.code);
          onCodeReceived(credential.code);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.log('SMS listener error:', error);
        }
      }
    };

    startSMSListener();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [onCodeReceived, enabled]);

  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { cleanup };
};
