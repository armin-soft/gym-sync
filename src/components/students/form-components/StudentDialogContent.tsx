import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ImageIcon, User2 } from "lucide-react";
import { studentFormSchema } from "@/lib/validations/student";
import { Student } from "@/types/student";
import { FormActions } from "./FormActions";
import { FormContainer } from "./FormContainer";
import { StudentDialogHeader } from "./StudentDialogHeader";

interface Props {
  student?: Student | null;
  imageData: string | null;
  imageError: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleResetImage: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  formErrors: {
    name?: string;
    age?: string;
    grade?: string;
    group?: string;
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Just fix the line with the boolean conversion error
const StudentDialogContent: React.FC<Props> = ({ 
  student,
  imageData,
  imageError,
  handleImageChange,
  handleResetImage,
  onSubmit,
  onCancel,
  formErrors
}) => {
  const theme = useTheme();
  
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: student?.name || "",
      age: student?.age?.toString() || "",
      grade: student?.grade || "",
      group: student?.group || "",
    },
  });
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <motion.div 
      className="relative flex flex-col rounded-md shadow-lg overflow-hidden w-full max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 to-violet-600 -z-10" />
      
      <StudentDialogHeader isEdit={Boolean(student)} itemVariants={itemVariants} />
      
      <FormContainer onSubmit={handleSubmit}>
        <motion.div variants={itemVariants} className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/3 flex flex-col items-center gap-3">
            <Avatar className="w-32 h-32 relative">
              {imageData ? (
                <AvatarImage src={imageData} alt="Student Image" className="object-cover" />
              ) : (
                <AvatarFallback>
                  <User2 className="h-4 w-4" />
                </AvatarFallback>
              )}
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 shadow-md"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImageIcon className="h-4 w-4" />
                <Input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Button>
            </Avatar>
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
            <Button variant="link" onClick={handleResetImage} className="text-xs">
              حذف تصویر
            </Button>
          </div>

          <div className="w-full sm:w-2/3 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="نام دانش آموز" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>سن</FormLabel>
                    <FormControl>
                      <Input placeholder="سن" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>پایه</FormLabel>
                    <FormControl>
                      <Input placeholder="پایه" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>گروه</FormLabel>
                  <FormControl>
                    <Input placeholder="گروه" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>

        <FormActions isEdit={Boolean(student)} onCancel={onCancel} />
      </FormContainer>
    </motion.div>
  );
};

export default StudentDialogContent;
