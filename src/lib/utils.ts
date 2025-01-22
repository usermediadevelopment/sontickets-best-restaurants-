import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnabledValueForEnv = () => {
  const env = process.env.VERCEL_ENV;
  if (env == "preview") {
    return "false";
  } else {
    return "true";
  }
};
