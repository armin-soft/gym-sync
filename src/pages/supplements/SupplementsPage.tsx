
import { useState } from "react";
import { motion } from "framer-motion";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementTabs } from "./components/SupplementTabs";
import { SupplementDialog } from "@/components/supplements/SupplementDialog";
import { CategoryDialog } from "@/components/supplements/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";

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
  
  // Animation for page content
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
    <PageContainer 
      className="mx-auto py-0 px-0 space-y-0 max-w-none min-h-screen"
      fullWidth={true}
      fullHeight={true}
      withBackground={true}
      noPadding={true}
    >
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse" />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 sm:space-y-4 md:space-y-6 h-full flex flex-col"
          >
            <SupplementsHeader />
            
            <div className="flex-1 overflow-hidden">
              <SupplementTabs 
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
            </div>
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
