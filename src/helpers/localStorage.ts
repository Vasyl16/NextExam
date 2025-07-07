export const setItem = <ItemType>(key: string, item: ItemType) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = <ItemItem>(key: string) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item) as ItemItem;
  }

  return null;
};
