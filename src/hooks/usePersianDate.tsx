
import { useState, useEffect } from 'react';

export const usePersianDate = () => {
  const [persianDate, setPersianDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      
      // Convert to Persian calendar
      const persianDateString = new Intl.DateTimeFormat('fa-IR-u-ca-persian', options).format(now);
      
      // Parse the date parts to reformat
      const parts = persianDateString.split(' ');
      if (parts.length >= 4) {
        // Original format: "۱۴۰۴ خرداد ۲۱, چهارشنبه"
        // Extract parts: year, month, day, weekday
        const year = parts[0];
        const month = parts[1];
        const dayWithComma = parts[2];
        const day = dayWithComma.replace(',', '');
        const weekday = parts[3];
        
        // New format: "چهارشنبه ۲۱ خرداد ۱۴۰۴"
        const reformattedDate = `${weekday} ${day} ${month} ${year}`;
        setPersianDate(reformattedDate);
      } else {
        setPersianDate(persianDateString);
      }
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return persianDate;
};
