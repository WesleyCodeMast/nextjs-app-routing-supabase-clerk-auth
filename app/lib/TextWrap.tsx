export const textWrap = (str: string, len: number) => {
  let initResult = str;
  if (str.length > len) {
    initResult = str.slice(0, len - 2) + "...";
  }

  return initResult;
};
