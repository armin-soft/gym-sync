
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Supplement {
  id: number;
  name: string;
  category: string;
  dosage: string;
  timing: string;
  description: string;
}

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementList = ({
  supplements,
  onEdit,
  onDelete,
}: SupplementListProps) => {
  return (
    <Card className="p-6">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary">نام مکمل</TableHead>
              <TableHead className="text-primary">دسته‌بندی</TableHead>
              <TableHead className="text-primary">مقدار مصرف</TableHead>
              <TableHead className="text-primary">زمان مصرف</TableHead>
              <TableHead className="text-primary">توضیحات</TableHead>
              <TableHead className="text-primary">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements.map((supplement) => (
              <TableRow key={supplement.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{supplement.name}</TableCell>
                <TableCell>{supplement.category}</TableCell>
                <TableCell>{supplement.dosage}</TableCell>
                <TableCell>{supplement.timing}</TableCell>
                <TableCell className="max-w-xs truncate">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">{supplement.description}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs whitespace-normal">{supplement.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onEdit(supplement)}
                            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>ویرایش مکمل</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onDelete(supplement.id)}
                            className="hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>حذف مکمل</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
