
import React from 'react';
import { Button } from '@/components/ui/button';
import { Supplement } from '@/types/supplement';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeviceInfo } from '@/hooks/use-mobile';

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
      {/* Search */}
      <div className="mb-4 relative text-right" dir="rtl">
        <input
          type="search"
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-10 border rounded-lg text-right"
        />
        <span className="absolute left-3 top-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>
      
      {/* Add button */}
      <div className="mb-4 flex justify-end">
        <Button 
          onClick={onAddSupplement}
          className={cn(
            "gap-1.5 text-white shadow-lg",
            activeTab === 'supplement' 
              ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          )}
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      </div>

      {/* List of supplements */}
      <div className="flex-1 overflow-auto">
        {supplements.length === 0 ? (
          <div className="text-center py-8">
            <p>هیچ موردی یافت نشد</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
              پاک کردن جستجو
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supplements.map(item => (
              <SupplementItem 
                key={item.id} 
                item={item}
                onEdit={() => onEditSupplement(item)}
                onDelete={() => onDeleteSupplement(item.id)}
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
}> = ({
  item,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 border-2 hover:border-indigo-300 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
              {item.category}
            </Badge>
            {item.dosage && (
              <p className="text-xs mt-2 text-gray-600">
                <span className="font-medium">دوز مصرف: </span>
                {item.dosage}
              </p>
            )}
            {item.timing && (
              <p className="text-xs text-gray-600">
                <span className="font-medium">زمان مصرف: </span>
                {item.timing}
              </p>
            )}
          </div>
          <div className="flex space-x-1 rtl:space-x-reverse">
            <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
