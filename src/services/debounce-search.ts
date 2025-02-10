export const debounceSearch = (func: (...args: any[]) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), 1000);
  };
};
