
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Edit, Eye } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface WeeklyPlanViewProps {
  weeklyPlans: any[];
  isLoading: boolean;
}

export const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({
  weeklyPlans,
  isLoading,
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const weekDays = [
    "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", 
    "چهارشنبه", "پنج‌شنبه", "جمعه"
  ];

  const mealTypes = [
    { name: "صبحانه", color: "bg-orange-100 text-orange-800" },
    { name: "میان‌وعده صبح", color: "bg-yellow-100 text-yellow-800" },
    { name: "ناهار", color: "bg-green-100 text-green-800" },
    { name: "میان‌وعده عصر", color: "bg-blue-100 text-blue-800" },
    { name: "شام", color: "bg-purple-100 text-purple-800" },
    { name: "میان‌وعده شب", color: "bg-pink-100 text-pink-800" },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Card key={index} className="p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
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
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <h3 className="text-xl font-bold text-gray-800">
            هفته {toPersianNumbers(currentWeek + 1)} - آذر ۱۴۰۳
          </h3>
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <Plus className="w-4 h-4 ml-2" />
          برنامه جدید
        </Button>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day, dayIndex) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
          >
            <Card className="p-4 h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{day}</h4>
                <Badge variant="outline" className="text-xs">
                  {toPersianNumbers(6)} وعده
                </Badge>
              </div>
              
              <div className="space-y-3">
                {mealTypes.map((meal, mealIndex) => (
                  <div
                    key={meal.name}
                    className="p-3 rounded-lg border border-gray-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs ${meal.color}`}>
                        {meal.name}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-right">
                      {mealIndex % 2 === 0 ? "املت با نان سبوس‌دار" : "میوه و آجیل"}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
