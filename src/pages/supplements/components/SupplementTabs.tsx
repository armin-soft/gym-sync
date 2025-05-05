
import { FlaskConical, Pill, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { SupplementContent } from "./SupplementContent";
import type { Supplement, SupplementCategory } from "@/types/supplement";

interface SupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SupplementTabs = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
}: SupplementTabsProps) => {
  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      } 
    }
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <Tabs 
      defaultValue="supplement" 
      value={activeTab}
      onValueChange={onTabChange} 
      className="flex-1 flex flex-col"
    >
      {/* Animated Tab Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12 md:h-14 mb-4 sm:mb-6">
          <TabsTrigger 
            value="supplement" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-500/10 data-[state=active]:text-purple-600 transition-all duration-300 text-sm sm:text-base"
          >
            <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            مکمل ها
          </TabsTrigger>
          <TabsTrigger 
            value="vitamin" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-600 transition-all duration-300 text-sm sm:text-base"
          >
            <Pill className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            ویتامین ها
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 flex-1"
          >
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-purple-500 mb-4" />
            <p className="text-sm sm:text-base text-muted-foreground">در حال بارگذاری...</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4 sm:space-y-6 flex-1 flex flex-col"
          >
            <TabsContent value="supplement" className="space-y-4 sm:space-y-6 m-0 flex-1 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CategoryTable 
                  categories={categories}
                  onAdd={onAddCategory}
                  onEdit={onEditCategory}
                  onDelete={onDeleteCategory}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </motion.div>
              
              {categories.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex-1"
                >
                  <SupplementContent 
                    type="supplement"
                    supplements={supplements}
                    onAdd={onAddSupplement}
                    onEdit={onEditSupplement}
                    onDelete={onDeleteSupplement}
                  />
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="vitamin" className="space-y-4 sm:space-y-6 m-0 flex-1 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CategoryTable 
                  categories={categories}
                  onAdd={onAddCategory}
                  onEdit={onEditCategory}
                  onDelete={onDeleteCategory}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </motion.div>
              
              {categories.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex-1"
                >
                  <SupplementContent 
                    type="vitamin"
                    supplements={supplements}
                    onAdd={onAddSupplement}
                    onEdit={onEditSupplement}
                    onDelete={onDeleteSupplement}
                  />
                </motion.div>
              )}
            </TabsContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
};
