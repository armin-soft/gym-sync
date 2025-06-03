
import { useState, useEffect } from "react";

export const useAppVersion = () => {
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");
  
  useEffect(() => {
    const getVersionFromManifest = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        
        if (manifest && manifest.version) {
          setAppVersion(manifest.version);
        } else {
          setAppVersion("نامشخص");
        }
      } catch (err) {
        console.error('Error loading Manifest.json:', err);
        setAppVersion("خطا در بارگذاری");
      }
    };
    
    getVersionFromManifest();
  }, []);

  return appVersion;
};
