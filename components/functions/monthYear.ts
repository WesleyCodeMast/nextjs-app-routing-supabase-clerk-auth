const monthYear = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const year = d.getUTCFullYear();
  const month = months[d.getUTCMonth()];
  return month + " " + year;
};
export default monthYear;
