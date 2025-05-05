
import { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementTabs } from "./components/SupplementTabs";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { useToast } from "@/hooks/use-toast";

const SupplementsPage = () => {
  const { toast } = useToast();
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Использование кастомного хука для управления добавками
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

  // Обработчики для диалогов категорий
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  // Обработчики для диалогов добавок
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

  // Обработка отправки формы категории
  const handleSubmitCategory = (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
    } else {
      addCategory(name);
    }
    setCategoryDialogOpen(false);
  };

  // Обработка отправки формы добавки
  const handleSubmitSupplement = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
    } else {
      addSupplement(data);
    }
    setSupplementDialogOpen(false);
  };

  // Анимация для содержимого страницы
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageContainer className="container mx-auto py-2 sm:py-4 md:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 sm:space-y-6 lg:space-y-8 h-full flex flex-col"
      >
        <SupplementsHeader />
        
        <SupplementTabs 
          activeTab={activeTab}
          onTabChange={(value) => {
            // Ensure we only set valid values
            setActiveTab(value as 'supplement' | 'vitamin');
          }}
          isLoading={isLoading}
          categories={relevantCategories}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={deleteCategory}
          supplements={filteredSupplements}
          onAddSupplement={handleAddSupplement}
          onEditSupplement={handleEditSupplement}
          onDeleteSupplement={deleteSupplement}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </motion.div>

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
    </PageContainer>
  );
};

export default SupplementsPage;
