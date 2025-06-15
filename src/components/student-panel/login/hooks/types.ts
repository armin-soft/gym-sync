
export interface StudentLoginState {
  phone: string;
  code: string;
  loading: boolean;
  error: string;
  locked: boolean;
  lockExpiry: Date | null;
  timeLeft: string;
  countdown: number;
  attempts: number;
}

export interface UseStudentLoginProps {
  onLoginSuccess: (phone: string) => void;
}

export type LoginStep = "phone" | "code";

export const STUDENT_VALID_CODE = "987654";
export const MAX_ATTEMPTS = 3;
export const RESEND_COUNTDOWN = 120;
