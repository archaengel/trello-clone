export const moveItem = <T>(array: T[], from: number, to: number) => {
  const retArray = [...array];
  const startIndex = to < 0 ? array.length + to : to;
  const item = retArray.splice(from, 1)[0];
  retArray.splice(startIndex, 0, item);
  return retArray;
};
