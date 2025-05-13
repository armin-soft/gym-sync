
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { Pill, Package2, BadgePlus, Search, Filter } from "lucide-react";
import { SupplementContent } from "./components/supplement-content";

const SupplementsPage: React.FC = () => {
  return (
    <PageContainer 
      title="مکمل‌ها و ویتامین‌ها" 
      icon={<Pill className="h-5 w-5 text-purple-500" />}
      description="مدیریت مکمل‌ها و ویتامین‌های ورزشی"
    >
      <SupplementContent />
    </PageContainer>
  );
};

export default SupplementsPage;
