const Currency = (string) => {
  const arr = string.split(",");
  let cur = "";
  arr.forEach(function (i) {
    let t = "";
    if (i == "1") {
      t = "\u0024";
    } else if (i == "2") {
      t = "\u20AC";
    } else if (i == "3") {
      t = "\u00A3";
    } else if (i == "4") {
      t = "\u20BF"; // BTC
    } else if (i == "5") {
      t = "R"; // Rand
    } else if (i == "6") {
      t = "m\u20BF"; // mBTC
    } else if (i == "7") {
      t = "FUN";
    }
    cur = cur + "/" + t;
  });
  const str = cur.substring(1);
  return str;
};
export default Currency;
