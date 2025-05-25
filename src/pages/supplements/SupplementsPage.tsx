
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { AdvancedSupplementsHeader } from "./components/AdvancedSupplementsHeader";
import { AdvancedSupplementTabs } from "./components/AdvancedSupplementTabs";

const SupplementsPage = () => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();
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
      className="mx-auto py-0 px-0 space-y-0 max-w-none min-h-screen"
      fullWidth={true}
      fullHeight={true}
      withBackground={true}
      noPadding={true}
    >
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20" dir="rtl">
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-purple-500/8 via-indigo-500/5 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/8 via-cyan-500/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/6 to-teal-500/4 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-shrink-0 p-4 md:p-6"
          >
            <AdvancedSupplementsHeader />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex-1 overflow-hidden px-4 md:px-6 pb-6"
          >
            <AdvancedSupplementTabs 
              activeTab={activeTab}
              onTabChange={(value) => {
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
