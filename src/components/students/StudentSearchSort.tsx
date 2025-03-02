
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Search, UserRound, Scale, Ruler } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
}

export const StudentSearchSort = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort,
}: StudentSearchSortProps) => {
  return (
    <div className="grid sm:grid-cols-[1fr_auto] gap-4">
      <Card className="backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60">
        <div className="relative p-4">
          <Search className="absolute right-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جستجو بر اساس نام یا شماره موبایل..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              console.log('Search query changed:', e.target.value);
            }}
            className="pl-4 pr-10 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </Card>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <ListFilter className="h-4 w-4" />
            مرتب‌سازی
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => toggleSort("name")}>
            <UserRound className="h-4 w-4 ml-2" />
            بر اساس نام {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("weight")}>
            <Scale className="h-4 w-4 ml-2" />
            بر اساس وزن {sortField === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("height")}>
            <Ruler className="h-4 w-4 ml-2" />
            بر اساس قد {sortField === "height" && (sortOrder === "asc" ? "↑" : "↓")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
