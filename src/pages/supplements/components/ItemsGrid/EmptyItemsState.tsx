
import React from "react";
import { Pill, Heart } from "lucide-react";

interface EmptyItemsStateProps {
  activeTab: "supplement" | "vitamin";
  searchQuery: string;
  selectedCategory: string | null;
}

export const EmptyItemsState: React.FC<EmptyItemsStateProps> = ({
  activeTab,
  searchQuery,
  selectedCategory,
}) => {
  const getGradientColors = () => {
    return activeTab === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  return (
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
  );
};
