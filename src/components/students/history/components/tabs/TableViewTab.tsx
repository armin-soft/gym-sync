
import React from "react";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "../../utils/formatDate";

interface TableViewTabProps {
  entries: HistoryEntry[];
  type: string;
}

export const TableViewTab: React.FC<TableViewTabProps> = ({ entries, type }) => {
  return (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">شاگرد</TableHead>
            <TableHead>{type}</TableHead>
            <TableHead className="text-left">تاریخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(entry => (
            <TableRow key={entry.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                    <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{entry.studentName}</span>
                </div>
              </TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(entry.timestamp)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
