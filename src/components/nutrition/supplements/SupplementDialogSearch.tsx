
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementDialogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: "supplements" | "vitamins";
}

export const SupplementDialogSearch: React.FC<SupplementDialogSearchProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="relative flex-1">
      <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        placeholder={`جستجو در ${activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
        className={cn(
          "pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted text-right",
          deviceInfo.isMobile ? "h-8 text-xs" : "h-10 text-sm"
        )}
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
      />
    </div>
  );
};
