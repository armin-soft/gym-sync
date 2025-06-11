
import { useState, useEffect } from 'react';
import { useShamsiDate } from './useShamsiDate';

export const usePersianDate = () => {
  const { dateInfo, isLoading, error } = useShamsiDate();
  const [formattedDate, setFormattedDate] = useState<string>('در حال بارگذاری...');

  useEffect(() => {
    if (dateInfo && dateInfo.Shamsi_Date && !isLoading && !error) {
      try {
        // فرمت API: "1404/03/21"
        const dateParts = dateInfo.Shamsi_Date.split('/');
        if (dateParts.length === 3) {
          const year = dateParts[0];
          const month = dateParts[1];
          const day = dateParts[2];
          
          // تبدیل ماه از عدد به نام فارسی
          const monthNames = [
            '', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
            'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
          ];
          
          const monthName = monthNames[parseInt(month)] || '';
          
          // تبدیل روز هفته از انگلیسی به فارسی
          const dayNames: Record<string, string> = {
            'Saturday': 'شنبه',
            'Sunday': 'یکشنبه', 
            'Monday': 'دوشنبه',
            'Tuesday': 'سه‌شنبه',
            'Wednesday': 'چهارشنبه',
            'Thursday': 'پنج‌شنبه',
            'Friday': 'جمعه'
          };
          
          // گرفتن روز فعلی هفته
          const currentDate = new Date();
          const englishDayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
          const persianDayName = dayNames[englishDayName] || '';
          
          // فرمت نهایی: چهارشنبه ۲۱ خرداد ۱۴۰۴
          const formatted = `${persianDayName} ${day} ${monthName} ${year}`;
          setFormattedDate(formatted);
        } else {
          setFormattedDate('فرمت تاریخ نامعتبر');
        }
      } catch (err) {
        console.error('خطا در فرمت کردن تاریخ:', err);
        setFormattedDate('خطا در نمایش تاریخ');
      }
    } else if (error) {
      setFormattedDate('خطا در دریافت تاریخ');
    } else if (isLoading) {
      setFormattedDate('در حال بارگذاری...');
    }
  }, [dateInfo, isLoading, error]);

  return formattedDate;
};
