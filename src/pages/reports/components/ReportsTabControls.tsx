
import { Card } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, Wallet, ChartPieIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ReportsTabControlsProps {
  onTabChange: (value: string) => void;
}

export const ReportsTabControls = ({ onTabChange }: ReportsTabControlsProps) => {
  return (
    <Card className="p-1 backdrop-blur-sm bg-card/95 border-border/60">
      <TabsList className="w-full justify-start sm:justify-center grid grid-cols-3 h-12">
        <TabsTrigger 
          value="overview" 
          className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
        >
          <ChartBarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">نمای کلی</span>
        </TabsTrigger>
        <TabsTrigger 
          value="income" 
          className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
        >
          <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">درآمد</span>
        </TabsTrigger>
        <TabsTrigger 
          value="activities" 
          className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
        >
          <ChartPieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">فعالیت‌ها</span>
        </TabsTrigger>
      </TabsList>
    </Card>
  );
};
