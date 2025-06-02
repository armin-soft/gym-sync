
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
          localStorage.setItem('app_version', manifest.version);
        } else {
          const cachedVersion = localStorage.getItem('app_version');
          setAppVersion(cachedVersion || "نامشخص");
        }
      } catch (err) {
        console.error('Error loading Manifest.json:', err);
        const cachedVersion = localStorage.getItem('app_version');
        setAppVersion(cachedVersion || "خطا در بارگذاری");
      }
    };
    
    getVersionFromManifest();
  }, []);

  return appVersion;
};
