
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppVersionContextType {
  version: string;
  isLoading: boolean;
  error: string | null;
}

const AppVersionContext = createContext<AppVersionContextType>({
  version: 'در حال بارگذاری...',
  isLoading: true,
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
  const [version, setVersion] = useState('در حال بارگذاری...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      // بررسی cache
      const cachedVersion = sessionStorage.getItem('app-version');
      if (cachedVersion) {
        setVersion(cachedVersion);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const appVersion = manifest.version || 'نامشخص';
        
        setVersion(appVersion);
        sessionStorage.setItem('app-version', appVersion);
        console.log(`App version loaded: ${appVersion}`);
      } catch (err) {
        console.error('Error loading app version:', err);
        setError('خطا در بارگذاری نسخه');
        setVersion('نامشخص');
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
