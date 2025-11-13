import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNotEmptyObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    return false; 
  }
  return Object.keys(obj).length === 0;
}


export function generateDateString(date: Date) {
  const dateString = dayjs(date).format("DD/MM/YYYY");
  return dateString;
}