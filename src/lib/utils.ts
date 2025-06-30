import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode() {
  const randomString = (length: number) =>
    Array.from({ length }, () =>
      String.fromCharCode(97 + Math.floor(Math.random() * 26))
    ).join("");

  const part1 = randomString(3);
  const part2 = randomString(4);
  const part3 = randomString(3);

  return `${part1}-${part2}-${part3}`;
}
