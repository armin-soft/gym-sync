
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Heart } from "lucide-react";
import { SupplementsTabContent } from "./SupplementsTabContent";
import { Supplement, SupplementCategory } from "@/types/supplement";

interface SupplementsMainContentProps {
  activeTab: "supplement" | "vitamin";
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const SupplementsMainContent = ({
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
}: SupplementsMainContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto"
      dir="rtl"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="w-full"
        dir="rtl"
      >
        {/* Modern Tab Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-2">
            <TabsList className="grid w-full grid-cols-2 h-16 bg-transparent gap-2">
              <TabsTrigger 
                value="supplement" 
                className="h-12 rounded-xl flex items-center gap-3 data-[state=active]:bg-gradient-to-l data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Pill className="h-5 w-5" />
                <span className="text-lg font-bold">مکمل‌های غذایی</span>
              </TabsTrigger>
              <TabsTrigger 
                value="vitamin" 
                className="h-12 rounded-xl flex items-center gap-3 data-[state=active]:bg-gradient-to-l data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
                <span className="text-lg font-bold">ویتامین‌ها</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </motion.div>

        {/* Tab Contents */}
        <TabsContent value="supplement" className="m-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SupplementsTabContent
              type="supplement"
              isLoading={isLoading}
              categories={categories}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              supplements={supplements}
              onAddSupplement={onAddSupplement}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="vitamin" className="m-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SupplementsTabContent
              type="vitamin"
              isLoading={isLoading}
              categories={categories}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              supplements={supplements}
              onAddSupplement={onAddSupplement}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
