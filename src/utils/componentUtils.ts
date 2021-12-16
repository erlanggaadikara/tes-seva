import { maxPageWidthNumber, screenWidth } from "styles/GlobalStyle";

export const getSpacing = (childWidth: number, childCount?: number) => {
  const width =
    screenWidth > maxPageWidthNumber ? maxPageWidthNumber : screenWidth;
  const count = Math.floor(width / childWidth);
  const realCount = childCount ? childCount : count;
  return (width - realCount * childWidth) / (realCount + 1);
};

export const getClientHeight = () =>
  document.documentElement.clientHeight || document.body.clientHeight;

export const getClientWidth = () => Math.min(screenWidth, maxPageWidthNumber);
