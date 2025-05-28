
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
      <div className="mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 relative text-right" dir="rtl">
        <Search className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-gray-400" />
        <Input
          type="search"
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-4 sm:pr-6 md:pr-8 pl-4 sm:pl-6 md:pl-8 text-right bg-white/80 dark:bg-gray-900/80 text-3xs sm:text-2xs md:text-xs h-6 sm:h-7 md:h-8"
          dir="rtl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute left-1 sm:left-1.5 md:left-2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
          </button>
        )}
      </div>
      
      {/* Add button */}
      <div className="mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 flex justify-end">
        <Button 
          onClick={onAddSupplement}
          className={cn(
            "gap-0.5 sm:gap-1 text-white shadow-lg text-3xs sm:text-2xs md:text-xs px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 h-5 sm:h-6 md:h-7 lg:h-8",
            activeTab === 'supplement' 
              ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          )}
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          <Plus className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5" />
          <span className="hidden sm:inline">افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
          <span className="sm:hidden">{activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
        </Button>
      </div>

      {/* List of supplements */}
      <div className="flex-1 overflow-auto">
        {supplements.length === 0 ? (
          <div className="text-center py-1 sm:py-2 md:py-3 lg:py-4">
            <p className="text-gray-600 dark:text-gray-400 text-3xs sm:text-2xs md:text-xs">هیچ موردی یافت نشد</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-0.5 sm:mt-1 text-3xs sm:text-2xs md:text-xs h-auto p-0.5">
              پاک کردن جستجو
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-0.5 sm:gap-1 md:gap-2 lg:gap-3">
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
