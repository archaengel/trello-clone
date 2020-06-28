export const moveItem = <T>(array: T[], from: number, to: number) => {
  const start = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(start, 0, item);
  return array;
};
