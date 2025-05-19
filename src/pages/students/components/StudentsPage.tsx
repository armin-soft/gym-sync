
import React, { useState } from 'react';
import StudentsContainer from './StudentsContainer';
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { initializeServiceWorker } from '@/utils/RegisterServiceWorker';

const StudentsPage = () => {
  const deviceInfo = useDeviceInfo();
  
  // Initialize service worker for offline support and PDF generation
  React.useEffect(() => {
    initializeServiceWorker().catch(console.error);
  }, []);

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
      <StudentsContainer />
    </PageContainer>
  );
};

export default StudentsPage;
