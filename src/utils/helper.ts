export const integerToDecimal = (n: number, idx: number): number => {
  const integerString: string = n.toString();

  if (integerString.length <= 1) {
    return n;
  }

  const integerPart: string = integerString.slice(0, idx);
  const decimalPart: string = integerString.slice(idx);

  return parseFloat(`${integerPart}.${decimalPart}`);
};

export const stopPropagation = (e: any) => {
  e.stopPropagation();
};
