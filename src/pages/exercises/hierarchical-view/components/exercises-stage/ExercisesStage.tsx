
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExerciseHeader from './ExerciseHeader';
import QuickSpeechAdd from './QuickSpeechAdd';
import ExercisesList from './ExercisesList';

interface ExercisesStageProps {
  typeId: string;
  categoryId: string;
  onBack: () => void;
  onExerciseSelect: (exerciseId: string) => void;
}

const ExercisesStage: React.FC<ExercisesStageProps> = ({
  typeId,
  categoryId,
  onBack,
  onExerciseSelect
}) => {
  const navigate = useNavigate();
  // Local state
  const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);

  // Filter options
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    equipment: [] as string[],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleAddExercise = () => {
    console.log("Adding exercise");
    setIsAddDialogOpen(true);
  };

  const handleEditExercise = (exercise: any) => {
    console.log("Editing exercise", exercise);
  };

  const handleDeleteExercise = (id: number) => {
    console.log("Deleting exercise", id);
  };

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key="exercises-stage"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <ExerciseHeader
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onGoBack={onBack}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setIsAddDialogOpen={setIsAddDialogOpen}
            exercisesCount={filteredExercises.length || 0}
          />

          {/* Search and filters */}
          <div className="px-2 sm:px-4 py-3">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو در حرکات..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 bg-background/50 backdrop-blur-sm"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/50 backdrop-blur-sm hover:bg-background/80"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <QuickSpeechAdd />
            </div>

            {/* Filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 overflow-hidden"
                >
                  <Card className="border-dashed bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-3">
                      <Tabs defaultValue="difficulty" className="w-full">
                        <TabsList className="mb-2 bg-background/50 backdrop-blur-sm">
                          <TabsTrigger value="difficulty">سطح دشواری</TabsTrigger>
                          <TabsTrigger value="equipment">تجهیزات</TabsTrigger>
                        </TabsList>
                        <TabsContent value="difficulty" className="mt-0">
                          <div className="flex flex-wrap gap-1">
                            {['آسان', 'متوسط', 'سخت'].map((level) => (
                              <Badge
                                key={level}
                                variant={filters.difficulty.includes(level) ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => {
                                  setFilters({
                                    ...filters,
                                    difficulty: filters.difficulty.includes(level)
                                      ? filters.difficulty.filter((d) => d !== level)
                                      : [...filters.difficulty, level],
                                  });
                                }}
                              >
                                {level}
                              </Badge>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="equipment" className="mt-0">
                          <div className="flex flex-wrap gap-1">
                            {['بدون تجهیزات', 'دمبل', 'هالتر', 'کش', 'دستگاه'].map((equipment) => (
                              <Badge
                                key={equipment}
                                variant={filters.equipment.includes(equipment) ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => {
                                  setFilters({
                                    ...filters,
                                    equipment: filters.equipment.includes(equipment)
                                      ? filters.equipment.filter((e) => e !== equipment)
                                      : [...filters.equipment, equipment],
                                  });
                                }}
                              >
                                {equipment}
                              </Badge>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="flex justify-between mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFilters({ difficulty: [], equipment: [] })}
                        >
                          پاک کردن فیلترها
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                          اعمال فیلترها
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active filters */}
            {(filters.difficulty.length > 0 || filters.equipment.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-1 mt-2"
              >
                {filters.difficulty.map((level) => (
                  <Badge
                    key={level}
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                    onClick={() => {
                      setFilters({
                        ...filters,
                        difficulty: filters.difficulty.filter((d) => d !== level),
                      });
                    }}
                  >
                    {level} &times;
                  </Badge>
                ))}
                {filters.equipment.map((equipment) => (
                  <Badge
                    key={equipment}
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                    onClick={() => {
                      setFilters({
                        ...filters,
                        equipment: filters.equipment.filter((e) => e !== equipment),
                      });
                    }}
                  >
                    {equipment} &times;
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground"
                  onClick={() => setFilters({ difficulty: [], equipment: [] })}
                >
                  پاک کردن همه
                </Button>
              </motion.div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto px-2 sm:px-4 pb-4">
            <ExercisesList
              viewMode={viewMode}
              onEdit={handleEditExercise}
              onDelete={handleDeleteExercise}
            />

            {filteredExercises.length === 0 && !searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-60 text-center"
              >
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">هیچ حرکتی یافت نشد</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  برای این دسته‌بندی و نوع حرکت، هنوز تمرینی ثبت نشده است
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  افزودن حرکت جدید
                </Button>
              </motion.div>
            )}

            {filteredExercises.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-60 text-center"
              >
                <div className="rounded-full bg-amber-500/10 p-3 mb-4">
                  <Search className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">نتیجه‌ای یافت نشد</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  حرکتی با عبارت "{searchQuery}" پیدا نشد
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  پاک کردن جستجو
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExercisesStage;
