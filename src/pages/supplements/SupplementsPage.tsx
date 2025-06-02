
import { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/supplements";
import { PageContainer } from "@/components/ui/page-container";
import { ModernSupplementsHeader } from "./components/modern/ModernSupplementsHeader";
import { ModernTabSystem } from "./components/modern/ModernTabSystem";
import { ModernSupplementDialog } from "./components/modern/ModernSupplementDialog";
import { ModernCategoryDialog } from "./components/modern/ModernCategoryDialog";
import { useToast } from "@/hooks/use-toast";

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    setActiveTab,
    setSelectedCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement
  } = useSupplementsManager();

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    const categoryToDelete = relevantCategories.find(c => c.id === categoryId);
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      toast({
        title: "دسته‌بندی حذف شد",
        description: `دسته‌بندی "${categoryToDelete.name}" با موفقیت حذف شد`,
      });
    }
  };

  const handleAddSupplement = () => {
    if (relevantCategories.length === 0) {
      toast({
        title: `خطا در افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: "لطفاً ابتدا یک دسته‌بندی ایجاد کنید",
        variant: "destructive",
      });
      return;
    }
    setEditingSupplement(null);
    setSupplementDialogOpen(true);
  };

  const handleEditSupplement = (supplement) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  const handleSubmitCategory = (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
      toast({
        title: "دسته‌بندی ویرایش شد",
        description: `دسته‌بندی "${name}" با موفقیت ویرایش شد`,
      });
    } else {
      addCategory(name);
      toast({
        title: "دسته‌بندی جدید افزوده شد",
        description: `دسته‌بندی "${name}" با موفقیت ایجاد شد`,
      });
    }
    setCategoryDialogOpen(false);
  };

  const handleSubmitSupplement = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} ویرایش شد`,
        description: `${data.name} با موفقیت ویرایش شد`,
      });
    } else {
      addSupplement(data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید افزوده شد`,
        description: `${data.name} با موفقیت اضافه شد`,
      });
    }
    setSupplementDialogOpen(false);
  };

  const handleDeleteSupplement = (supplementId: number) => {
    const supplement = supplements.find(s => s.id === supplementId);
    if (supplement) {
      deleteSupplement(supplementId);
      toast({
        title: `${supplement.type === 'supplement' ? 'مکمل' : 'ویتامین'} حذف شد`,
        description: `${supplement.name} با موفقیت حذف شد`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <PageContainer fullHeight fullWidth noPadding scrollable className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col"
        >
          <ModernSupplementsHeader />
          
          <div className="flex-1 p-6">
            <ModernTabSystem
              activeTab={activeTab}
              onTabChange={(value) => {
                setActiveTab(value as 'supplement' | 'vitamin');
                setSelectedCategory(null);
              }}
              isLoading={isLoading}
              categories={relevantCategories}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              supplements={filteredSupplements}
              onAddSupplement={handleAddSupplement}
              onEditSupplement={handleEditSupplement}
              onDeleteSupplement={handleDeleteSupplement}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <ModernSupplementDialog
            open={supplementDialogOpen}
            onOpenChange={setSupplementDialogOpen}
            onSubmit={handleSubmitSupplement}
            defaultValues={editingSupplement || undefined}
            mode={editingSupplement ? "edit" : "add"}
            categories={categories.filter(c => c.type === activeTab)}
            type={activeTab}
          />

          <ModernCategoryDialog
            open={categoryDialogOpen}
            onOpenChange={setCategoryDialogOpen}
            onSubmit={handleSubmitCategory}
            defaultValue={editingCategory?.name}
            mode={editingCategory ? "edit" : "add"}
          />
        </motion.div>
      </PageContainer>
    </div>
  );
};

export default SupplementsPage;
