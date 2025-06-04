
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Dumbbell,
  Crown
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface TypesSectionProps {
  exerciseTypes: string[];
  selectedTypeId: string | null;
  onTypeSelect: (typeId: string | null) => void;
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
}

export const TypesSection: React.FC<TypesSectionProps> = ({
  exerciseTypes,
  selectedTypeId,
  onTypeSelect,
  onViewChange
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filteredTypes = exerciseTypes.filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddType = async () => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع تمرین را وارد کنید"
      });
      return;
    }

    if (exerciseTypes.includes(newTypeName.trim())) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "این نوع تمرین قبلاً موجود است"
      });
      return;
    }

    const updatedTypes = [...exerciseTypes, newTypeName.trim()];
    localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
    queryClient.setQueryData(["exerciseTypes"], updatedTypes);
    
    setNewTypeName("");
    setIsAddMode(false);
    
    toast({
      title: "موفقیت",
      description: "نوع تمرین جدید با موفقیت اضافه شد"
    });
  };

  const handleEditType = async (oldName: string) => {
    if (!editingName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام جدید را وارد کنید"
      });
      return;
    }

    const updatedTypes = exerciseTypes.map(type => 
      type === oldName ? editingName.trim() : type
    );
    
    localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
    queryClient.setQueryData(["exerciseTypes"], updatedTypes);
    
    setEditingType(null);
    setEditingName("");
    
    toast({
      title: "موفقیت",
      description: "نوع تمرین با موفقیت ویرایش شد"
    });
  };

  const handleDeleteType = async (typeName: string) => {
    const updatedTypes = exerciseTypes.filter(type => type !== typeName);
    localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
    queryClient.setQueryData(["exerciseTypes"], updatedTypes);
    
    toast({
      title: "موفقیت",
      description: "نوع تمرین با موفقیت حذف شد"
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
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                مدیریت انواع تمرین
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {toPersianNumbers(exerciseTypes.length)} نوع تمرین موجود
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsAddMode(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن نوع جدید
          </Button>
        </div>
      </motion.div>

      {/* Search and Add */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
          <div className="p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در انواع تمرین..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-emerald-200 dark:border-emerald-700"
              />
            </div>

            {/* Add Mode */}
            {isAddMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2"
              >
                <Input
                  placeholder="نام نوع تمرین جدید..."
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  className="flex-1 bg-white dark:bg-gray-800"
                  autoFocus
                />
                <Button 
                  onClick={handleAddType}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                >
                  افزودن
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddMode(false);
                    setNewTypeName("");
                  }}
                >
                  انصراف
                </Button>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Types Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTypes.map((type, index) => (
            <motion.div
              key={type}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={cn(
                "border-2 transition-all duration-300 cursor-pointer overflow-hidden group",
                selectedTypeId === type
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
              )}
              onClick={() => onTypeSelect(selectedTypeId === type ? null : type)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-xl transition-all duration-300",
                      selectedTypeId === type
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50"
                    )}>
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    
                    {index === 0 && (
                      <Crown className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingType(type);
                        setEditingName(type);
                      }}
                      className="w-8 h-8 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteType(type);
                      }}
                      className="w-8 h-8 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {editingType === type ? (
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
                        onClick={() => handleEditType(type)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs"
                      >
                        ذخیره
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingType(null);
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
                      {type}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      دسته‌بندی اصلی تمرینات {type}
                    </p>
                  </div>
                )}

                {selectedTypeId === type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700"
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewChange("categories");
                      }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm"
                    >
                      مشاهده دسته‌بندی‌ها
                    </Button>
                  </motion.div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredTypes.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="p-12 text-center">
              <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ نوع تمرینی موجود نیست"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm 
                  ? "جستجوی خود را تغییر دهید" 
                  : "برای شروع، یک نوع تمرین جدید اضافه کنید"
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsAddMode(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن نوع تمرین
                </Button>
              )}
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};
