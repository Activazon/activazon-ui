export const pulseObjectList = (num: number) => {
  return Array.from(Array(num).keys()).map((_, i) => ({
    id: i,
  }));
};
