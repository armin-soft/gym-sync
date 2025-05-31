
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface StudentMealSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StudentMealSearch: React.FC<StudentMealSearchProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const { colors } = useBrandTheme();
  
  return (
    <div className="px-6 py-3 border-b bg-brand-primary/5 dark:bg-brand-primary/10 shrink-0">
      <div className="relative flex-1">
        <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-primary/60" />
        <Input 
          placeholder="جستجو در برنامه های غذایی..." 
          className="pl-3 pr-10 bg-background focus-visible:ring-brand-primary/20 border-brand-primary/20 text-right" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          dir="rtl" 
        />
      </div>
    </div>
  );
};

export default StudentMealSearch;
