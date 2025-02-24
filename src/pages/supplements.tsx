
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupplementDialog, categories } from "@/components/supplements/SupplementDialog";
import { SupplementList, Supplement } from "@/components/supplements/SupplementList";

const initialSupplements: Supplement[] = [
  {
    id: 1,
    name: "کراتین مونوهیدرات",
    category: "عضله‌ساز",
    dosage: "۵ گرم",
    timing: "بعد از تمرین",
    description: "برای افزایش قدرت و حجم عضلانی",
  },
  {
    id: 2,
    name: "ال کارنیتین",
    category: "چربی‌سوز",
    dosage: "۲ گرم",
    timing: "قبل از تمرین",
    description: "کمک به چربی سوزی و افزایش انرژی",
  },
];

const Supplements = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>(initialSupplements);
  const [selectedCategory, setSelectedCategory] = useState<string>("عضله‌ساز");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);

  const filteredSupplements = supplements.filter(
    (supplement) => supplement.category === selectedCategory
  );

  const handleDelete = (id: number) => {
    setSupplements(supplements.filter((supplement) => supplement.id !== id));
    toast({
      title: "حذف مکمل",
      description: "مکمل مورد نظر با موفقیت حذف شد.",
    });
  };

  const handleEdit = (supplement: Supplement) => {
    setEditingSupplement(supplement);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingSupplement(null);
    setDialogOpen(true);
  };

  const handleSubmit = (data: Omit<Supplement, "id">) => {
    if (editingSupplement) {
      setSupplements(
        supplements.map((supplement) =>
          supplement.id === editingSupplement.id
            ? { ...data, id: supplement.id }
            : supplement
        )
      );
      toast({
        title: "ویرایش مکمل",
        description: "مکمل مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newSupplement: Supplement = {
        ...data,
        id: supplements.length + 1,
      };
      setSupplements([...supplements, newSupplement]);
      toast({
        title: "افزودن مکمل",
        description: "مکمل جدید با موفقیت اضافه شد.",
      });
    }
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">مکمل‌های ورزشی</h2>
          <p className="text-muted-foreground">
            در این بخش می‌توانید مکمل‌های ورزشی را مدیریت کنید
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="ml-2 h-4 w-4" /> افزودن مکمل
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">فیلتر بر اساس دسته‌بندی</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="انتخاب دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SupplementList 
        supplements={filteredSupplements} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <SupplementDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingSupplement || undefined}
        mode={editingSupplement ? "edit" : "add"}
      />
    </div>
  );
};

export default Supplements;
