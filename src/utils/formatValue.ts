const formatValue = (value: number): string =>
  Intl.NumberFormat().format(value);

export const formatDate = (date: Date): string => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [
    { value: month },
    { value: slash1 },
    { value: day },
    { value: slash2 },
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${day}${slash1}${month}${slash2}${year}`;
};

export default formatValue;
