
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const ManagementPage = () => {
  return (
    <PageContainer withBackground fullHeight className="w-full">
      <DashboardContent />
    </PageContainer>
  );
};

export default ManagementPage;
