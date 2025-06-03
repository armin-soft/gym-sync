
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid, List, Edit2, Trash2, Pill, Heart, Clock, Clipboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ItemsGridProps {
  items: Supplement[];
  onEdit: (item: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: "supplement" | "vitamin";
  selectedCategory: string | null;
}

export const ItemsGrid: React.FC<ItemsGridProps> = ({
  items,
  onEdit,
  onDelete,
  activeTab,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = items.filter(item => {
    const matchesType = item.type === activeTab;
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesCategory && matchesSearch;
  });

  const getGradientColors = () => {
    return activeTab === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  const getIconColors = () => {
    return activeTab === "supplement"
      ? "text-emerald-600"
      : "text-cyan-600";
  };

  const getBgColors = () => {
    return activeTab === "supplement"
      ? "bg-emerald-50 hover:bg-emerald-100"
      : "bg-cyan-50 hover:bg-cyan-100";
  };

  const ItemCard = ({ item }: { item: Supplement }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={`p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 ${getBgColors()}`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${getGradientColors()} rounded-xl`}>
            {activeTab === "supplement" ? (
              <Pill className="w-6 h-6 text-white" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-9 w-9 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-xl"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600 rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
          
          {item.category && (
            <Badge variant="outline" className={`mb-3 ${getIconColors()} border-current`}>
              {item.category}
            </Badge>
          )}

          {item.description && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
          )}

          <div className="space-y-2">
            {item.dosage && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clipboard className={`w-4 h-4 ${getIconColors()}`} />
                <span className="font-medium">دوز:</span>
                <span>{toPersianNumbers(item.dosage)}</span>
              </div>
            )}

            {item.timing && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className={`w-4 h-4 ${getIconColors()}`} />
                <span className="font-medium">زمان:</span>
                <span>{toPersianNumbers(item.timing)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-gradient-to-br ${getGradientColors()} rounded-2xl`}>
            {activeTab === "supplement" ? (
              <Pill className="w-6 h-6 text-white" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === "supplement" ? "مکمل‌های غذایی" : "ویتامین‌ها"}
            </h2>
            <p className="text-gray-500">
              {toPersianNumbers(filteredItems.length)} مورد
              {selectedCategory && ` در دسته‌بندی "${selectedCategory}"`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`h-10 w-10 p-0 rounded-xl ${
                viewMode === "grid" ? `bg-gradient-to-r ${getGradientColors()} text-white` : ""
              }`}
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`h-10 w-10 p-0 rounded-xl ${
                viewMode === "list" ? `bg-gradient-to-r ${getGradientColors()} text-white` : ""
              }`}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          placeholder={`جستجو در ${activeTab === "supplement" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-12 text-right border-2 border-gray-200 focus:border-emerald-400 rounded-2xl h-12"
          dir="rtl"
        />
      </div>

      {/* Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <div className={`w-24 h-24 bg-gradient-to-br ${getGradientColors()} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
            {activeTab === "supplement" ? (
              <Pill className="w-12 h-12 text-white" />
            ) : (
              <Heart className="w-12 h-12 text-white" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {searchQuery || selectedCategory
              ? "نتیجه‌ای یافت نشد"
              : `هیچ ${activeTab === "supplement" ? "مکملی" : "ویتامینی"} وجود ندارد`
            }
          </h3>
          <p className="text-gray-500 text-lg">
            {searchQuery || selectedCategory
              ? "جستجو یا فیلتر خود را تغییر دهید"
              : `اولین ${activeTab === "supplement" ? "مکمل" : "ویتامین"} خود را اضافه کنید`
            }
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className={`gap-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col"
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
