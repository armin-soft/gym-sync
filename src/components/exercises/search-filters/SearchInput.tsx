
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className={cn(
      "relative flex-1 group/search",
      isSearchFocused && "z-10"
    )}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-300",
        isSearchFocused ? "bg-white/90 dark:bg-slate-800/90 shadow-lg ring-2 ring-primary/30 dark:ring-primary/20" : "bg-white/50 dark:bg-slate-800/50"
      )} />
      
      <Search className={cn(
        "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
        isSearchFocused ? "text-primary" : "text-muted-foreground"
      )} />
      
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        placeholder="جستجوی تمرین..."
        className={cn(
          "pr-3 pl-9 h-11 text-sm bg-transparent border-none focus-visible:ring-0 relative z-10 transition-all duration-300",
          isSearchFocused ? "font-medium" : ""
        )}
      />
      
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full hover:bg-muted/80 z-10"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">پاک کردن جستجو</span>
        </Button>
      )}
      
      <motion.span 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: isSearchFocused || searchQuery ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
