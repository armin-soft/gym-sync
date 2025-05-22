
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const useTableColumns = () => {
  const deviceInfo = useDeviceInfo();

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => "تصویر",
      cell: () => "",
      size: deviceInfo.isMobile ? 40 : 80,
    },
    {
      accessorKey: "name",
      header: () => "نام",
      cell: ({ getValue }) => getValue<string>() || "",
    },
    {
      accessorKey: "phone",
      header: () => "شماره موبایل",
      cell: ({ getValue }) => getValue<string>() || "",
    },
    {
      accessorKey: "height",
      header: () => "قد",
      cell: ({ getValue }) => getValue<string>() || "",
    },
    {
      accessorKey: "weight",
      header: () => "وزن",
      cell: ({ getValue }) => getValue<string>() || "",
    },
    {
      accessorKey: "payment",
      header: () => "مبلغ",
      cell: ({ getValue }) => getValue<string>() || "",
    },
    {
      accessorKey: "progress",
      header: () => "تکمیل پروفایل",
      cell: ({ getValue }) => getValue<number>() || 0,
    },
    {
      id: "actions",
      header: () => "اقدامات",
      cell: () => "",
    },
  ];

  return columns;
};
