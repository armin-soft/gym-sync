
import { motion } from "framer-motion";
import { Search, X, Filter, SortAsc, SortDesc, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ModernStudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  resultCount: number;
}

export const ModernStudentSearch = ({
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  sortField,
  sortOrder,
  onSortChange,
  resultCount
}: ModernStudentSearchProps) => {
  const sortOptions = [
    { field: "name", label: "نام" },
    { field: "weight", label: "وزن" },
    { field: "height", label: "قد" },
    { field: "payment", label: "شهریه" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white via-gray-50/50 to-slate-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none rounded-2xl" />
      
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                جستجو و فیلتر
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                شاگردان خود را پیدا کنید
              </p>
            </div>
          </div>
          
          {/* Result Count */}
          <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-3 py-1">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {resultCount} نتیجه
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="جستجو بر اساس نام، شماره تلفن، قد، وزن یا شهریه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClearSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">مرتب‌سازی</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200/70 dark:border-gray-700/70 rounded-xl shadow-2xl"
            >
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.field}
                  onClick={() => onSortChange?.(option.field)}
                  className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {sortField === option.field && (
                      <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                        فعال
                      </Badge>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-gray-600 dark:text-gray-300">فیلترهای فعال:</span>
            <Badge 
              variant="outline" 
              className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/30"
            >
              جستجو: {searchQuery}
              <button 
                onClick={handleClearSearch}
                className="ml-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
};
