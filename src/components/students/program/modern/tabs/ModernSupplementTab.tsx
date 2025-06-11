
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Pill, 
  Calendar,
  Zap,
  Shield,
  CheckCircle,
  Search,
  RotateCcw,
  Heart,
  Brain,
  Sparkles
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";

interface ModernSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const ModernSupplementTab: React.FC<ModernSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements,
  selectedDay,
  setSelectedDay
}) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const { toast } = useToast();

  // Load supplements for the selected day
  useEffect(() => {
    const supplementDayKey = `supplementsDay${selectedDay}`;
    const vitaminDayKey = `vitaminsDay${selectedDay}`;
    
    if (student[supplementDayKey]) {
      setSelectedSupplements(student[supplementDayKey]);
    } else if (student.supplements) {
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }

    if (student[vitaminDayKey]) {
      setSelectedVitamins(student[vitaminDayKey]);
    } else if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student, selectedDay]);

  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || supplement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleSupplement = (supplementId: number, type: 'supplement' | 'vitamin') => {
    if (type === 'supplement') {
      setSelectedSupplements(prev => {
        if (prev.includes(supplementId)) {
          return prev.filter(id => id !== supplementId);
        } else {
          return [...prev, supplementId];
        }
      });
    } else {
      setSelectedVitamins(prev => {
        if (prev.includes(supplementId)) {
          return prev.filter(id => id !== supplementId);
        } else {
          return [...prev, supplementId];
        }
      });
    }
  };

  const handleSave = () => {
    const success = onSaveSupplements({
      supplements: selectedSupplements,
      vitamins: selectedVitamins,
      day: selectedDay
    }, student.id);
    
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: `مکمل‌های روز ${toPersianNumbers(selectedDay)} ذخیره شد`,
      });
    }
  };

  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  const types = Array.from(new Set(supplements.map(s => s.type))).filter(Boolean);

  const getSupplementTypeIcon = (type: string) => {
    switch (type) {
      case 'پروتئین': return <Heart className="w-4 h-4 text-red-500" />;
      case 'ویتامین': return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'مولتی ویتامین': return <Shield className="w-4 h-4 text-green-500" />;
      case 'امگا ۳': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'کراتین': return <Zap className="w-4 h-4 text-orange-500" />;
      default: return <Pill className="w-4 h-4 text-purple-500" />;
    }
  };

  const getSupplementTypeColor = (type: string) => {
    switch (type) {
      case 'پروتئین': return 'from-red-50 to-rose-50 border-red-200 text-red-700';
      case 'ویتامین': return 'from-yellow-50 to-amber-50 border-yellow-200 text-yellow-700';
      case 'مولتی ویتامین': return 'from-green-50 to-emerald-50 border-green-200 text-green-700';
      case 'امگا ۳': return 'from-blue-50 to-sky-50 border-blue-200 text-blue-700';
      case 'کراتین': return 'from-orange-50 to-red-50 border-orange-200 text-orange-700';
      default: return 'from-purple-50 to-indigo-50 border-purple-200 text-purple-700';
    }
  };

  const isSelected = (supplementId: number) => {
    return selectedSupplements.includes(supplementId) || selectedVitamins.includes(supplementId);
  };

  const getSelectedType = (supplementId: number) => {
    if (selectedSupplements.includes(supplementId)) return 'supplement';
    if (selectedVitamins.includes(supplementId)) return 'vitamin';
    return null;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Day Selector */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200/50 dark:border-rose-700/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-700 dark:text-rose-300">انتخاب روز</h3>
                <p className="text-sm text-rose-600 dark:text-rose-400">روز مورد نظر برای مکمل‌ها را انتخاب کنید</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-rose-700 dark:text-rose-300">
              {toPersianNumbers(selectedSupplements.length + selectedVitamins.length)} مکمل انتخاب شده
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3">
            {days.map(day => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                className={`p-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg mb-1">{toPersianNumbers(day)}</div>
                  <div className="text-xs opacity-75">روز</div>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجوی مکمل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-gray-200 dark:border-gray-700 focus:border-rose-500 dark:focus:border-rose-400"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-rose-500 dark:focus:border-rose-400"
              >
                <option value="all">همه انواع</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                }}
                className="border-gray-200 dark:border-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredSupplements.map((supplement, index) => {
            const selected = isSelected(supplement.id);
            const selectedType = getSelectedType(supplement.id);
            
            return (
              <motion.div
                key={supplement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selected 
                    ? 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-300 dark:border-rose-600 shadow-lg' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600'
                }`}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getSupplementTypeIcon(supplement.type)}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-sm mb-2">{supplement.name}</h4>
                          
                          {supplement.type && (
                            <Badge variant="outline" className={`text-xs mb-2 bg-gradient-to-r ${getSupplementTypeColor(supplement.type)} dark:${getSupplementTypeColor(supplement.type).replace('50', '900/20').replace('200', '700')}`}>
                              {supplement.type}
                            </Badge>
                          )}

                          {supplement.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {supplement.description}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {supplement.dosage && (
                              <div className="flex items-center gap-1">
                                <Pill className="w-3 h-3" />
                                <span>{supplement.dosage}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Selection Options */}
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                          <Checkbox
                            checked={selectedSupplements.includes(supplement.id)}
                            onCheckedChange={() => toggleSupplement(supplement.id, 'supplement')}
                          />
                          <div className="text-xs">
                            <div className="font-medium">مکمل</div>
                            <div className="text-gray-500">برای عضله‌سازی</div>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                          <Checkbox
                            checked={selectedVitamins.includes(supplement.id)}
                            onCheckedChange={() => toggleSupplement(supplement.id, 'vitamin')}
                          />
                          <div className="text-xs">
                            <div className="font-medium">ویتامین</div>
                            <div className="text-gray-500">برای سلامت عمومی</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredSupplements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">مکملی یافت نشد</h3>
          <p className="text-gray-500 dark:text-gray-500">معیارهای جستجو را تغییر دهید</p>
        </motion.div>
      )}

      {/* Save Button */}
      {(selectedSupplements.length > 0 || selectedVitamins.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Button
            onClick={handleSave}
            size="lg"
            className="gap-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-8 py-4"
          >
            <CheckCircle className="w-5 h-5" />
            ذخیره {toPersianNumbers(selectedSupplements.length + selectedVitamins.length)} مکمل
            <Shield className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ModernSupplementTab;
