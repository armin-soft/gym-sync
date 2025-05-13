
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  ListFilter,
  LayoutGrid,
  List
} from "lucide-react";
import { useStudents } from "@/hooks/students";
import { useToast } from "@/hooks/use-toast";
import { SupplementList } from "@/components/supplements/list";

export const SupplementContent: React.FC = () => {
  const { supplements, setSupplements } = useStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  
  const categories = [
    { id: "all", name: "همه مکمل‌ها" },
    { id: "protein", name: "پروتئین" },
    { id: "creatine", name: "کراتین" },
    { id: "preworkout", name: "پیش از تمرین" },
    { id: "vitamins", name: "ویتامین‌ها" },
    { id: "recovery", name: "ریکاوری" },
  ];
  
  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = searchQuery === "" || 
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || 
      supplement.type === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });
  
  const handleAddNewSupplement = () => {
    toast({
      title: "افزودن مکمل جدید",
      description: "این قابلیت به زودی اضافه خواهد شد",
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Header Section with Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="جستجو در مکمل‌ها..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-dashed"
            >
              {viewMode === "grid" ? (
                <List className="h-4 w-4" />
              ) : (
                <LayoutGrid className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              onClick={handleAddNewSupplement}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <Plus className="mr-1 h-4 w-4" /> افزودن مکمل
            </Button>
          </div>
        </div>
        
        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="w-full"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Main Content Area */}
          <TabsContent value={selectedCategory} className="mt-6">
            {filteredSupplements.length > 0 ? (
              <SupplementList 
                supplements={filteredSupplements}
                viewMode={viewMode}
              />
            ) : (
              <Card className="w-full border-dashed bg-card/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Pill className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">هیچ مکملی یافت نشد</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">
                    {searchQuery ? "مکملی با این مشخصات یافت نشد." : "هنوز مکملی اضافه نشده است."}
                  </p>
                  <Button
                    onClick={handleAddNewSupplement}
                    variant="default"
                    className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="mr-1 h-4 w-4" /> افزودن مکمل
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};
