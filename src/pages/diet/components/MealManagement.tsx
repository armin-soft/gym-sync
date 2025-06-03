
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Edit, Trash2, MoreVertical } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface MealManagementProps {
  meals: any[];
  isLoading: boolean;
}

export const MealManagement: React.FC<MealManagementProps> = ({
  meals,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const mealTypes = [
    { value: "all", label: "همه وعده‌ها", color: "bg-gray-100 text-gray-800" },
    { value: "صبحانه", label: "صبحانه", color: "bg-orange-100 text-orange-800" },
    { value: "میان‌وعده صبح", label: "میان‌وعده صبح", color: "bg-yellow-100 text-yellow-800" },
    { value: "ناهار", label: "ناهار", color: "bg-green-100 text-green-800" },
    { value: "میان‌وعده عصر", label: "میان‌وعده عصر", color: "bg-blue-100 text-blue-800" },
    { value: "شام", label: "شام", color: "bg-purple-100 text-purple-800" },
    { value: "میان‌وعده شب", label: "میان‌وعده شب", color: "bg-pink-100 text-pink-800" },
  ];

  const sampleMeals = [
    {
      id: 1,
      name: "املت پروتئینی با سبزیجات",
      type: "صبحانه",
      calories: 320,
      protein: 25,
      carbs: 15,
      fat: 18,
      description: "املت سه تخم مرغ با اسفناج، قارچ و پنیر",
      day: "شنبه"
    },
    {
      id: 2,
      name: "سالاد مرغ گریل",
      type: "ناهار",
      calories: 420,
      protein: 35,
      carbs: 25,
      fat: 22,
      description: "سینه مرغ گریل شده با سالاد سبز و سس زیتون",
      day: "یکشنبه"
    },
    {
      id: 3,
      name: "آجیل و میوه خشک",
      type: "میان‌وعده عصر",
      calories: 180,
      protein: 8,
      carbs: 20,
      fat: 12,
      description: "ترکیبی از بادام، گردو و خرما",
      day: "دوشنبه"
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-10 w-24 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Search and Filters */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="جستجو در وعده‌های غذایی..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-12 text-right"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {mealTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                onClick={() => setSelectedType(type.value)}
                className={`whitespace-nowrap ${
                  selectedType === type.value
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "hover:bg-emerald-50"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
          
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8">
            <Plus className="w-4 h-4 ml-2" />
            افزودن وعده
          </Button>
        </div>
      </Card>

      {/* Meals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sampleMeals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-right flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {meal.description}
                  </p>
                  <div className="flex gap-2 mb-3">
                    <Badge className={
                      meal.type === "صبحانه" ? "bg-orange-100 text-orange-800" :
                      meal.type === "ناهار" ? "bg-green-100 text-green-800" :
                      "bg-blue-100 text-blue-800"
                    }>
                      {meal.type}
                    </Badge>
                    <Badge variant="outline">
                      {meal.day}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Nutrition Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">کالری</p>
                  <p className="font-bold text-gray-800">
                    {toPersianNumbers(meal.calories)}
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">پروتئین</p>
                  <p className="font-bold text-gray-800">
                    {toPersianNumbers(meal.protein)}g
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">کربوهیدرات</p>
                  <p className="font-bold text-gray-800">
                    {toPersianNumbers(meal.carbs)}g
                  </p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">چربی</p>
                  <p className="font-bold text-gray-800">
                    {toPersianNumbers(meal.fat)}g
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 ml-2" />
                  ویرایش
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
