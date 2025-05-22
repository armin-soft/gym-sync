
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const useTableColumns = () => {
  const deviceInfo = useDeviceInfo();

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => <div className="text-center">تصویر</div>,
      cell: () => <div className="flex items-center justify-center"></div>,
      size: deviceInfo.isMobile ? 40 : 80,
    },
    {
      accessorKey: "name",
      header: () => <div>نام</div>,
      cell: () => <div className="font-medium"></div>,
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">شماره موبایل</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "height",
      header: () => <div className="text-center">قد</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-center">وزن</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "payment",
      header: () => <div className="text-center">مبلغ</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "progress",
      header: () => <div className="text-center">تکمیل پروفایل</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center">اقدامات</div>,
      cell: () => <div></div>,
    },
  ];

  return columns;
};
