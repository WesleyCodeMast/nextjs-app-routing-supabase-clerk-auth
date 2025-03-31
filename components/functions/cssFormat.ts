export default function cssFormat(string: string, h: string = "h9") {
  let hval: any = null;
  let newH: string = "<h4>";
  if (
    h == "h1" ||
    h == "h2" ||
    h == "h3" ||
    h == "h4" ||
    h == "h5" ||
    h == "h6"
  ) {
    hval = h;

    // set all Headers to selected if set or leave as is if not
  } else {
    hval = null;
  }

  if (string) {
    string = string.replace(
      /<p>/g,
      '<p class ="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">',
    );
    newH = hval ?? "h4";
    string = string.replace(
      /<h4>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    newH = hval ?? "h5";
    string = string.replace(
      /<h5>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    newH = hval ?? "h3";
    string = string.replace(
      /<h3>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    newH = hval ?? "h1";
    string = string.replace(
      /<h1>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    newH = hval ?? "h2";
    string = string.replace(
      /<h2>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    newH = hval ?? "h6";
    string = string.replace(
      /<h6>/g,
      "<" + newH + ' class ="my-4 text-3xl font-semibold">',
    );
    string = string.replace(
      /<ul>/g,
      '<ul className="list-disc ml-12 pl-4 font-normal">',
    );

    return string;
  }
  return null;
}
