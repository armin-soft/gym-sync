
import { useState } from 'react';

export function useProgramTabs() {
  const [activeTab, setActiveTab] = useState("exercise");
  
  return {
    activeTab,
    setActiveTab
  };
}
