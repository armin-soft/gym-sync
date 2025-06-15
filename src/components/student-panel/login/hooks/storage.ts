
import { Student } from "@/types/student";
import { storageManager } from "@/utils/storageManager";

export const saveStudentLogin = (student: Student): boolean => {
  const loginSaved = storageManager.setItem("studentLoggedIn", "true");
  const idSaved = storageManager.setItem("loggedInStudentId", student.id.toString());
  const studentDataSaved = storageManager.setItem("studentData", JSON.stringify(student));
  
  console.log('storage: Storage results - login:', loginSaved, 'id:', idSaved, 'data:', studentDataSaved);
  
  return loginSaved && idSaved && studentDataSaved;
};

export const checkStorageAvailability = (): string | null => {
  console.log('storage: Storage availability:', storageManager.isAvailable());
  
  if (!storageManager.isAvailable()) {
    return "مرورگر شما دسترسی به ذخیره‌سازی را مسدود کرده است. لطفاً تنظیمات حریم خصوصی را بررسی کنید.";
  }
  
  return null;
};
