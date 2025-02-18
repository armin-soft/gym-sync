
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام مکمل باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  dosage: z.string().min(1, "مقدار مصرف نمی‌تواند خالی باشد"),
  timing: z.string().min(1, "زمان مصرف نمی‌تواند خالی باشد"),
  description: z.string().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
});

interface Supplement {
  id: number;
  name: string;
  category: string;
  dosage: string;
  timing: string;
  description: string;
}

const initialSupplements: Supplement[] = [
  {
    id: 1,
    name: "کراتین مونوهیدرات",
    category: "پروتئین و آمینو",
    dosage: "۵ گرم",
    timing: "بعد از تمرین",
    description: "برای افزایش قدرت و حجم عضلانی",
  },
  {
    id: 2,
    name: "مولتی ویتامین",
    category: "ویتامین‌ها",
    dosage: "۱ عدد",
    timing: "با صبحانه",
    description: "تامین ویتامین‌های ضروری بدن",
  },
];

const categories = [
  "پروتئین و آمینو",
  "ویتامین‌ها",
  "مواد معدنی",
  "چربی سوز",
  "انرژی‌زا",
];

const Supplements = () => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>(initialSupplements);
  const [selectedCategory, setSelectedCategory] = useState<string>("پروتئین و آمینو");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);

  const form = useForm<z.infer<typeof supplementFormSchema>>({
    resolver: zodResolver(supplementFormSchema),
    defaultValues: {
      name: "",
      category: "",
      dosage: "",
      timing: "",
      description: "",
    },
  });

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
    form.reset({
      name: supplement.name,
      category: supplement.category,
      dosage: supplement.dosage,
      timing: supplement.timing,
      description: supplement.description,
    });
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingSupplement(null);
    form.reset({
      name: "",
      category: selectedCategory,
      dosage: "",
      timing: "",
      description: "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof supplementFormSchema>) => {
    if (editingSupplement) {
      setSupplements(
        supplements.map((supplement) =>
          supplement.id === editingSupplement.id
            ? {
                id: supplement.id,
                name: data.name,
                category: data.category,
                dosage: data.dosage,
                timing: data.timing,
                description: data.description,
              }
            : supplement
        )
      );
      toast({
        title: "ویرایش مکمل",
        description: "مکمل مورد نظر با موفقیت ویرایش شد.",
      });
    } else {
      const newSupplement: Supplement = {
        id: supplements.length + 1,
        name: data.name,
        category: data.category,
        dosage: data.dosage,
        timing: data.timing,
        description: data.description,
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

      <Card className="p-6">
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

        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام مکمل</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>مقدار مصرف</TableHead>
                <TableHead>زمان مصرف</TableHead>
                <TableHead>توضیحات</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSupplements.map((supplement) => (
                <TableRow key={supplement.id}>
                  <TableCell>{supplement.name}</TableCell>
                  <TableCell>{supplement.category}</TableCell>
                  <TableCell>{supplement.dosage}</TableCell>
                  <TableCell>{supplement.timing}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {supplement.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(supplement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(supplement.id)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSupplement ? "ویرایش مکمل" : "افزودن مکمل جدید"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام مکمل</FormLabel>
                    <FormControl>
                      <Input placeholder="نام مکمل را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مقدار مصرف</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: ۵ گرم" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>زمان مصرف</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: بعد از تمرین" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="توضیحات مکمل را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  انصراف
                </Button>
                <Button type="submit">
                  {editingSupplement ? "ویرایش" : "افزودن"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Supplements;
