const formatValue = (value: number): string => {
  if (value) {
    const formatedValue = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatedValue;
  }
  const zero = 0;
  return zero.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default formatValue;
