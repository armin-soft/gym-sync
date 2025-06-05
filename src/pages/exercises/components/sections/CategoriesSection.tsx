
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FolderTree, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Tag,
  ArrowRight
} from "lucide-react";
import { ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface CategoriesSectionProps {
  categories: ExerciseCategory[];
  exerciseTypes: string[];
  selectedTypeId: string | null;
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  exerciseTypes,
  selectedTypeId,
  selectedCategoryId,
  onCategorySelect,
  onViewChange
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedType, setSelectedType] = useState(selectedTypeId || exerciseTypes[0] || "");
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedTypeId || category.type === selectedTypeId)
  );

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام دسته‌بندی را وارد کنید"
      });
      return;
    }

    if (!selectedType) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نوع تمرین را انتخاب کنید"
      });
      return;
    }

    const newCategory: ExerciseCategory = {
      id: Date.now(),
      name: newCategoryName.trim(),
      type: selectedType
    };

    const updatedCategories = [...categories, newCategory];
    localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
    queryClient.setQueryData(["exerciseCategories"], updatedCategories);
    
    setNewCategoryName("");
    setIsAddMode(false);
    
    toast({
      title: "موفقیت",
      description: "دسته‌بندی جدید با موفقیت اضافه شد"
    });
  };

  const handleEditCategory = async (categoryId: number) => {
    if (!editingName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام جدید را وارد کنید"
      });
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === categoryId 
        ? { ...category, name: editingName.trim() }
        : category
    );
    
    localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
    queryClient.setQueryData(["exerciseCategories"], updatedCategories);
    
    setEditingCategory(null);
    setEditingName("");
    
    toast({
      title: "موفقیت",
      description: "دسته‌بندی با موفقیت ویرایش شد"
    });
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
    queryClient.setQueryData(["exerciseCategories"], updatedCategories);
    
    toast({
      title: "موفقیت",
      description: "دسته‌بندی با موفقیت حذف شد"
    });
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      className="h-full overflow-y-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <FolderTree className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                مدیریت دسته‌بندی‌ها
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {toPersianNumbers(filteredCategories.length)} دسته‌بندی
                {selectedTypeId && ` در نوع ${selectedTypeId}`}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsAddMode(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>

        {/* Breadcrumb */}
        {selectedTypeId && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("types")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <Tag className="w-4 h-4 ml-1" />
              انواع تمرین
            </Button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {selectedTypeId}
            </span>
          </div>
        )}
      </motion.div>

      {/* Search and Controls */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در دسته‌بندی‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-blue-200 dark:border-blue-700"
              />
            </div>

            {/* Type Filter */}
            {!selectedTypeId && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 self-center ml-2">
                  فیلتر بر اساس نوع:
                </span>
                {exerciseTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}

            {/* Add Mode */}
            {isAddMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="نام دسته‌بندی جدید..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 bg-white dark:bg-gray-800"
                    autoFocus
                  />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                  >
                    {exerciseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  >
                    افزودن
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddMode(false);
                      setNewCategoryName("");
                    }}
                  >
                    انصراف
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Categories Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={cn(
                "border-2 transition-all duration-300 cursor-pointer overflow-hidden group",
                selectedCategoryId === category.id.toString()
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              )}
              onClick={() => onCategorySelect(
                selectedCategoryId === category.id.toString() ? null : category.id.toString()
              )}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-xl transition-all duration-300",
                      selectedCategoryId === category.id.toString()
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50"
                    )}>
                      <FolderTree className="w-5 h-5" />
                    </div>
                    
                    <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                      {category.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(category.id);
                        setEditingName(category.name);
                      }}
                      className="w-8 h-8 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      className="w-8 h-8 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {editingCategory === category.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="text-sm"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleEditCategory(category.id)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs"
                      >
                        ذخیره
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingCategory(null);
                          setEditingName("");
                        }}
                        className="text-xs"
                      >
                        انصراف
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      دسته‌بندی تمرینات {category.type}
                    </p>
                  </div>
                )}

                {selectedCategoryId === category.id.toString() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700"
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewChange("exercises");
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm"
                    >
                      مشاهده حرکات
                    </Button>
                  </motion.div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="p-12 text-center">
              <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ دسته‌بندی موجود نیست"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm 
                  ? "جستجوی خود را تغییر دهید" 
                  : "برای شروع، یک دسته‌بندی جدید اضافه کنید"
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsAddMode(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن دسته‌بندی
                </Button>
              )}
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};
