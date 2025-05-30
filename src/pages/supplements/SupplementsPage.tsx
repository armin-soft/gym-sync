
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
    }
  };

  // Supplement dialog handlers
  const handleAddSupplement = () => {
    if (relevantCategories.length === 0) {
      toast({
        title: `خطا در افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
        description: "لطفاً ابتدا یک دسته بندی ایجاد کنید",
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
        title: "دسته بندی با موفقیت ویرایش شد",
        variant: "default",
      });
    } else {
      addCategory(name);
      toast({
        title: "دسته بندی جدید با موفقیت ایجاد شد",
        variant: "default",
      });
    }
    setCategoryDialogOpen(false);
  };

  // Process supplement form
  const handleSubmitSupplement = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} با موفقیت ویرایش شد`,
        variant: "default",
      });
    } else {
      addSupplement(data);
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید با موفقیت اضافه شد`,
        variant: "default",
      });
    }
    setSupplementDialogOpen(false);
  };

  return (
    <PageContainer 
      fullHeight 
      fullWidth
      noPadding
      scrollable
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950"
    >
      <div className="h-full flex flex-col">
        <SupplementsHeader />
        
        <div className="flex-1 min-h-0 overflow-hidden px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6">
          <SupplementTabs 
            activeTab={activeTab}
            onTabChange={(value) => {
              setActiveTab(value as 'supplement' | 'vitamin');
            }}
            isLoading={isLoading}
            categories={relevantCategories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            supplements={filteredSupplements}
            onAddSupplement={handleAddSupplement}
            onEditSupplement={handleEditSupplement}
            onDeleteSupplement={deleteSupplement}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
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
  );
};

export default SupplementsPage;
