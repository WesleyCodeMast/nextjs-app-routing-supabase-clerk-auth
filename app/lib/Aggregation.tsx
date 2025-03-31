export function _avg(input: any) {
  if (input && input.length > 0) {
    let result = 0;
    input.map((item) => {
      result += item.rating;
    });
    return result / input.length;
  } else return 0;
}
