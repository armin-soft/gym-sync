
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Folder, Save, X } from "lucide-react";

const categoryFormSchema = z.object({
  name: z.string().min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد"),
});

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  mode: "add" | "edit";
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValue,
  mode,
}) => {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: defaultValue || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: defaultValue || "",
      });
    }
  }, [defaultValue, form, open]);

  const handleSubmit = (values: z.infer<typeof categoryFormSchema>) => {
    onSubmit(values.name);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center justify-end gap-2 text-xl font-bold">
            {mode === "edit" ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
            <Folder className="h-6 w-6 text-indigo-500" />
          </DialogTitle>
          <DialogDescription className="text-right text-gray-600">
            {mode === "edit" 
              ? "نام دسته‌بندی را ویرایش کنید" 
              : "نام دسته‌بندی جدید را وارد کنید"
            }
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-end gap-2 text-right">
                    نام دسته‌بندی
                    <Folder className="h-4 w-4 text-indigo-500" />
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="نام دسته‌بندی را وارد کنید..."
                      className="border-indigo-200 focus-visible:ring-indigo-500 text-right"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gap-2 hover:border-indigo-200 hover:bg-indigo-50"
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button 
                type="submit"
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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
