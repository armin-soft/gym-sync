
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Beaker } from "lucide-react";

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

export const CategoryDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValue,
  mode,
}: CategoryDialogProps) => {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: defaultValue || "",
    },
  });

  useEffect(() => {
    if (defaultValue) {
      form.reset({ name: defaultValue });
    }
  }, [defaultValue, form]);

  const handleSubmit = (data: z.infer<typeof categoryFormSchema>) => {
    onSubmit(data.name);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-purple-500" />
            {mode === "edit" ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام دسته‌بندی</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="نام دسته‌بندی را وارد کنید"
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
