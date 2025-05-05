
import { useState, useEffect } from "react";
import { useSupplementsManager } from "@/hooks/useSupplementsManager";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { SupplementsHeader } from "./components/SupplementsHeader";
import { SupplementCategorySection } from "./components/SupplementCategorySection";
import { SupplementsContent } from "./components/SupplementsContent";
import { SupplementsEmptyState } from "./components/SupplementsEmptyState";
import { SupplementDialog } from "./dialogs/SupplementDialog";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { Loader2, BellPlus } from "lucide-react";

const SupplementsPage = () => {
  const deviceInfo = useDeviceInfo();
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
  
  const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Variant for animations based on device
  const getContainerVariants = () => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: deviceInfo.isMobile ? 0.1 : 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  });
  
  const getItemVariants = () => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  });

  // Dialog handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category) => {
    deleteCategory(category);
  };

  const handleAddSupplement = () => {
    if (relevantCategories.length === 0) {
      // Show a toast notification and prompt to create a category first
      setSettingsDialogOpen(true);
      return;
    }
    setEditingSupplement(null);
    setSupplementDialogOpen(true);
  };

  const handleEditSupplement = (supplement) => {
    setEditingSupplement(supplement);
    setSupplementDialogOpen(true);
  };

  const handleDeleteSupplement = (id) => {
    deleteSupplement(id);
  };

  const handleCategorySubmit = (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
    } else {
      addCategory(name);
    }
    setCategoryDialogOpen(false);
  };

  const handleSupplementSubmit = (data) => {
    if (editingSupplement) {
      updateSupplement(editingSupplement.id, data);
    } else {
      addSupplement(data);
    }
    setSupplementDialogOpen(false);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 min-h-screen">
      <SupplementsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-xl text-muted-foreground font-medium">در حال بارگذاری...</p>
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={getContainerVariants()}
          className="mt-8 space-y-6"
        >
          {relevantCategories.length > 0 ? (
            <>
              <motion.div variants={getItemVariants()}>
                <SupplementCategorySection 
                  categories={relevantCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onAddCategory={handleAddCategory}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                  activeTab={activeTab}
                />
              </motion.div>
              
              <motion.div variants={getItemVariants()}>
                <SupplementsContent 
                  supplements={filteredSupplements}
                  onAddSupplement={handleAddSupplement}
                  onEditSupplement={handleEditSupplement}
                  onDeleteSupplement={handleDeleteSupplement}
                  activeTab={activeTab}
                />
              </motion.div>
            </>
          ) : (
            <motion.div variants={getItemVariants()}>
              <SupplementsEmptyState 
                activeTab={activeTab} 
                onAddCategory={handleAddCategory}
              />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Dialogs */}
      <SupplementDialog
        open={supplementDialogOpen}
        onOpenChange={setSupplementDialogOpen}
        onSubmit={handleSupplementSubmit}
        defaultValues={editingSupplement || undefined}
        mode={editingSupplement ? "edit" : "add"}
        categories={relevantCategories}
        type={activeTab}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSubmit={handleCategorySubmit}
        defaultValue={editingCategory?.name}
        mode={editingCategory ? "edit" : "add"}
        type={activeTab}
      />
      
      <SettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default SupplementsPage;
