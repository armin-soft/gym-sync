
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
  selectedCategory
}: SupplementTabsProps) => {
  return (
    <Tabs 
      defaultValue="supplement" 
      value={activeTab}
      onValueChange={onTabChange} 
      className="space-y-4 sm:space-y-6"
    >
      <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10 md:h-12">
        <TabsTrigger value="supplement" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
          <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          مکمل ها
        </TabsTrigger>
        <TabsTrigger value="vitamin" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
          <Pill className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          ویتامین ها
        </TabsTrigger>
      </TabsList>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8 sm:py-10 md:py-12"
          >
            <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 animate-spin text-purple-500" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <TabsContent value="supplement" className="space-y-4 sm:space-y-6">
              <CategoryTable 
                categories={categories}
                onAdd={onAddCategory}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
              />
              {categories.length > 0 && (
                <SupplementContent 
                  type="supplement"
                  supplements={supplements}
                  onAdd={onAddSupplement}
                  onEdit={onEditSupplement}
                  onDelete={onDeleteSupplement}
                />
              )}
            </TabsContent>

            <TabsContent value="vitamin" className="space-y-4 sm:space-y-6">
              <CategoryTable 
                categories={categories}
                onAdd={onAddCategory}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
              />
              {categories.length > 0 && (
                <SupplementContent 
                  type="vitamin"
                  supplements={supplements}
                  onAdd={onAddSupplement}
                  onEdit={onEditSupplement}
                  onDelete={onDeleteSupplement}
                />
              )}
            </TabsContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
};
