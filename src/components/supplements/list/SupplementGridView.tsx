
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Supplement } from '@/types/supplement';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { SupplementCard } from './SupplementCard';
import { Search, Plus, X } from 'lucide-react';

interface SupplementGridViewProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddSupplement: () => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementGridView: React.FC<SupplementGridViewProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement,
  searchQuery,
  setSearchQuery,
  onAddSupplement,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Search */}
      <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 relative text-right" dir="rtl">
        <Search className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-400" />
        <Input
          type="search"
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-6 sm:pr-8 md:pr-10 pl-6 sm:pl-8 md:pl-10 text-right bg-white/80 dark:bg-gray-900/80 text-2xs sm:text-xs md:text-sm h-8 sm:h-9 md:h-10"
          dir="rtl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute left-1.5 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </button>
        )}
      </div>
      
      {/* Add button */}
      <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 flex justify-end">
        <Button 
          onClick={onAddSupplement}
          className={cn(
            "gap-1 sm:gap-1.5 text-white shadow-lg text-2xs sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-7 sm:h-8 md:h-9 lg:h-10",
            activeTab === 'supplement' 
              ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          )}
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
          <span className="hidden sm:inline">افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
          <span className="sm:hidden">{activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
        </Button>
      </div>

      {/* List of supplements */}
      <div className="flex-1 overflow-auto">
        {supplements.length === 0 ? (
          <div className="text-center py-2 sm:py-4 md:py-6 lg:py-8">
            <p className="text-gray-600 dark:text-gray-400 text-2xs sm:text-xs md:text-sm">هیچ موردی یافت نشد</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-1 sm:mt-2 text-2xs sm:text-xs md:text-sm h-auto p-1">
              پاک کردن جستجو
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            {supplements.map((supplement, index) => (
              <motion.div
                key={supplement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SupplementCard 
                  supplement={supplement}
                  onEdit={() => onEditSupplement(supplement)}
                  onDelete={() => onDeleteSupplement(supplement.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
