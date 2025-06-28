
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Table, Plus, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DatabaseTableView } from "@/components/database/DatabaseTableView";
import { DatabaseStatsCards } from "@/components/database/DatabaseStatsCards";

const DatabaseManagement = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const availableTables = [
    "students",
    "exercises", 
    "exercise_categories",
    "exercise_types",
    "meals",
    "supplements",
    "vitamins",
    "trainer_profile",
    "student_exercises",
    "student_meals",
    "student_supplements",
    "student_vitamins"
  ];

  useEffect(() => {
    setTables(availableTables);
    setSelectedTable(availableTables[0]);
    setIsLoading(false);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    toast({
      title: "به‌روزرسانی",
      description: "اطلاعات دیتابیس به‌روزرسانی شد"
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <PageContainer withBackground fullHeight className="w-full min-h-screen flex flex-col">
      <div className="w-full flex-1 flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="flex-shrink-0 mb-6">
          <PageHeader 
            title="مدیریت دیتابیس" 
            description="مدیریت و کنترل داده‌های دیتابیس Supabase"
            actions={
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                به‌روزرسانی
              </Button>
            }
          />
        </div>

        <DatabaseStatsCards />

        <div className="flex-1 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                جداول دیتابیس
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTable} onValueChange={setSelectedTable} className="w-full">
                <TabsList className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 h-auto p-1">
                  {tables.map((table) => (
                    <TabsTrigger 
                      key={table} 
                      value={table}
                      className="flex items-center gap-1 text-xs px-2 py-1"
                    >
                      <Table className="h-3 w-3" />
                      {table.replace('_', ' ')}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tables.map((table) => (
                  <TabsContent key={table} value={table} className="mt-4">
                    <DatabaseTableView tableName={table} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default DatabaseManagement;
