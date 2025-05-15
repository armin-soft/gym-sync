
import React, { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExercisesStage from "./components/exercises-stage";
import { PlusCircle, BarChart3, LayoutGrid, List, Filter } from "lucide-react";

const HierarchicalExercisesView = () => {
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState("strength");
  
  // Exercise types configuration
  const exerciseTypes = [
    { id: "strength", name: "قدرتی", color: "from-indigo-500 to-violet-600" },
    { id: "cardio", name: "هوازی", color: "from-emerald-500 to-teal-600" },
    { id: "flexibility", name: "انعطاف‌پذیری", color: "from-amber-500 to-orange-600" },
    { id: "balance", name: "تعادلی", color: "from-blue-500 to-cyan-600" },
  ];

  return (
    <PageContainer withBackground className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="container h-full px-0 md:px-4 lg:px-6 py-4 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            مدیریت تمرین‌های شاگردان
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            از این بخش می‌توانید تمرین‌های مختلف را براساس نوع و دسته‌بندی مدیریت کنید
          </p>
        </motion.div>

        <Card className="flex-1 overflow-hidden shadow-lg border-gray-200/40 dark:border-gray-800/40 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <Tabs 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <TabsList className="h-11 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl">
                    {exerciseTypes.map(type => (
                      <TabsTrigger 
                        key={type.id}
                        value={type.id}
                        className={`rounded-lg text-sm h-9 px-4 data-[state=active]:bg-gradient-to-r ${type.color} data-[state=active]:text-white transition-all`}
                      >
                        {type.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <button className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 hover:from-indigo-600 hover:to-violet-700 transition-all shadow-md hover:shadow-lg">
                      <PlusCircle size={16} />
                      افزودن تمرین جدید
                    </button>
                  </div>
                </div>
              </Tabs>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 md:p-6">
                  <Tabs value={activeTab} className="w-full">
                    {exerciseTypes.map(type => (
                      <TabsContent 
                        key={type.id} 
                        value={type.id}
                        className="mt-0 h-full"
                      >
                        <ExercisesStage 
                          typeId={type.id} 
                          categoryId="all"
                        />
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </ScrollArea>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
