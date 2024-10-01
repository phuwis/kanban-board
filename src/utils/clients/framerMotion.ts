import { useTransform } from "framer-motion";

export const useParallaxY = (value, start: number, end: number) => {
  return useTransform(value, [0, 1], [start, end]);
};

export const useParallaxRev = (value, start: any, end: any) => {
  return useTransform(value, [0, 1], [start,  end]);
};
