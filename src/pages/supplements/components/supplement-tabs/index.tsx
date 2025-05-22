
import { Tabs } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FlaskConical, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { Button } from "@/components/ui/button";

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

export const SupplementTabs: React.FC<SupplementTabsProps> = ({
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
}) => {
  const deviceInfo = useDeviceInfo();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary m-auto"></div>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 h-full w-full overflow-hidden"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="flex flex-col flex-1 h-full w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 md:mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 md:h-16 overflow-hidden rounded-2xl shadow-lg border border-white/20 dark:border-gray-800/50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
            <TabsTrigger 
              value="supplement" 
              className={cn(
                "relative gap-2 sm:gap-3 text-base sm:text-lg font-medium",
                "transition-all duration-300 ease-in-out",
                "data-[state=active]:text-white data-[state=active]:shadow-inner",
                "hover:bg-purple-50 dark:hover:bg-purple-950/20",
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600"
              )}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "rounded-full flex items-center justify-center",
                  activeTab === "supplement" ? "bg-white/20" : "bg-purple-100 dark:bg-purple-900/40",
                  deviceInfo.isMobile ? "p-1" : "p-2"
                )}
              >
                <FlaskConical className={cn(
                  deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6",
                  activeTab === "supplement" ? "text-white" : "text-purple-600 dark:text-purple-400"
                )} />
              </motion.div>
              مکمل ها
            </TabsTrigger>
            <TabsTrigger 
              value="vitamin" 
              className={cn(
                "relative gap-2 sm:gap-3 text-base sm:text-lg font-medium",
                "transition-all duration-300 ease-in-out",
                "data-[state=active]:text-white data-[state=active]:shadow-inner",
                "hover:bg-blue-50 dark:hover:bg-blue-950/20",
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600"
              )}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "rounded-full flex items-center justify-center",
                  activeTab === "vitamin" ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900/40",
                  deviceInfo.isMobile ? "p-1" : "p-2"
                )}
              >
                <Pill className={cn(
                  deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6",
                  activeTab === "vitamin" ? "text-white" : "text-blue-600 dark:text-blue-400"
                )} />
              </motion.div>
              ویتامین ها
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        {/* Content for each tab */}
        <TabContent 
          activeTab={activeTab}
          categories={categories.filter(c => c.type === activeTab)}
          onAddCategory={onAddCategory}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          supplements={supplements.filter(s => s.type === activeTab)}
          onAddSupplement={onAddSupplement}
          onEditSupplement={onEditSupplement}
          onDeleteSupplement={onDeleteSupplement}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </Tabs>
    </motion.div>
  );
};

// Tab content component
const TabContent: React.FC<{
  activeTab: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({
  activeTab,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  onSelectCategory,
}) => {
  const deviceInfo = useDeviceInfo();

  return (
    <TabsContent value={activeTab} className="m-0 flex-1 flex flex-col space-y-4 sm:space-y-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10"
      >
        <CategoryTable 
          categories={categories}
          onAdd={onAddCategory}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 overflow-hidden"
      >
        <Card className={cn(
          "h-full shadow-md border-muted/30",
          activeTab === "supplement" 
            ? "bg-gradient-to-br from-purple-50/50 to-violet-100/50 dark:from-purple-950/20 dark:to-violet-900/20" 
            : "bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-blue-950/20 dark:to-indigo-900/20"
        )}>
          <div className="p-4 h-full">
            <SupplementContent 
              supplements={supplements}
              onAddSupplement={onAddSupplement}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              activeTab={activeTab}
            />
          </div>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

// Supplement content component
const SupplementContent: React.FC<{
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
}> = ({
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter supplements based on search query
  const filteredSupplements = React.useMemo(() => {
    if (!searchQuery.trim()) return supplements;
    
    return supplements.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [supplements, searchQuery]);

  // Empty state if no supplements found
  if (supplements.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <EmptyState 
          icon={activeTab === 'supplement' ? "Flask" : "Pill"}
          title={`هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد`}
          description={`برای افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید، روی دکمه زیر کلیک کنید`}
          action={{
            label: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید`,
            onClick: onAddSupplement
          }}
        />
      </div>
    );
  }

  // Main content with search and list
  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="mb-4 relative text-right" dir="rtl">
        <input
          type="search"
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-10 border rounded-lg text-right"
        />
        <span className="absolute left-3 top-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>
      
      {/* Add button */}
      <div className="mb-4 flex justify-end">
        <Button 
          onClick={onAddSupplement}
          className={cn(
            "gap-1.5 text-white shadow-lg",
            activeTab === 'supplement' 
              ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          )}
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      </div>
    
      {/* List of supplements */}
      <div className="flex-1 overflow-auto">
        {filteredSupplements.length === 0 ? (
          <div className="text-center py-8">
            <p>هیچ موردی یافت نشد</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
              پاک کردن جستجو
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSupplements.map(item => (
              <SupplementItem 
                key={item.id} 
                item={item}
                onEdit={() => onEditSupplement(item)}
                onDelete={() => onDeleteSupplement(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Supplement item component
const SupplementItem: React.FC<{
  item: Supplement;
  onEdit: () => void;
  onDelete: () => void;
}> = ({
  item,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 border-2 hover:border-indigo-300 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
              {item.category}
            </Badge>
            {item.dosage && (
              <p className="text-xs mt-2 text-gray-600">
                <span className="font-medium">دوز مصرف: </span>
                {item.dosage}
              </p>
            )}
            {item.timing && (
              <p className="text-xs text-gray-600">
                <span className="font-medium">زمان مصرف: </span>
                {item.timing}
              </p>
            )}
          </div>
          <div className="flex space-x-1 rtl:space-x-reverse">
            <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
