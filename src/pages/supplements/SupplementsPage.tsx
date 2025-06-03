
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/supplements";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { TabSystem } from "./components/TabSystem";
import { CategoryManager } from "./components/CategoryManager";
import { ItemsGrid } from "./components/ItemsGrid";
import { AddEditDialog } from "./components/AddEditDialog";
import { CategoryDialog } from "./components/CategoryDialog";
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory(null); // Reset category selection when changing tabs
  };

  const supplementCount = supplements.filter(s => s.type === 'supplement').length;
  const vitaminCount = supplements.filter(s => s.type === 'vitamin').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50" dir="rtl">
      <PageContainer fullHeight fullWidth noPadding scrollable className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen"
        >
          {/* Header */}
          <SupplementsHeader />
          
          {/* Main Content */}
          <div className="container mx-auto px-6 py-12 space-y-8">
            {/* Tab System */}
            <TabSystem
              activeTab={activeTab}
              onTabChange={handleTabChange}
              supplementCount={supplementCount}
              vitaminCount={vitaminCount}
              onAddClick={handleAddSupplement}
            />

            {/* Category Manager */}
            <CategoryManager
              categories={relevantCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              activeTab={activeTab}
            />

            {/* Items Grid - Only show when a category is selected */}
            {selectedCategory && (
              <ItemsGrid
                items={filteredSupplements}
                onEdit={handleEditSupplement}
                onDelete={handleDeleteSupplement}
                activeTab={activeTab}
                selectedCategory={selectedCategory}
              />
            )}
          </div>

          {/* Dialogs */}
          <AddEditDialog
            open={supplementDialogOpen}
            onOpenChange={setSupplementDialogOpen}
            onSubmit={handleSubmitSupplement}
            defaultValues={editingSupplement || undefined}
            mode={editingSupplement ? "edit" : "add"}
            categories={relevantCategories}
            type={activeTab}
          />

          <CategoryDialog
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
