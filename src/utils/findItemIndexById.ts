interface Item {
  id: string;
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item) => item.id === id);
};
