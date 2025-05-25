
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
        staggerChildren: 0.1
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
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Pill className="w-12 h-12 text-purple-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-700">
              {searchQuery || selectedCategory !== 'all' ? 'موردی یافت نشد' : `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} ثبت نشده`}
            </h3>
            <p className="text-slate-500 leading-relaxed">
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
              className="bg-white hover:bg-slate-50"
            >
              پاک کردن فیلترها
            </Button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6" dir="rtl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "gap-6",
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "flex flex-col space-y-4"
        )}
      >
        <AnimatePresence mode="popLayout">
          {supplements.map((supplement) => (
            <motion.div
              key={supplement.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -5 }}
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

// Grid Card Component
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
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 leading-tight">
              {supplement.name}
            </h3>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-medium border-2",
                activeTab === 'supplement' 
                  ? "bg-purple-50 text-purple-700 border-purple-200" 
                  : "bg-blue-50 text-blue-700 border-blue-200"
              )}
            >
              {supplement.category}
            </Badge>
          </div>
          
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
            activeTab === 'supplement' 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-blue-500 to-cyan-600"
          )}>
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          {supplement.dosage && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Award className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">دوز:</span>
              <span>{toPersianNumbers(supplement.dosage)}</span>
            </div>
          )}
          
          {supplement.timing && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium">زمان:</span>
              <span>{supplement.timing}</span>
            </div>
          )}

          {supplement.description && (
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {supplement.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex-1 h-9 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
          >
            <Edit className="w-4 h-4 ml-1" />
            ویرایش
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-9 px-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// List Item Component
const AdvancedSupplementListItem: React.FC<{
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
  activeTab: string;
}> = ({ supplement, onEdit, onDelete, activeTab }) => {
  const TypeIcon = activeTab === 'supplement' ? Pill : Zap;

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-l from-white via-purple-50/20 to-indigo-50/10 border border-white/60 hover:shadow-lg transition-all duration-300 rounded-2xl">
      <div className="p-6">
        <div className="flex items-center gap-6">
          {/* Icon */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0",
            activeTab === 'supplement' 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-blue-500 to-cyan-600"
          )}>
            <TypeIcon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800 mb-1">
                  {supplement.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                    {supplement.category}
                  </Badge>
                  {supplement.dosage && (
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-500" />
                      {toPersianNumbers(supplement.dosage)}
                    </span>
                  )}
                  {supplement.timing && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      {supplement.timing}
                    </span>
                  )}
                </div>
                {supplement.description && (
                  <p className="text-sm text-slate-500 mt-2 line-clamp-1">
                    {supplement.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="h-9 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  ویرایش
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="h-9 px-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
