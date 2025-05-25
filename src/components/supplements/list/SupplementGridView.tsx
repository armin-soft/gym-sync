
import React from 'react';
import { Button } from '@/components/ui/button';
import { Supplement } from '@/types/supplement';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { Search, Plus, Edit, Trash2, Pill, FlaskConical, Clock, List, Sparkles } from 'lucide-react';
import { toPersianNumbers } from '@/lib/utils/numbers';

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
    <div className="h-full flex flex-col">
      {/* Search and Add Section */}
      <div className="mb-6 space-y-4" dir="rtl">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-right bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>
        
        {/* Add button */}
        <div className="flex justify-end">
          <Button 
            onClick={onAddSupplement}
            className={cn(
              "gap-2 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3",
              activeTab === 'supplement' 
                ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            )}
            size={deviceInfo.isMobile ? "sm" : "default"}
          >
            <Plus className="w-4 h-4" />
            افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
            <Sparkles className="w-4 h-4 animate-pulse" />
          </Button>
        </div>
      </div>

      {/* List of supplements */}
      <div className="flex-1 overflow-auto">
        {supplements.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mx-auto mb-4 relative">
              {activeTab === 'supplement' ? (
                <FlaskConical className="h-10 w-10 text-gray-400" />
              ) : (
                <Pill className="h-10 w-10 text-gray-400" />
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500/10 to-transparent animate-pulse"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              هیچ موردی یافت نشد
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery ? 'فیلترهای خود را تغییر دهید' : `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد`}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2">
                پاک کردن جستجو
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplements.map((item, index) => (
              <SupplementItem 
                key={item.id} 
                item={item}
                onEdit={() => onEditSupplement(item)}
                onDelete={() => onDeleteSupplement(item.id)}
                activeTab={activeTab}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Supplement item component
const SupplementItem: React.FC<{
  item: Supplement;
  onEdit: () => void;
  onDelete: () => void;
  activeTab: 'supplement' | 'vitamin';
  index: number;
}> = ({
  item,
  onEdit,
  onDelete,
  activeTab,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card className="p-4 border-2 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden relative group">
        {/* Header gradient */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
          activeTab === 'supplement' 
            ? "from-purple-400 to-violet-500" 
            : "from-blue-400 to-indigo-500"
        )}></div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2 mb-3">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
              <div className={cn(
                "p-2 rounded-lg",
                activeTab === 'supplement' 
                  ? "bg-purple-100 dark:bg-purple-900/30" 
                  : "bg-blue-100 dark:bg-blue-900/30"
              )}>
                {activeTab === 'supplement' ? (
                  <FlaskConical className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </div>
            
            <Badge 
              variant="outline" 
              className={cn(
                "mb-3 text-xs font-medium",
                activeTab === 'supplement' 
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700" 
                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
              )}
            >
              {item.category}
            </Badge>
            
            {/* Display dosage and timing information */}
            {(item.dosage || item.timing) && (
              <div className="space-y-2 mb-4">
                {item.dosage && (
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{toPersianNumbers(item.dosage)}</span>
                    <span className="text-gray-500">:</span>
                    <span className="font-medium">دوز مصرف</span>
                    <List className="h-4 w-4 text-purple-500" />
                  </div>
                )}
                {item.timing && (
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{item.timing}</span>
                    <span className="text-gray-500">:</span>
                    <span className="font-medium">زمان مصرف</span>
                    <Clock className="h-4 w-4 text-purple-500" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit} 
            className="h-9 w-9 p-0 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors group-hover:scale-110"
          >
            <Edit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete} 
            className="h-9 w-9 p-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors group-hover:scale-110"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
      </Card>
    </motion.div>
  );
};
