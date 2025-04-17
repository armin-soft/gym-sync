
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
  X
} from "lucide-react";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته بندی الزامی است"),
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
    },
  });

  useEffect(() => {
    if (mode === "add") {
      form.reset({
        name: "",
        category: "",
      });
    } else if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, mode]);

  const placeholders = {
    supplement: {
      name: "نام مکمل را وارد کنید (مثال: کراتین مونوهیدرات)",
    },
    vitamin: {
      name: "نام ویتامین را وارد کنید (مثال: ویتامین D3)",
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
