
import { useState, useEffect } from "react";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { useToast } from "@/hooks/use-toast";

interface UseStudentSupplementsReturn {
  supplements: Supplement[];
  categories: SupplementCategory[];
  activeTab: "supplements" | "vitamins";
  setActiveTab: (tab: "supplements" | "vitamins") => void;
  selectedSupplements: number[];
  selectedVitamins: number[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItems: Supplement[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  toggleItem: (id: number) => void;
  isSelected: (id: number) => boolean;
  relevantCategories: SupplementCategory[];
  getSelectedCount: () => number;
  handleSave: (onSave: (data: {supplements: number[], vitamins: number[]}) => boolean) => void;
}

export const useStudentSupplements = (
  initialSupplements: number[] = [],
  initialVitamins: number[] = [],
  deviceIsMobile: boolean = false
): UseStudentSupplementsReturn => {
  const { toast } = useToast();
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(deviceIsMobile ? "list" : "grid");
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Initialize with provided values when dialog opens
  useEffect(() => {
    setSelectedSupplements([...initialSupplements]);
    setSelectedVitamins([...initialVitamins]);
  }, [initialSupplements, initialVitamins]);
  
  // Load data from localStorage
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem("supplements");
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        setSupplements(Array.isArray(parsedSupplements) ? parsedSupplements : []);
      }

      const savedCategories = localStorage.getItem("supplementCategories");
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(Array.isArray(parsedCategories) ? parsedCategories : []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setSupplements([]);
      setCategories([]);
    }
  }, []);
  
  // Filter items based on search query, active tab and category
  useEffect(() => {
    let filtered = supplements;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab === "supplements") {
      filtered = filtered.filter(item => item.type === "supplement");
    } else {
      filtered = filtered.filter(item => item.type === "vitamin");
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, supplements, activeTab, selectedCategory]);
  
  // Toggle selection of an item
  const toggleItem = (id: number) => {
    if (activeTab === "supplements") {
      setSelectedSupplements(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    }
  };
  
  // Handle save action
  const handleSave = (onSave: (data: {supplements: number[], vitamins: number[]}) => boolean) => {
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: `برنامه ${activeTab === "supplements" ? "مکمل" : "ویتامین"} با موفقیت ذخیره شد`,
        duration: 3000,
      });
      return true;
    } else {
      toast({
        title: "خطا در ذخیره سازی",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };
  
  // Check if an item is selected
  const isSelected = (id: number) => {
    return activeTab === "supplements" 
      ? selectedSupplements.includes(id) 
      : selectedVitamins.includes(id);
  };
  
  // Get categories relevant to the active tab
  const relevantCategories = categories.filter(cat => 
    cat.type === (activeTab === "supplements" ? "supplement" : "vitamin")
  );
  
  // Get count of selected items for active tab
  const getSelectedCount = () => {
    return activeTab === "supplements" 
      ? selectedSupplements.length 
      : selectedVitamins.length;
  };
  
  return {
    supplements,
    categories,
    activeTab,
    setActiveTab,
    selectedSupplements,
    selectedVitamins,
    searchQuery,
    setSearchQuery,
    filteredItems,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    toggleItem,
    isSelected,
    relevantCategories,
    getSelectedCount,
    handleSave
  };
};
