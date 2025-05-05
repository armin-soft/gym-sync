
import { Card } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, Wallet, ChartPieIcon, TrendingUp, BarChart } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ReportsTabControlsProps {
  onTabChange: (value: string) => void;
}

export const ReportsTabControls = ({ onTabChange }: ReportsTabControlsProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const menuItems = [
    { 
      id: "overview", 
      label: "نمای کلی",
      icon: <ChartBarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    },
    { 
      id: "income", 
      label: "درآمد",
      icon: <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    },
    { 
      id: "growth", 
      label: "رشد",
      icon: <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    },
    { 
      id: "activities", 
      label: "فعالیت‌ها",
      icon: <ChartPieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    },
    { 
      id: "comparison", 
      label: "مقایسه",
      icon: <BarChart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    },
  ];

  return (
    <div className={`px-4 pt-4 pb-0 ${isDark ? 'bg-gradient-to-b from-muted/20 to-transparent' : 'bg-gradient-to-b from-muted/50 to-transparent'}`}>
      <TabsList className="w-full sm:w-auto justify-start overflow-x-auto scrollbar-none py-1 px-1 gap-1 bg-transparent">
        {menuItems.map(item => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            onClick={() => onTabChange(item.id)} 
            className="gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm transition-all duration-300 hover:bg-muted/50"
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
