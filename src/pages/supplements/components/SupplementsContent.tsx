
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, LayoutGrid, LayoutList, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SupplementGrid } from "./SupplementGrid";
import { SupplementTable } from "./SupplementTable";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Supplement } from "@/types/supplement";

interface SupplementsContentProps {
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementsContent: React.FC<SupplementsContentProps> = ({
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>(deviceInfo.isMobile ? 'grid' : 'table');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<'newest' | 'name' | 'category'>('newest');
  
  // Filter supplements based on search query
  const filteredSupplements = supplements.filter(supplement => 
    supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplement.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplement.dosage && supplement.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (supplement.timing && supplement.timing.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Sort supplements
  const sortedSupplements = [...filteredSupplements].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'newest':
      default:
        return b.id - a.id;
    }
  });
  
  // Get color scheme based on active tab
  const getColorScheme = () => {
    if (activeTab === 'supplement') {
      return {
        textGradient: 'from-purple-700 to-indigo-600',
        bgGradient: 'from-purple-600 to-indigo-600',
        buttonBg: 'bg-purple-600 hover:bg-purple-700',
        iconColor: 'text-purple-600',
        hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
      };
    } else {
      return {
        textGradient: 'from-blue-700 to-sky-600',
        bgGradient: 'from-blue-600 to-sky-600',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
        iconColor: 'text-blue-600',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      };
    }
  };
  
  const colorScheme = getColorScheme();
  
  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold bg-gradient-to-r ${colorScheme.textGradient} bg-clip-text text-transparent`}>
              {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
              <span className="mr-2 text-base font-medium text-muted-foreground">
                ({toPersianNumbers(filteredSupplements.length)})
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeTab === 'supplement' 
                ? 'مدیریت مکمل‌های ورزشی و برنامه‌های مصرفی' 
                : 'مدیریت ویتامین‌ها و مکمل‌های غذایی'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-9"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  جدیدترین
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  بر اساس نام
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('category')}>
                  بر اساس دسته‌بندی
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'table')}>
              <ToggleGroupItem value="grid" aria-label="نمایش شبکه‌ای" className={`${viewMode === 'grid' ? colorScheme.hoverBg : ''}`}>
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="نمایش لیستی" className={`${viewMode === 'table' ? colorScheme.hoverBg : ''}`}>
                <LayoutList className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Button onClick={onAddSupplement} className={`${colorScheme.buttonBg}`}>
              <PlusCircle className="h-4 w-4 ml-2" />
              {deviceInfo.isMobile ? '' : activeTab === 'supplement' ? 'افزودن مکمل' : 'افزودن ویتامین'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {sortedSupplements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorScheme.bgGradient} flex items-center justify-center mb-4 opacity-50`}>
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold">موردی یافت نشد</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {searchQuery 
                ? 'جستجوی شما نتیجه‌ای نداشت. معیارهای جستجو را تغییر دهید یا موارد جدیدی اضافه کنید.' 
                : `هنوز هیچ ${activeTab === 'supplement' ? 'مکمل' : 'ویتامینی'} در این دسته‌بندی ثبت نشده است.`
              }
            </p>
            <Button onClick={onAddSupplement} variant="outline" className="mt-4">
              <PlusCircle className={`h-4 w-4 ml-2 ${colorScheme.iconColor}`} />
              {activeTab === 'supplement' ? 'افزودن مکمل جدید' : 'افزودن ویتامین جدید'}
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <SupplementGrid 
            supplements={sortedSupplements}
            onEdit={onEditSupplement}
            onDelete={onDeleteSupplement}
            activeTab={activeTab}
          />
        ) : (
          <SupplementTable
            supplements={sortedSupplements}
            onEdit={onEditSupplement}
            onDelete={onDeleteSupplement}
            activeTab={activeTab}
          />
        )}
      </div>
    </div>
  );
};
