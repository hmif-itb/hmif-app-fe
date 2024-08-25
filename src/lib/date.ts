/**
 * Check if the first date is greater than or equal to the second date.
 */
export function isGreater(date1: string, date2: string): boolean {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return firstDate >= secondDate;
}
