
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
  Clock, 
  AlignLeft,
  Save,
  X
} from "lucide-react";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته بندی الزامی است"),
  dosage: z.string().min(1, "مقدار مصرف نمی تواند خالی باشد"),
  timing: z.string().min(1, "زمان مصرف نمی تواند خالی باشد"),
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

  useEffect(() => {
    if (mode === "add") {
      form.reset({
        name: "",
        category: "",
        dosage: "",
        timing: "",
        description: "",
      });
    } else if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, mode]);

  const placeholders = {
    supplement: {
      name: "نام مکمل را وارد کنید",
      dosage: "مقدار مصرف",
      timing: "زمان مصرف",
      description: "توضیحات",
    },
    vitamin: {
      name: "نام ویتامین را وارد کنید",
      dosage: "مقدار مصرف",
      timing: "زمان مصرف",
      description: "توضیحات",
    }
  };

  const currentPlaceholders = placeholders[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {type === 'supplement' ? (
              <FlaskConical className="h-5 w-5 text-purple-500" />
            ) : (
              <Pill className="h-5 w-5 text-blue-500" />
            )}
            {mode === "edit" ? 
              `ویرایش ${type === 'supplement' ? 'مکمل' : 'ویتامین'}` : 
              `افزودن ${type === 'supplement' ? 'مکمل' : 'ویتامین'} جدید`
            }
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    {type === 'supplement' ? 
                      <FlaskConical className="h-4 w-4 text-purple-500" /> : 
                      <Pill className="h-4 w-4 text-blue-500" />
                    }
                    نام {type === 'supplement' ? 'مکمل' : 'ویتامین'}
                  </FormLabel>
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
                  <FormLabel className="flex items-center gap-2">
                    <ListTodo className="h-4 w-4 text-purple-500" />
                    دسته بندی
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                        <SelectValue placeholder="دسته بندی را انتخاب کنید" />
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
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      مقدار مصرف
                    </FormLabel>
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
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      زمان مصرف
                    </FormLabel>
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
                  <FormLabel className="flex items-center gap-2">
                    <AlignLeft className="h-4 w-4 text-purple-500" />
                    توضیحات
                  </FormLabel>
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
                className="gap-2 hover:border-purple-200 hover:bg-purple-50"
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button 
                type="submit"
                className={`gap-2 bg-gradient-to-r ${
                  type === 'supplement' 
                    ? 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' 
                    : 'from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600'
                }`}
              >
                <Save className="h-4 w-4" />
                {mode === "edit" ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
