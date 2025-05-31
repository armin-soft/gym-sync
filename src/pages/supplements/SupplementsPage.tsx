
import { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementTabs } from "./components/supplement-tabs";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { useToast } from "@/hooks/use-toast";

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Use the custom hook for supplements management
  const {
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    // Tab actions
    setActiveTab,
    setSelectedCategory,
    
    // Category actions
    addCategory,
    updateCategory,
    deleteCategory,
    
    // Supplement actions
    addSupplement,
    updateSupplement,
    deleteSupplement
  } = useSupplementsManager();

  // Category dialog handlers
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
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
      });
    }
  };

  // Supplement dialog handlers
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

  // Process category form
  const handleSubmitCategory = (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
      toast({
        title: "دسته‌بندی ویرایش شد",
        description: `دسته‌بندی "${name}" با موفقیت ویرایش شد`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    } else {
      addCategory(name);
      toast({
        title: "دسته‌بندی جدید افزوده شد",
        description: `دسته‌بندی "${name}" با موفقیت ایجاد شد`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    }
    setCategoryDialogOpen(false);
  };

  // Process supplement form
  const handleSubmitSupplement = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} ویرایش شد`,
        description: `${data.name} با موفقیت ویرایش شد`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    } else {
      addSupplement(data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید افزوده شد`,
        description: `${data.name} با موفقیت اضافه شد`,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
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
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950" dir="rtl">
      <PageContainer 
        fullHeight 
        fullWidth
        noPadding
        scrollable
        className="min-h-screen"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <SupplementsHeader />
          
          {/* Main Content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <SupplementTabs 
                  activeTab={activeTab}
                  onTabChange={(value) => {
                    setActiveTab(value as 'supplement' | 'vitamin');
                    setSelectedCategory(null); // Reset category filter when switching tabs
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
              </motion.div>
            </div>
          </div>

          {/* Dialogs */}
          <SupplementDialog
            open={supplementDialogOpen}
            onOpenChange={setSupplementDialogOpen}
            onSubmit={handleSubmitSupplement}
            defaultValues={editingSupplement || undefined}
            mode={editingSupplement ? "edit" : "add"}
            categories={categories.filter(c => c.type === activeTab)}
            type={activeTab}
          />

          <CategoryDialog
            open={categoryDialogOpen}
            onOpenChange={setCategoryDialogOpen}
            onSubmit={handleSubmitCategory}
            defaultValue={editingCategory?.name}
            mode={editingCategory ? "edit" : "add"}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default SupplementsPage;
