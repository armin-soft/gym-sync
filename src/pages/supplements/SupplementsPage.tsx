
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContainer } from '@/components/ui/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, Search, Plus, Filter, Grid, List, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SupplementsPage = () => {
  const [activeTab, setActiveTab] = useState('supplements');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Sample data
  const categories = [
    'همه', 'پروتئین', 'کربوهیدرات', 'کراتین', 'ویتامین', 'آمینو اسید'
  ];
  
  const supplements = [
    {
      id: '1',
      name: 'پروتئین وی',
      category: 'پروتئین',
      description: 'مکمل پروتئینی با جذب سریع',
      dosage: '30 گرم روزانه',
      image: 'https://placehold.co/200x200/indigo/white?text=Protein'
    },
    {
      id: '2',
      name: 'کراتین مونوهیدرات',
      category: 'کراتین',
      description: 'افزایش قدرت و حجم عضلات',
      dosage: '5 گرم روزانه',
      image: 'https://placehold.co/200x200/purple/white?text=Creatine' 
    },
    {
      id: '3',
      name: 'مولتی ویتامین',
      category: 'ویتامین',
      description: 'ترکیبی از ویتامین‌های ضروری',
      dosage: '1 قرص روزانه',
      image: 'https://placehold.co/200x200/orange/white?text=Vitamin'
    },
    {
      id: '4',
      name: 'BCAA',
      category: 'آمینو اسید',
      description: 'کمک به ریکاوری عضلات',
      dosage: '10 گرم قبل از تمرین',
      image: 'https://placehold.co/200x200/blue/white?text=BCAA'
    },
  ];
  
  // Filter supplements based on search and category
  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         supplement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || selectedCategory === 'همه' || 
                           supplement.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <PageContainer>
      <div className="p-4 lg:p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:gap-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-md bg-gradient-to-br from-purple-600 to-purple-400 text-white">
                  <Pill className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold">مدیریت مکمل‌ها و ویتامین‌ها</h1>
              </motion.div>
              <p className="text-muted-foreground mt-1.5">مکمل‌ها و ویتامین‌های خود را مدیریت کنید</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500"
              >
                <Plus className="mr-1 h-4 w-4" />
                افزودن مکمل جدید
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs 
            defaultValue="supplements" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b">
              <TabsList className="bg-transparent">
                <TabsTrigger 
                  value="supplements"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none"
                >
                  مکمل‌ها
                </TabsTrigger>
                <TabsTrigger 
                  value="categories"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none"
                >
                  دسته‌بندی‌ها
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Supplements Tab */}
            <TabsContent value="supplements" className="mt-4">
              <div className="flex flex-col gap-4">
                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="جستجو در مکمل‌ها..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowFilters(!showFilters)}
                      className={showFilters ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' : ''}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                    <div className="bg-muted/50 rounded-md flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Filters panel */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Card className="p-4 bg-slate-50 dark:bg-slate-900/50 border-dashed">
                        <h3 className="font-medium mb-2">دسته‌بندی‌ها</h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Button
                              key={category}
                              variant={selectedCategory === category ? "default" : "outline"}
                              size="sm"
                              className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                              onClick={() => setSelectedCategory(category === 'همه' ? null : category)}
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Supplements list/grid */}
                {filteredSupplements.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className={`grid gap-4 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
                        : 'grid-cols-1'
                    }`}
                  >
                    {filteredSupplements.map((supplement) => (
                      <motion.div
                        key={supplement.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        {viewMode === 'grid' ? (
                          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                            <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                              <img 
                                src={supplement.image} 
                                alt={supplement.name} 
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium line-clamp-1">{supplement.name}</h3>
                                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
                                  {supplement.category}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {supplement.description}
                              </p>
                              <div className="mt-2 text-xs text-muted-foreground">
                                مقدار مصرف: {supplement.dosage}
                              </div>
                            </div>
                          </Card>
                        ) : (
                          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="flex">
                              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800">
                                <img 
                                  src={supplement.image} 
                                  alt={supplement.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3 flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-medium">{supplement.name}</h3>
                                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
                                    {supplement.category}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {supplement.description}
                                </p>
                                <div className="mt-1 text-xs text-muted-foreground">
                                  مقدار مصرف: {supplement.dosage}
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">هیچ مکملی یافت نشد</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      {searchQuery 
                        ? `هیچ مکملی با عبارت "${searchQuery}" پیدا نشد.` 
                        : 'هیچ مکملی در دسته‌بندی انتخابی وجود ندارد.'}
                    </p>
                    <div className="flex gap-3">
                      {searchQuery && (
                        <Button variant="outline" onClick={() => setSearchQuery('')}>
                          پاک کردن جستجو
                        </Button>
                      )}
                      {selectedCategory && (
                        <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                          نمایش همه دسته‌ها
                        </Button>
                      )}
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500">
                        <Plus className="mr-1 h-4 w-4" />
                        افزودن مکمل جدید
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">دسته‌بندی‌های مکمل</h2>
                  <Button>
                    <Plus className="mr-1 h-4 w-4" />
                    افزودن دسته جدید
                  </Button>
                </div>
                
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {categories.filter(cat => cat !== 'همه').map((category) => (
                    <Card key={category} className="p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{category}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Pill className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default SupplementsPage;
