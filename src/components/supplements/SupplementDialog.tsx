
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
import { FlaskConical } from "lucide-react";

const supplementFormSchema = z.object({
  name: z.string().min(2, "نام مکمل باید حداقل ۲ کاراکتر باشد"),
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
}

export const SupplementDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-purple-500" />
            {mode === "edit" ? "ویرایش مکمل" : "افزودن مکمل جدید"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام مکمل</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="نام مکمل را وارد کنید"
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
                  <FormLabel>دسته‌بندی</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                        <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
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
                    <FormLabel>مقدار مصرف</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="مثال: ۵ گرم"
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
                    <FormLabel>زمان مصرف</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="مثال: بعد از تمرین"
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
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="توضیحات مکمل را وارد کنید"
                      className="border-purple-200 focus-visible:ring-purple-500"
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
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
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
