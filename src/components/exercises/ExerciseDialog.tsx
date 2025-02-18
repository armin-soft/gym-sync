
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  image: string;
}

interface ExerciseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Exercise, "id">) => void;
  exercise?: Exercise;
}

export const ExerciseDialog = ({
  isOpen,
  onClose,
  onSave,
  exercise,
}: ExerciseDialogProps) => {
  const [formData, setFormData] = useState({
    name: exercise?.name || "",
    muscleGroup: exercise?.muscleGroup || "",
    equipment: exercise?.equipment || "",
    description: exercise?.description || "",
    image: exercise?.image || "/placeholder.svg",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {exercise ? "ویرایش حرکت" : "افزودن حرکت جدید"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={formData.image}
                alt="تصویر حرکت"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">نام حرکت</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="نام حرکت را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="muscleGroup">گروه عضلانی</Label>
              <Input
                id="muscleGroup"
                value={formData.muscleGroup}
                onChange={(e) =>
                  setFormData({ ...formData, muscleGroup: e.target.value })
                }
                placeholder="گروه عضلانی را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="equipment">تجهیزات مورد نیاز</Label>
              <Input
                id="equipment"
                value={formData.equipment}
                onChange={(e) =>
                  setFormData({ ...formData, equipment: e.target.value })
                }
                placeholder="تجهیزات مورد نیاز را وارد کنید"
              />
            </div>

            <div>
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="توضیحات حرکت را وارد کنید"
                className="h-24"
              />
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
