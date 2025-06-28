
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DatabaseRecordDialog } from "./DatabaseRecordDialog";

interface DatabaseTableViewProps {
  tableName: string;
}

export const DatabaseTableView: React.FC<DatabaseTableViewProps> = ({ tableName }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTableData();
  }, [tableName]);

  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      const { data: tableData, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(100);

      if (error) throw error;

      setData(tableData || []);
      if (tableData && tableData.length > 0) {
        setColumns(Object.keys(tableData[0]));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری داده‌ها",
        description: "مشکلی در بارگیری اطلاعات پیش آمده است"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm("آیا از حذف این رکورد اطمینان دارید؟")) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "حذف موفق",
        description: "رکورد با موفقیت حذف شد"
      });
      
      fetchTableData();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast({
        variant: "destructive",
        title: "خطا در حذف",
        description: "مشکلی در حذف رکورد پیش آمده است"
      });
    }
  };

  const handleView = (record: any) => {
    setSelectedRecord(record);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedRecord(null);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatCellValue = (value: any) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "✓" : "✗";
    if (typeof value === "string" && value.length > 50) {
      return value.substring(0, 50) + "...";
    }
    return String(value);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">در حال بارگیری...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              جدول {tableName}
              <Badge variant="secondary">{data.length} رکورد</Badge>
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                افزودن
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">هیچ داده‌ای یافت نشد</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column} className="text-right">
                        {column}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record, index) => (
                    <TableRow key={record.id || index}>
                      {columns.map((column) => (
                        <TableCell key={column} className="text-right">
                          {formatCellValue(record[column])}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(record)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(record)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(record.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DatabaseRecordDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        tableName={tableName}
        record={selectedRecord}
        mode={dialogMode}
        columns={columns}
        onSave={() => {
          fetchTableData();
          setIsDialogOpen(false);
        }}
      />
    </>
  );
};
