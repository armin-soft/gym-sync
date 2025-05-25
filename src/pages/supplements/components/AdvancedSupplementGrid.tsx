
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Edit, Trash2, Clock, Zap, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Supplement } from "@/types/supplement";

interface AdvancedSupplementGridProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  viewMode: 'grid' | 'list';
  activeTab: 'supplement' | 'vitamin';
  searchQuery: string;
  selectedCategory: string;
}

export const AdvancedSupplementGrid: React.FC<AdvancedSupplementGridProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement,
  viewMode,
  activeTab,
  searchQuery,
  selectedCategory,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  if (supplements.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-3 sm:space-y-4 max-w-xs sm:max-w-sm"
        >
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Package className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </div>
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-sm sm:text-lg font-bold text-slate-700">
              {searchQuery || selectedCategory !== 'all' ? 'موردی یافت نشد' : `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} ثبت نشده`}
            </h3>
            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
              {searchQuery || selectedCategory !== 'all' 
                ? 'با تغییر معیارهای جستجو یا فیلتر، موارد بیشتری را مشاهده کنید'
                : `اولین ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید`
              }
            </p>
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                // Clear filters logic would go here
              }}
              className="bg-white hover:bg-slate-50 text-xs sm:text-sm"
            >
              پاک کردن فیلترها
            </Button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-2 sm:p-4" dir="rtl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "gap-2 sm:gap-4",
          viewMode === 'grid' 
            ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" 
            : "flex flex-col space-y-2 sm:space-y-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {supplements.map((supplement) => (
            <motion.div
              key={supplement.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -2 }}
              className="h-fit"
            >
              {viewMode === 'grid' ? (
                <AdvancedSupplementCard
                  supplement={supplement}
                  onEdit={() => onEditSupplement(supplement)}
                  onDelete={() => onDeleteSupplement(supplement.id)}
                  activeTab={activeTab}
                />
              ) : (
                <AdvancedSupplementListItem
                  supplement={supplement}
                  onEdit={() => onEditSupplement(supplement)}
                  onDelete={() => onDeleteSupplement(supplement.id)}
                  activeTab={activeTab}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Compact Grid Card Component
const AdvancedSupplementCard: React.FC<{
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
  activeTab: string;
}> = ({ supplement, onEdit, onDelete, activeTab }) => {
  const getTypeIcon = () => {
    return activeTab === 'supplement' ? Pill : Zap;
  };

  const TypeIcon = getTypeIcon();

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
      
      {/* Header */}
      <div className="relative z-10 p-2 sm:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-xs sm:text-sm text-slate-800 mb-1 line-clamp-2 leading-tight">
              {supplement.name}
            </h3>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-medium border scale-75 sm:scale-100 origin-right",
                activeTab === 'supplement' 
                  ? "bg-purple-50 text-purple-700 border-purple-200" 
                  : "bg-blue-50 text-blue-700 border-blue-200"
              )}
            >
              {supplement.category}
            </Badge>
          </div>
          
          <div className={cn(
            "w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0",
            activeTab === 'supplement' 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-blue-500 to-cyan-600"
          )}>
            <TypeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1 sm:space-y-2">
          {supplement.dosage && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-600">
              <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
              <span className="font-medium">دوز:</span>
              <span className="text-xs">{supplement.dosage}</span>
            </div>
          )}
          
          {supplement.timing && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-600">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500" />
              <span className="font-medium">زمان:</span>
              <span className="text-xs">{supplement.timing}</span>
            </div>
          )}

          {supplement.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {supplement.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex-1 h-6 sm:h-7 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md sm:rounded-lg text-xs"
          >
            <Edit className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
            <span className="hidden sm:inline">ویرایش</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-6 sm:h-7 px-1.5 sm:px-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md sm:rounded-lg"
          >
            <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Compact List Item Component
const AdvancedSupplementListItem: React.FC<{
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
  activeTab: string;
}> = ({ supplement, onEdit, onDelete, activeTab }) => {
  const TypeIcon = activeTab === 'supplement' ? Pill : Zap;

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-l from-white via-purple-50/20 to-indigo-50/10 border border-white/60 hover:shadow-lg transition-all duration-300 rounded-lg sm:rounded-xl">
      <div className="p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Icon */}
          <div className={cn(
            "w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0",
            activeTab === 'supplement' 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-blue-500 to-cyan-600"
          )}>
            <TypeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 mb-1">
                  {supplement.name}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-600 flex-wrap">
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-xs scale-75 sm:scale-100 origin-right">
                    {supplement.category}
                  </Badge>
                  {supplement.dosage && (
                    <span className="flex items-center gap-1">
                      <Award className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-emerald-500" />
                      <span className="text-xs">{supplement.dosage}</span>
                    </span>
                  )}
                  {supplement.timing && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-orange-500" />
                      <span className="text-xs">{supplement.timing}</span>
                    </span>
                  )}
                </div>
                {supplement.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {supplement.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="h-6 sm:h-7 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md sm:rounded-lg text-xs px-1.5 sm:px-2"
                >
                  <Edit className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
                  <span className="hidden sm:inline">ویرایش</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="h-6 sm:h-7 px-1.5 sm:px-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md sm:rounded-lg"
                >
                  <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
