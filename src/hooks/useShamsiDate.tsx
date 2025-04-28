
import { useState, useEffect } from 'react';

interface DateTimeResponse {
  Result: {
    Code: number;
    Shamsi_Date: string;
    Season: string;
    Season_Emoji: string;
    Time_Based: string;
    Time_Based_Emoji: string;
  };
}

export const useShamsiDate = () => {
  const [dateInfo, setDateInfo] = useState<DateTimeResponse["Result"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch(
          "https://api.armin-soft.ir/Date-Time/?License=d5LAyJxbYst0egh2qNCdc6kWq0gdckmj&Next=0&Mounth=0"
        );
        const data: DateTimeResponse = await response.json();
        setDateInfo(data.Result);
      } catch (err) {
        setError("خطا در دریافت تاریخ");
        console.error("Error fetching date:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDate();
    // Update every minute
    const interval = setInterval(fetchDate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return { dateInfo, isLoading, error };
};
