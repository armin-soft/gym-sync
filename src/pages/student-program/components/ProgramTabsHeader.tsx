
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Utensils, Pill } from "lucide-react";
import { CardHeader } from "@/components/ui/card";

interface ProgramTabsHeaderProps {
  activeTab: string;
}

const ProgramTabsHeader: React.FC<ProgramTabsHeaderProps> = ({ activeTab }) => {
  return (
    <CardHeader className="p-4 pb-0">
      <TabsList className="grid grid-cols-3 h-12">
        <TabsTrigger 
          value="exercise" 
          className="flex items-center gap-2 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
        >
          <Dumbbell className="h-4 w-4" />
          <span>برنامه تمرینی</span>
        </TabsTrigger>
        <TabsTrigger 
          value="diet" 
          className="flex items-center gap-2 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300"
        >
          <Utensils className="h-4 w-4" />
          <span>برنامه غذایی</span>
        </TabsTrigger>
        <TabsTrigger 
          value="supplement" 
          className="flex items-center gap-2 data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
        >
          <Pill className="h-4 w-4" />
          <span>مکمل و ویتامین</span>
        </TabsTrigger>
      </TabsList>
    </CardHeader>
  );
};

export default ProgramTabsHeader;
