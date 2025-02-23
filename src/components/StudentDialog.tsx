
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
  student?: Student;
}

interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
}

interface Student extends StudentFormData {
  id: number;
}

export const StudentDialog = ({
  isOpen,
  onClose,
  onSave,
  student,
}: StudentDialogProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    name: student?.name || "",
    phone: student?.phone || "",
    height: student?.height || "",
    weight: student?.weight || "",
    image: student?.image || "/placeholder.svg",
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "خطا",
          description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.height || !formData.weight) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.match(/^09\d{9}$/)) {
      toast({
        title: "خطا",
        description: "شماره موبایل معتبر نیست",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {student ? "ویرایش شاگرد" : "افزودن شاگرد جدید"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={formData.image}
                alt="تصویر پروفایل"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/10"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0"
                onClick={handleImageClick}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="نام و نام خانوادگی را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                dir="ltr"
                className="text-left"
                value={toPersianNumbers(formData.phone)}
                onChange={(e) => {
                  const persianValue = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  setFormData({ ...formData, phone: persianValue });
                }}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">قد (سانتی‌متر)</Label>
                <Input
                  id="height"
                  dir="ltr"
                  className="text-left"
                  value={toPersianNumbers(formData.height)}
                  onChange={(e) => {
                    const persianValue = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    setFormData({ ...formData, height: persianValue });
                  }}
                  placeholder="۱۷۵"
                />
              </div>

              <div>
                <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                <Input
                  id="weight"
                  dir="ltr"
                  className="text-left"
                  value={toPersianNumbers(formData.weight)}
                  onChange={(e) => {
                    const persianValue = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    setFormData({ ...formData, weight: persianValue });
                  }}
                  placeholder="۷۵"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit">ذخیره</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
