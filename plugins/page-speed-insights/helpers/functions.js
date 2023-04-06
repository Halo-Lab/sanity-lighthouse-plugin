const month = [
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
]

export const getMonthByIdx = (idx) => month[idx]

export const random_rgba = () => {
  var o = Math.round,
    r = Math.random,
    s = 255
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')'
}

export const filterDates = (dates, startDate, endDate) => {
  const filteredDates = []
  for (const date of dates) {
    // Convert date string to Date object
    const dateObj = new Date(date)
    // Check if date is within the specified range
    if (startDate <= dateObj && dateObj <= endDate) {
      filteredDates.push(date)
    }
  }
  return filteredDates
}
