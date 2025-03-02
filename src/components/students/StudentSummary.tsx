
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentSummaryProps {
  student: {
    id: number;
    name: string;
    phone: string;
    height: string;
    weight: string;
    exercises?: number[];
    meals?: number[];
    supplements?: number[];
    vitamins?: number[];
  } | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentSummary = ({ 
  student, 
  exercises, 
  meals, 
  supplements 
}: StudentSummaryProps) => {
  if (!student) return null;
  
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-700">نام:</div>
          <div className="text-sm text-gray-500">{student?.name || '-'}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">شماره موبایل:</div>
          <div className="text-sm text-gray-500" dir="ltr">
            {student?.phone ? toPersianNumbers(student.phone) : '-'}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-700">قد:</div>
          <div className="text-sm text-gray-500">
            {student?.height ? toPersianNumbers(student.height) : '-'}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-700">وزن:</div>
          <div className="text-sm text-gray-500">
            {student?.weight ? toPersianNumbers(student.weight) : '-'}
          </div>
        </div>
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-700">برنامه تمرینی:</div>
        {student?.exercises && student.exercises.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-500">
            {exercises
              .filter(exercise => student.exercises?.includes(exercise.id))
              .map(exercise => (
                <li key={exercise.id}>{exercise.name}</li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500">
            هیچ برنامه تمرینی‌ای برای این شاگرد ثبت نشده است.
          </div>
        )}
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-700">برنامه غذایی:</div>
        {student?.meals && student.meals.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-500">
            {meals
              .filter(meal => student.meals?.includes(meal.id))
              .map(meal => (
                <li key={meal.id}>{meal.name}</li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500">
            هیچ برنامه غذایی‌ای برای این شاگرد ثبت نشده است.
          </div>
        )}
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-700">مکمل‌ها و ویتامین‌ها:</div>
        {(student?.supplements && student.supplements.length > 0) ||
        (student?.vitamins && student.vitamins.length > 0) ? (
          <ul className="list-disc list-inside text-sm text-gray-500">
            {supplements
              .filter(
                item =>
                  student.supplements?.includes(item.id) ||
                  student.vitamins?.includes(item.id)
              )
              .map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500">
            هیچ مکمل یا ویتامینی برای این شاگرد ثبت نشده است.
          </div>
        )}
      </div>
    </div>
  );
};
