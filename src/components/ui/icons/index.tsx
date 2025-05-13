
import React from 'react';
import { LucideProps } from 'lucide-react';

export const Pills: React.FC<LucideProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m10.5 14.5 3-3" />
      <path d="M8.5 8.5 11 11" />
      <path d="M18.38 5.62 5.63 18.37a3 3 0 1 0 4.24 4.25l12.75-12.75a3 3 0 1 0-4.24-4.25Z" />
    </svg>
  );
};

export const VitaminIcon: React.FC<LucideProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 8h14" />
      <path d="M8 4h8l1 7c0 2.5-2 3-4 3s-4-.5-4-3Z" />
      <path d="M12 15v2" />
      <path d="M9 18h6" />
    </svg>
  );
};
