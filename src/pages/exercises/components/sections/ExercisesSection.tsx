
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Dumbbell, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  FolderTree,
  Tag,
  ArrowRight,
  Grid3X3,
  List
} from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ExercisesSectionProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  selectedCategoryId: string | null;
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
}

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({
  exercises,
  categories,
  selectedCategoryId,
  onViewChange
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newExerciseName, setNewExerciseName] = useState("");
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState(selectedCategoryId || "");
  const [editingExercise, setEditingExercise] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategoryId || exercise.categoryId.toString() === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  const selectedCategory = categories.find(c => c.id.toString() === selectedCategoryId);

  const handleAddExercise = async () => {
    if (!newExerciseName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید"
      });
      return;
    }

    if (!selectedCategoryForAdd) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً دسته‌بندی را انتخاب کنید"
      });
      return;
    }

    const newExercise: Exercise = {
      id: Date.now(),
      name: newExerciseName.trim(),
      categoryId: parseInt(selectedCategoryForAdd)
    };

    const updatedExercises = [...exercises, newExercise];
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    queryClient.setQueryData(["exercises"], updatedExercises);
    
    setNewExerciseName("");
    setIsAddMode(false);
    
    toast({
      title: "موفقیت",
      description: "حرکت جدید با موفقیت اضافه شد"
    });
  };

  const handleEditExercise = async (exerciseId: number) => {
    if (!editingName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام جدید را وارد کنید"
      });
      return;
    }

    const updatedExercises = exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, name: editingName.trim() }
        : exercise
    );
    
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    queryClient.setQueryData(["exercises"], updatedExercises);
    
    setEditingExercise(null);
    setEditingName("");
    
    toast({
      title: "موفقیت",
      description: "حرکت با موفقیت ویرایش شد"
    });
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    const updatedExercises = exercises.filter(exercise => exercise.id !== exerciseId);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    queryClient.setQueryData(["exercises"], updatedExercises);
    
    toast({
      title: "موفقیت",
      description: "حرکت با موفقیت حذف شد"
    });
  };

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
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                مدیریت حرکات تمرینی
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {toPersianNumbers(filteredExercises.length)} حرکت
                {selectedCategory && ` در دسته ${selectedCategory.name}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              onClick={() => setIsAddMode(true)}
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن حرکت
            </Button>
          </div>
        </div>

        {/* Breadcrumb */}
        {selectedCategory && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("types")}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              <Tag className="w-4 h-4 ml-1" />
              انواع تمرین
            </Button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("categories")}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              <FolderTree className="w-4 h-4 ml-1" />
              دسته‌بندی‌ها
            </Button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {selectedCategory.name}
            </span>
          </div>
        )}
      </motion.div>

      {/* Search and Controls */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <div className="p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در حرکات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700"
              />
            </div>

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
                    placeholder="نام حرکت جدید..."
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                    className="flex-1 bg-white dark:bg-gray-800"
                    autoFocus
                  />
                  <select
                    value={selectedCategoryForAdd}
                    onChange={(e) => setSelectedCategoryForAdd(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.type})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddExercise}
                    className="bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                  >
                    افزودن
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddMode(false);
                      setNewExerciseName("");
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

      {/* Exercises Grid/List */}
      <motion.div variants={itemVariants}>
        <div className={cn(
          "grid gap-4",
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}>
          {filteredExercises.map((exercise, index) => {
            const category = categories.find(c => c.id === exercise.categoryId);
            
            return (
              <motion.div
                key={exercise.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 overflow-hidden group">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {toPersianNumbers(index + 1)}
                        </div>
                        
                        {category && (
                          <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                            {category.name}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingExercise(exercise.id);
                            setEditingName(exercise.name);
                          }}
                          className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteExercise(exercise.id)}
                          className="w-8 h-8 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {editingExercise === exercise.id ? (
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
                            onClick={() => handleEditExercise(exercise.id)}
                            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs"
                          >
                            ذخیره
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingExercise(null);
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
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">
                          {exercise.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {category ? `دسته ${category.name} - نوع ${category.type}` : "بدون دسته‌بندی"}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredExercises.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="p-12 text-center">
              <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ حرکتی موجود نیست"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm 
                  ? "جستجوی خود را تغییر دهید" 
                  : "برای شروع، یک حرکت جدید اضافه کنید"
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsAddMode(true)}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن حرکت
                </Button>
              )}
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};
