
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  type: 'supplement' | 'vitamin';
}

export const SearchBar = ({ searchQuery, setSearchQuery, type }: SearchBarProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <div className="relative flex-1">
      <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`جستجو در ${type === 'supplement' ? 'مکمل ها' : 'ویتامین ها'}...`}
        className={cn(
          "pr-7 sm:pr-10 text-right rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
          deviceInfo.isMobile ? "h-8 text-xs" : "h-9 sm:h-10 text-sm"
        )}
      />
    </div>
  );
};
