
import { useEffect } from "react";
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
import { 
  FlaskConical, 
  Pill, 
  ListTodo,
  Save,
  X,
  Clock,
  Zap
} from "lucide-react";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته بندی الزامی است"),
  description: z.string().optional(),
  dosage: z.string().optional(),
  timing: z.string().optional(),
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
      description: "",
      dosage: "",
      timing: "",
    },
  });

  useEffect(() => {
    if (mode === "add") {
      if (categories.length > 0) {
        form.reset({
          name: "",
          category: categories[0].name,
          description: "",
          dosage: "",
          timing: "",
        });
      } else {
        form.reset({
          name: "",
          category: "",
          description: "",
          dosage: "",
          timing: "",
        });
      }
    } else if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, mode, categories]);

  const placeholders = {
    supplement: {
      name: "نام مکمل را وارد کنید",
      description: "توضیحات مکمل (اختیاری)",
      dosage: "مثال: 5 گرم روزانه",
      timing: "مثال: قبل از تمرین",
    },
    vitamin: {
      name: "نام ویتامین را وارد کنید", 
      description: "توضیحات ویتامین (اختیاری)",
      dosage: "مثال: 1000 IU روزانه",
      timing: "مثال: با صبحانه",
    }
  };

  const currentPlaceholders = placeholders[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            {type === 'supplement' ? (
              <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            ) : (
              <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            )}
            {mode === "edit" ? 
              `ویرایش ${type === 'supplement' ? 'مکمل' : 'ویتامین'}` : 
              `افزودن ${type === 'supplement' ? 'مکمل' : 'ویتامین'} جدید`
            }
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      {type === 'supplement' ? 
                        <FlaskConical className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" /> : 
                        <Pill className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      }
                      نام {type === 'supplement' ? 'مکمل' : 'ویتامین'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentPlaceholders.name}
                        className="border-purple-200 focus-visible:ring-purple-500 text-sm"
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
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <ListTodo className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      دسته بندی
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value || (categories.length > 0 ? categories[0].name : "")}
                    >
                      <FormControl>
                        <SelectTrigger className="border-purple-200 focus:ring-purple-500 text-sm">
                          <SelectValue placeholder="دسته بندی را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem 
                            key={category.id} 
                            value={category.name}
                            className="focus:bg-purple-50 text-sm"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                      دوز مصرف
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentPlaceholders.dosage}
                        className="border-purple-200 focus-visible:ring-purple-500 text-sm"
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
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                      زمان مصرف
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentPlaceholders.timing}
                        className="border-purple-200 focus-visible:ring-purple-500 text-sm"
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
                  <FormLabel className="flex items-center gap-2 text-sm">
                    <ListTodo className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    توضیحات
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={currentPlaceholders.description}
                      className="border-purple-200 focus-visible:ring-purple-500 resize-none text-sm"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gap-2 hover:border-purple-200 hover:bg-purple-50 text-sm"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                انصراف
              </Button>
              <Button 
                type="submit"
                className={`gap-2 text-sm ${
                  type === 'supplement' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600'
                }`}
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                {mode === "edit" ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
