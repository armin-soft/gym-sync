
import { useState, useEffect } from "react";

export const useAppVersion = () => {
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const version = manifest.version;
        setAppVersion(version);
        console.log(`Version loaded from Manifest.json: ${version}`);
      } catch (error) {
        console.error('Error loading version from Manifest.json:', error);
        setAppVersion('خطا در بارگذاری');
      }
    };
    
    fetchVersion();
  }, []);

  return appVersion;
};
