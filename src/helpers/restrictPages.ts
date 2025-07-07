export const restrictPages = (totalPages: number) => {
  return totalPages > 500 ? 500 : totalPages;
};
