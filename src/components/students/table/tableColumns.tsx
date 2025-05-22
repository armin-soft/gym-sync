
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, UserRound } from "lucide-react";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";

export const useTableColumns = () => {
  const deviceInfo = useDeviceInfo();

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => "تصویر",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center justify-center">
            <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
            </Avatar>
          </div>
        );
      },
      size: deviceInfo.isMobile ? 40 : 80,
    },
    {
      accessorKey: "name",
      header: () => "نام",
      cell: ({ row }) => {
        const value = row.original.name;
        return <div className="font-medium text-right">{value || ""}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: () => "شماره موبایل",
      cell: ({ row }) => {
        const value = row.original.phone;
        return <div className="text-center">{toPersianNumbers(value) || ""}</div>;
      },
    },
    {
      accessorKey: "height",
      header: () => "قد",
      cell: ({ row }) => {
        const value = row.original.height;
        return <div className="text-center">{toPersianNumbers(value)} <span className="text-xs text-muted-foreground">سانتی‌متر</span></div>;
      },
    },
    {
      accessorKey: "weight",
      header: () => "وزن",
      cell: ({ row }) => {
        const value = row.original.weight;
        return <div className="text-center">{toPersianNumbers(value)} <span className="text-xs text-muted-foreground">کیلوگرم</span></div>;
      },
    },
    {
      accessorKey: "payment",
      header: () => "مبلغ",
      cell: ({ row }) => {
        const value = row.original.payment;
        return <div className="text-center">{formatPrice(value) || ""}</div>;
      },
    },
    {
      accessorKey: "progress",
      header: () => "تکمیل پروفایل",
      cell: ({ row }) => {
        const value = row.getValue<number>("progress") || 0;
        const isComplete = value >= 100;
        
        return (
          <div className="text-center">
            {isComplete ? (
              <Badge variant="outline" className="gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                کامل
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-400">
                {toPersianNumbers(value)}٪
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => "اقدامات",
      cell: () => "",
    },
  ];

  return columns;
};
