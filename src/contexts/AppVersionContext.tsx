
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppVersionContextType {
  version: string;
  isLoading: boolean;
  error: string | null;
}

const AppVersionContext = createContext<AppVersionContextType>({
  version: '5.0.0',
  isLoading: false,
  error: null
});

export const useAppVersion = () => {
  const context = useContext(AppVersionContext);
  if (!context) {
    throw new Error('useAppVersion must be used within AppVersionProvider');
  }
  return context;
};

interface AppVersionProviderProps {
  children: React.ReactNode;
}

export const AppVersionProvider: React.FC<AppVersionProviderProps> = ({ children }) => {
  const [version, setVersion] = useState('5.0.0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      // بررسی cache
      const cachedVersion = sessionStorage.getItem('app-version');
      if (cachedVersion) {
        setVersion(cachedVersion);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const appVersion = manifest.version || '5.0.0';
        
        setVersion(appVersion);
        sessionStorage.setItem('app-version', appVersion);
        console.log(`App version loaded once: ${appVersion}`);
      } catch (err) {
        console.error('Error loading app version:', err);
        setError('خطا در بارگذاری نسخه');
        setVersion('5.0.0'); // fallback
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVersion();
  }, []);

  return (
    <AppVersionContext.Provider value={{ version, isLoading, error }}>
      {children}
    </AppVersionContext.Provider>
  );
};
