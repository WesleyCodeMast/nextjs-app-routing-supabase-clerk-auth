import prisma from "@/client";
import cheerio from "cheerio";
//  Link structure for each section
const casinolink = "/casinos/";
const slotslink = "/slots/";
const softwarelink = "/software/";
const banklink = "/casino-banks/";

export default async function InnerTextLinks(
  string,
  url = "/",
  links = new Array(),
) {
  if (!string) {
    return null;
  }

  const removedA = cleanupHtml(string); //  removes all current a href tags and css from major elements
  const working = removeHtml(removedA);
  const addLink = await addLinks(working.string, url, links);
  const insert = await completeLinks(addLink.rev, addLink.links);
  const review = revertHtml(insert.rev, working.replaced);
  links = addLink.links;
  return { review, links };
}

async function completeLinks(string, links) {
  let rev = string;
  let sLen = "";
  links.map((d, i) => {
    sLen = rev.length;
    rev = rev.replace(
      "REPLINK" + d[0] + "END",
      '<a href = "' + d[2] + '">' + d[1] + "</a>",
    );
    if (rev.length !== sLen) {
      // we had a match so remove KW from array
      d[1] = "ALREADY_USED";
    }
  });
  return { links, rev };
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function addLinks(string, url, links) {
  let rev = string;

  if (!links[0]) {
    links = await buildLinks(url); // if we have the links array already great or build it for the first time
    const getStat = TempArr(); // static links to add on.
    let numOf = links.length;
    // uppercase version
    getStat.map((d) => {
      links.push([numOf, capitalizeFirstLetter(d[0]), d[1]]);
      numOf++;
    });
    //  make lower case version
    getStat.map((d) => {
      links.push([numOf, d[0].toLowerCase(), d[1]]);
      numOf++;
    });
  }
  links = shuffle(links); // shuffle to get ready for dupe purge

  let m = new Map();
  for (const e of links) {
    if (!m.has(e[1])) m.set(e[1], e);
  }
  const newL = Array.from(m.values());

  newL.sort((a, b) => b[1].length - a[1].length); // sort to use longest anchors first
  newL.map((d, i) => {
    // make sure we don't link to self (url)
    if (url !== d[2]) {
      let working = Object(makeLink(d[1], d[0], rev));
      rev = working.string;
      //links[i][1] = working.linkText;  // was used for case but were not doing case
    }
  });
  links = newL;
  return { rev, links };
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function makeLink(linkText, id, string: string = "") {
  // Random return to not over stuff text
  const rndNum = getRandomInt(9);
  if (rndNum > 5) {
    //console.log("Rando Retuno" + rndNum)
    return { string, linkText };
  }
  let temp = "";
  let useWord = 5;
  let end = new Array();
  end[0] = " ";
  end[1] = ",";
  end[2] = ".";
  let word = new Array();
  word[0] = " " + linkText + " ";
  word[1] = " " + linkText + ",";
  word[2] = " " + linkText + ".";

  temp = string.split(word[0])[0];

  if (temp !== string) {
    useWord = 0;
  }
  if (useWord == 5) {
    temp = string.split(word[1])[0];
    if (temp !== string) {
      useWord = 1;
    }
  }
  if (useWord == 5) {
    temp = string.split(word[2])[0];
    if (temp !== string) {
      useWord = 2;
    }
  }
  if (useWord == 5) {
    // no match
    return { string, linkText };
  }

  //   string = string.replace( RegExp(" " + linkText + end[useWord], 'i')
  //   ,
  //   " " + "REPLINK" + id + end[useWord],
  // );

  string = string.replace(
    " " + linkText + end[useWord],
    " " + "REPLINK" + id + "END" + end[useWord],
  );
  return { string, linkText };
}

function revertHtml(string, replace) {
  replace.map((r, i) => {
    string = string.replace("REPV" + i + "END", r);
  });
  return string;
}

function removeHtml(string) {
  var replaced;
  const tags = ["ul", "b", "a", "h1", "h2", "h3", "h4", "h5", "h6"];
  tags.map((t, i) => {
    if (replaced?.replaced[0]) {
      replaced = pullHtmlElements(string, t, replaced.replaced);
    } else {
      replaced = pullHtmlElements(string, t);
    }

    string = replaced.string;
  });
  return replaced;
}

function pullHtmlElements(string, tag, replaced = new Array()) {
  //var replaced = new Array;
  let r = 1;
  let failsafe = 0;
  var temp = "";
  var element = "";
  var count = replaced.length;
  const open = "<" + tag;
  const close = "</" + tag + ">";
  while (r == 1) {
    temp = string.split(close)[0];
    temp = temp.split(open)[1];
    if (temp) {
      element = open + temp + close;
      replaced[count] = element;
      string = string.replace(element, "REPV" + count + "END");
      count++;
    } else {
      r = 0;
    }
    failsafe++;
    if (failsafe > 100) {
      r = 0;
    }
  }
  return { string, replaced };
}

async function buildLinks(url: string) {
  var build: any = [];
  var id = 0;
  //load all active casinos
  const casinos = await prisma.casino_p_casinos.findMany({
    where: {
      approved: {
        equals: 1,
      },
      rogue: {
        equals: 0,
      },
    },
    select: {
      clean_name: true,
      casino: true,
    },
    orderBy: { id: "asc" },
  });
  let urlmap = "";
  casinos.map((v, i) => {
    urlmap = casinolink + v.clean_name;
    if (urlmap !== url && v.clean_name) {
      build.push([id, v.casino, urlmap]);
      id++;
      build.push([id, v.casino + " casino", urlmap]);
      id++;
    }
  });
  //  add slots

  const slots = await prisma.casino_p_games.findMany({
    where: {
      game_image: { not: "" },
      game_images: {
        some: {
          vercel_image_url: { not: "" },
        },
      },

      review: {
        some: {
          description: {
            contains: "a",
          },
        },
      },
    },
    select: {
      game_clean_name: true,
      game_name: true,
    },
  });
  urlmap = "";
  slots.map((v, i) => {
    urlmap = slotslink + v.game_clean_name;
    if (urlmap !== url && v.game_clean_name) {
      build.push([id, v.game_name, urlmap]);
      id++;
      build.push([id, v.game_name + " slot", urlmap]);
      id++;
    }
  });

  // add software
  const software = await prisma.casino_p_software.findMany({
    where: {
      show: 1,
    },
    select: {
      link: true,
      software_name: true,
    },
  });
  urlmap = "";
  software.map((v, i) => {
    urlmap = softwarelink + v.link;
    if (urlmap !== url && v.link) {
      build.push([id, v.software_name + " slots", urlmap]);
      id++;
      build.push([id, v.software_name + " casinos", urlmap]);
      id++;
      build.push([id, v.software_name, urlmap]);
      id++;
      build.push([id, v.software_name + " online casinos", urlmap]);
      id++;
      build.push([id, v.software_name + " no deposit casinos", urlmap]);
      id++;
    }
  });
  // add banks
  const banks = await prisma.casino_p_banks.findMany({
    select: {
      id: true,
      name: true,
      display: true,
    },
    where: {
      status: { equals: 1 },
      w: { gt: 0 },
    },
  });

  urlmap = "";
  let dname = "";
  banks.map((v, i) => {
    urlmap = banklink + v.name;
    dname = v.display ?? v.name;
    if (urlmap !== url) {
      build.push([id, dname, urlmap]);
      id++;
    }
  });

  return build;
}

function TempArr() {
  let tempArr = new Array();
  //Manal additions

  tempArr.push(["Allfreechips", "/"]);
  tempArr.push(["AFC", "/"]);
  tempArr.push(["Online casino guide", "/"]);
  tempArr.push(["Free spin casinos", "/"]);
  tempArr.push(["casino bonus list", "/"]);
  tempArr.push(["Casino bonuses", "/"]);
  tempArr.push(["Free scratch card games", "/"]);
  tempArr.push(["No Deposit Casino Bonus Codes", "/"]);

  tempArr.push(["top online casino list", "/"]);
  tempArr.push(["Best No Deposit Casinos", "/"]);
  tempArr.push(["complete online casino guide", "/"]);
  tempArr.push(["No Deposit Bonuses", "/"]);
  tempArr.push(["best casinos", "/"]);

  tempArr.push(["best free chips", "/"]);
  tempArr.push(["Casino guide", "/"]);
  tempArr.push(["USA online casinos", "/"]);
  tempArr.push(["Best online casinos", "/"]);
  tempArr.push(["casinos for US play", "/"]);
  tempArr.push(["Casino Bonuses", "/"]);
  tempArr.push(["USA Casino guide", "/"]);
  tempArr.push(["No Deposit Casino Bonus Codes", "/"]);
  tempArr.push(["Casino Bonuses for free", "/"]);
  tempArr.push(["Allfreechips", "/"]);

  tempArr.push(["USA", "/usa-casinos"]);
  tempArr.push(["USA casinos", "/usa-casinos"]);
  tempArr.push(["USA casino", "/usa-casinos"]);
  tempArr.push(["USA casino guide", "/usa-casinos"]);
  tempArr.push(["play USA casinos", "/usa-casinos"]);
  tempArr.push(["USA casino", "/usa-casinos"]);
  tempArr.push(["US casino guide", "/usa-casinos"]);
  tempArr.push(["No deposit USA casinos", "/usa-casinos"]);
  tempArr.push(["All USA casinos", "/usa-casinos"]);
  tempArr.push(["casinos you can play in USA", "/usa-casinos"]);

  tempArr.push(["USA Bitcoin casino", "/bitcoin-casinos"]);
  tempArr.push(["Bitcoin casino", "/bitcoin-casinos"]);
  tempArr.push(["Bitcoin", "/bitcoin-casinos"]);
  tempArr.push(["play Bitcoin casino", "/bitcoin-casinos"]);
  tempArr.push(["play with Bitcoin", "/bitcoin-casinos"]);
  tempArr.push(["Bitcoin online casinos", "/bitcoin-casinos"]);
  tempArr.push(["Bitcoin online casino", "/bitcoin-casinos"]);
  tempArr.push(["crypto online casinos", "/bitcoin-casinos"]);
  tempArr.push(["Crypto casinos", "/bitcoin-casinos"]);
  tempArr.push(["Crypto casino", "/bitcoin-casinos"]);

  tempArr.push(["No Deposit", "/no-deposit-casinos"]);
  tempArr.push(["Best No Deposit", "/no-deposit-casinos"]);
  tempArr.push(["Best No Deposit online casinos", "/no-deposit-casinos"]);
  tempArr.push(["best No Deposit online casino", "/no-deposit-casinos"]);
  tempArr.push(["Best No Deposit casino", "/no-deposit-casinos"]);
  tempArr.push(["No Deposit online casino", "/no-deposit-casinos"]);
  tempArr.push(["No Deposit casinos", "/no-deposit-casinos"]);

  tempArr.push(["No Deposit online casinos", "/no-deposit-casinos"]);
  tempArr.push(["No Deposit casino", "/no-deposit-casinos"]);
  tempArr.push(["Free No Deposit online casinos", "/no-deposit-casinos"]);
  tempArr.push(["Free No Deposit casino", "/no-deposit-casinos"]);
  tempArr.push(["No deposit casino bonus", "/no-deposit-casinos"]);
  tempArr.push(["No deposit casino bonuses", "/no-deposit-casinos"]);
  tempArr.push(["free spin", "/free-spin-casinos"]);
  tempArr.push(["Best free spin", "/free-spin-casinos"]);
  tempArr.push(["Best free spin online casinos", "/free-spin-casinos"]);
  tempArr.push(["best free spin online casino", "/free-spin-casinos"]);
  tempArr.push(["Best free spin casino", "/free-spin-casinos"]);
  tempArr.push(["free spin online casino", "/free-spin-casinos"]);
  tempArr.push(["free spin casinos", "/free-spin-casinos"]);

  tempArr.push(["free spin online casinos", "/free-spin-casinos"]);
  tempArr.push(["free spin casino", "/free-spin-casinos"]);
  tempArr.push(["Free free spin online casinos", "/free-spin-casinos"]);
  tempArr.push(["Free free spin casino", "/free-spin-casinos"]);
  tempArr.push(["free spin casino bonus", "/free-spin-casinos"]);
  tempArr.push(["free spin casino bonuses", "/free-spin-casinos"]);

  return tempArr;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function cleanupHtml(string) {
  // remove CSS and <a> links
  const $ = cheerio.load(string);
  $("a").replaceWith((_, e) => `${$(e).html()}`); // remove a tag
  $("span").replaceWith((_, e) => `<span>${$(e).html()}</span>`); // remove css
  $("h1").replaceWith((_, e) => `<h1>${$(e).html()}</h1>`); // remove css
  $("h2").replaceWith((_, e) => `<h2>${$(e).html()}</h2>`); // remove css
  $("h3").replaceWith((_, e) => `<h3>${$(e).html()}</h3>`); // remove css
  $("h4").replaceWith((_, e) => `<h4>${$(e).html()}</h4>`); // remove css
  $("h5").replaceWith((_, e) => `<h5>${$(e).html()}</h5>`); // remove css
  $("h6").replaceWith((_, e) => `<h6>${$(e).html()}</h6>`); // remove css
  $("p").replaceWith((_, e) => `<p>${$(e).html()}</p>`); // remove css from <p>
  $("ul").replaceWith((_, e) => `<ul>${$(e).html()}</ul>`); // remove css
  $("li").replaceWith((_, e) => `<li>${$(e).html()}</li>`); // remove css
  const out = $("body").html();
  return out;
}
