
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  searchQuery, 
  setSearchQuery,
  className = ""
}) => {
  return (
    <Card className={`p-2 flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی حرکت..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 pr-8 h-8 text-sm bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-indigo-300"
        />
        {searchQuery && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </Card>
  );
};
