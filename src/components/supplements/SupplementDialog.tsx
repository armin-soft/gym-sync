
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { SupplementCategory } from "@/types/supplement";
import { FlaskConical, Pill } from "lucide-react";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  dosage: z.string().min(1, "مقدار مصرف نمی‌تواند خالی باشد"),
  timing: z.string().min(1, "زمان مصرف نمی‌تواند خالی باشد"),
  description: z.string().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
});

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof supplementFormSchema>) => void;
  defaultValues?: z.infer<typeof supplementFormSchema>;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: 'supplement' | 'vitamin';
}

export const SupplementDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
  type,
}: SupplementDialogProps) => {
  const form = useForm<z.infer<typeof supplementFormSchema>>({
    resolver: zodResolver(supplementFormSchema),
    defaultValues: defaultValues || {
      name: "",
      category: "",
      dosage: "",
      timing: "",
      description: "",
    },
  });

  const placeholders = {
    supplement: {
      name: "نام مکمل را وارد کنید (مثال: کراتین مونوهیدرات)",
      dosage: "مقدار مصرف را وارد کنید (مثال: ۵ گرم)",
      timing: "زمان مصرف را وارد کنید (مثال: قبل و بعد از تمرین)",
      description: "توضیحات مکمل را وارد کنید (مثال: برای افزایش قدرت و حجم عضلات)",
    },
    vitamin: {
      name: "نام ویتامین را وارد کنید (مثال: ویتامین D3)",
      dosage: "مقدار مصرف را وارد کنید (مثال: ۱۰۰۰ واحد)",
      timing: "زمان مصرف را وارد کنید (مثال: صبح با صبحانه)",
      description: "توضیحات ویتامین را وارد کنید (مثال: برای تقویت سیستم ایمنی و سلامت استخوان‌ها)",
    }
  };

  const titles = {
    supplement: {
      add: "افزودن مکمل جدید",
      edit: "ویرایش مکمل",
      icon: <FlaskConical className="h-5 w-5 text-purple-500" />,
      labels: {
        name: "نام مکمل",
        category: "دسته‌بندی مکمل",
        dosage: "مقدار مصرف",
        timing: "زمان مصرف",
        description: "توضیحات مکمل",
      }
    },
    vitamin: {
      add: "افزودن ویتامین جدید",
      edit: "ویرایش ویتامین",
      icon: <Pill className="h-5 w-5 text-blue-500" />,
      labels: {
        name: "نام ویتامین",
        category: "دسته‌بندی ویتامین",
        dosage: "دوز مصرف",
        timing: "زمان مصرف",
        description: "توضیحات و فواید",
      }
    }
  };

  const currentLabels = titles[type].labels;
  const currentPlaceholders = placeholders[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {titles[type].icon}
            {mode === "edit" ? titles[type].edit : titles[type].add}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{currentLabels.name}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={currentPlaceholders.name}
                      className="border-purple-200 focus-visible:ring-purple-500"
                      {...field}
                    />
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
                  <FormLabel>{currentLabels.category}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                        <SelectValue placeholder={`${currentLabels.category} را انتخاب کنید`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.name}
                          className="focus:bg-purple-50"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentLabels.dosage}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentPlaceholders.dosage}
                        className="border-purple-200 focus-visible:ring-purple-500"
                        {...field}
                      />
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
                    <FormLabel>{currentLabels.timing}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentPlaceholders.timing}
                        className="border-purple-200 focus-visible:ring-purple-500"
                        {...field}
                      />
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
                  <FormLabel>{currentLabels.description}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={currentPlaceholders.description}
                      className="min-h-[100px] border-purple-200 focus-visible:ring-purple-500 resize-none"
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
                onClick={() => onOpenChange(false)}
                className="hover:border-purple-200 hover:bg-purple-50"
              >
                انصراف
              </Button>
              <Button 
                type="submit"
                className={`bg-gradient-to-r ${
                  type === 'supplement' 
                    ? 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' 
                    : 'from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600'
                }`}
              >
                {mode === "edit" ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
