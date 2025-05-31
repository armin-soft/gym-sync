
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History } from "lucide-react";

export const StudentsTabs: React.FC = () => {
  return (
    <TabsList className="mx-auto bg-black-100 dark:bg-black-800">
      <TabsTrigger value="all" className="flex gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-gold-500 data-[state=active]:text-black">
        <UserRound className="h-4 w-4" />
        <span>شاگردان</span>
      </TabsTrigger>
      <TabsTrigger value="history" className="flex gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-gold-500 data-[state=active]:text-black">
        <History className="h-4 w-4" />
        <span>تاریخچه</span>
      </TabsTrigger>
    </TabsList>
  );
};
