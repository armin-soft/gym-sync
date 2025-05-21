
import React from 'react';
import StudentsPage from './components/StudentsPage';
import { PageContainer } from '@/components/ui/page-container';

const Students = () => {
  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <StudentsPage />
    </PageContainer>
  );
};

export default Students;
