import dayjs from 'dayjs';

/**
 * Generates an array of date objects for a given month and year, including prefix and suffix dates to fill a 6x7 calendar grid.
 * Each date object includes whether the date belongs to the current month and whether it is today's date.
 *
 * @param {number} [month=dayjs().month()] - The month for which to generate the dates (0-11).
 * @param {number} [year=dayjs().year()] - The year for which to generate the dates.
 * @returns {Array} Array of date objects with properties: currentMonth (boolean), date (dayjs object), and today (boolean).
 */
export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year(),
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

/**
 * An array of month names.
 *
 * @type {string[]}
 */
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
