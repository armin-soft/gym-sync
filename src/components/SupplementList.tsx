
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
import { Supplement } from "@/types/supplement";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementList = ({ supplements, onEdit, onDelete }: SupplementListProps) => {
  return (
    <Card className="p-6">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام مکمل</TableHead>
              <TableHead>دسته‌بندی</TableHead>
              <TableHead>دوز مصرف</TableHead>
              <TableHead>زمان مصرف</TableHead>
              <TableHead>نوع</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements.map((supplement) => (
              <TableRow key={supplement.id}>
                <TableCell>{supplement.name}</TableCell>
                <TableCell>{supplement.category}</TableCell>
                <TableCell>{supplement.dosage}</TableCell>
                <TableCell>{supplement.timing}</TableCell>
                <TableCell>
                  {supplement.type === "supplement" ? "مکمل" : "ویتامین"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(supplement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(supplement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
