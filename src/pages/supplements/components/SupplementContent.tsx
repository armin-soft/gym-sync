
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SupplementList } from "@/components/supplements/SupplementList";
import { FlaskConical, Pill, Plus, Search, Filter, Grid3X3, List } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { Supplement } from "@/types/supplement";

interface SupplementContentProps {
  type: 'supplement' | 'vitamin';
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementContent = ({
  type,
  supplements,
  onAdd,
  onEdit,
  onDelete
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); 
  
  // Calculate responsive height for ScrollArea
  const getScrollAreaHeight = () => {
    if (deviceInfo.isMobile) {
      return "calc(100vh - 320px)";
    } else if (deviceInfo.isTablet) {
      return "calc(100vh - 350px)";  
    } else if (deviceInfo.isSmallLaptop) {
      return "calc(100vh - 380px)";
    } else {
      return "calc(100vh - 420px)";
    }
  };

  const Icon = type === 'supplement' ? FlaskConical : Pill;
  
  // Filter supplements based on search
  const filteredSupplements = supplements.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase())) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const count = filteredSupplements.length;
  
  const gradientClasses = type === 'supplement' 
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700";
  
  const bgClasses = type === 'supplement'
    ? "from-purple-100 to-blue-50"
    : "from-blue-100 to-purple-50";
  
  const textColor = type === 'supplement' ? "text-purple-600" : "text-blue-600";
  const borderColor = type === 'supplement' ? "border-purple-200" : "border-blue-200";
  const hoverBgColor = type === 'supplement' ? "hover:bg-purple-50" : "hover:bg-blue-50";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-md hover:shadow-lg transition-all p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 sm:p-3 bg-gradient-to-br ${bgClasses} rounded-lg sm:rounded-xl`}
          >
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${textColor}`} />
          </motion.div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {type === 'supplement' ? 'مکمل ها' : 'ویتامین ها'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              تعداد کل: {toPersianNumbers(count)}
            </p>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={onAdd}
            className={`bg-gradient-to-r ${gradientClasses} text-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg sm:rounded-xl text-xs sm:text-sm h-9 sm:h-10`}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
            {`افزودن ${type === 'supplement' ? 'مکمل' : 'ویتامین'}`}
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={`جستجوی ${type === 'supplement' ? 'مکمل' : 'ویتامین'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pr-10 ${borderColor} focus:ring-1 focus:${textColor}`}
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`h-9 px-3 ${viewMode === 'grid' ? `bg-gradient-to-r ${bgClasses} ${textColor} ${borderColor}` : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className={`h-9 px-3 ${viewMode === 'list' ? `bg-gradient-to-r ${bgClasses} ${textColor} ${borderColor}` : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full flex-1" style={{ height: getScrollAreaHeight() }}>
        {filteredSupplements.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full py-10 text-center"
          >
            <Icon className={`h-12 w-12 ${textColor} opacity-20 mb-4`} />
            <h4 className="text-lg font-semibold text-gray-500">موردی یافت نشد</h4>
            <p className="text-sm text-gray-400 mt-2">
              {searchQuery 
                ? 'جستجوی شما نتیجه‌ای در بر نداشت' 
                : `هنوز هیچ ${type === 'supplement' ? 'مکملی' : 'ویتامینی'} اضافه نشده است`}
            </p>
          </motion.div>
        ) : (
          <div className={`pt-2 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4' : ''}`}>
            <AnimatedSupplementList 
              supplements={filteredSupplements}
              onEdit={onEdit}
              onDelete={onDelete}
              viewMode={viewMode}
              type={type}
              borderColor={borderColor}
              hoverBgColor={hoverBgColor}
              textColor={textColor}
            />
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};

interface AnimatedSupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  viewMode: 'grid' | 'list';
  type: 'supplement' | 'vitamin';
  borderColor: string;
  hoverBgColor: string;
  textColor: string;
}

const AnimatedSupplementList = ({ 
  supplements, 
  onEdit, 
  onDelete, 
  viewMode,
  type,
  borderColor,
  hoverBgColor,
  textColor
}: AnimatedSupplementListProps) => {
  if (viewMode === 'grid') {
    return (
      <>
        {supplements.map((supplement, index) => (
          <motion.div
            key={supplement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-4 rounded-xl border ${borderColor} ${hoverBgColor} transition-all hover:shadow-md cursor-pointer`}
            onClick={() => onEdit(supplement)}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-base mb-1">{supplement.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${textColor} bg-opacity-10 ${type === 'supplement' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                {supplement.category}
              </span>
            </div>
            
            {supplement.description && (
              <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{supplement.description}</p>
            )}
            
            <div className="flex flex-col gap-1 mt-2">
              {supplement.dosage && (
                <div className="flex items-center text-xs">
                  <span className="font-medium ml-1">دوز مصرف:</span>
                  <span className="text-gray-600">{supplement.dosage}</span>
                </div>
              )}
              
              {supplement.timing && (
                <div className="flex items-center text-xs">
                  <span className="font-medium ml-1">زمان مصرف:</span>
                  <span className="text-gray-600">{supplement.timing}</span>
                </div>
              )}
            </div>
            
            <motion.div 
              className="mt-3 pt-2 border-t border-dashed border-gray-100 flex justify-end"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm" 
                variant="outline"
                className="h-7 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(supplement.id);
                }}
              >
                حذف
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </>
    );
  } else {
    return (
      <div className="space-y-2">
        {supplements.map((supplement, index) => (
          <motion.div
            key={supplement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className={`p-3 sm:p-4 rounded-lg border ${borderColor} ${hoverBgColor} transition-all hover:shadow-sm cursor-pointer`}
            onClick={() => onEdit(supplement)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-8 rounded-full ${type === 'supplement' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">{supplement.name}</h4>
                  {(supplement.dosage || supplement.timing) && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      {supplement.dosage && <span>{supplement.dosage}</span>}
                      {supplement.dosage && supplement.timing && <span>•</span>}
                      {supplement.timing && <span>{supplement.timing}</span>}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${textColor} bg-opacity-10 ${type === 'supplement' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  {supplement.category}
                </span>
                
                <Button
                  size="sm" 
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(supplement.id);
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM3.4 6C3.73137 6 4 6.26863 4 6.6V12.4C4 12.7314 3.73137 13 3.4 13C3.06863 13 2.8 12.7314 2.8 12.4V6.6C2.8 6.26863 3.06863 6 3.4 6ZM6.6 6C6.93137 6 7.2 6.26863 7.2 6.6V12.4C7.2 12.7314 6.93137 13 6.6 13C6.26863 13 6 12.7314 6 12.4V6.6C6 6.26863 6.26863 6 6.6 6ZM11.2 6.6C11.2 6.26863 10.9314 6 10.6 6C10.2686 6 10 6.26863 10 6.6V12.4C10 12.7314 10.2686 13 10.6 13C10.9314 13 11.2 12.7314 11.2 12.4V6.6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
};
