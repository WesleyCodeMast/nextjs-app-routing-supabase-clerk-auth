const latestFilter = (data) => {
  data?.forEach(function (d, index) {
    if (d.game_id == 6000) {
      delete d.game;
      d.game_id = null;
    }
    var dateV = new Date(d?.date * 1000);
    d.dateDisp = dateV.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  });
  return data;
};

export const categoriesFilter = (categories) => {
  let filterCategories: any = [];
  if (categories && categories.length > 0) {
    let cat1 = categories?.filter((cat) => cat.c_id >= 600);
    let cat2 = categories?.filter((cat) => cat.c_id < 600);
    filterCategories = [...cat1, ...cat2];
  }
  return filterCategories;
};
export default latestFilter;
