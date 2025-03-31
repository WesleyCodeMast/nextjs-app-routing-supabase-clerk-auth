import prisma from "@/client";
import InnerTextLinks from "@/app/lib/InnerTextLinks";

export default async function buildInterlinks() {
  // software content
  // content_id is the software ID

  const data = await prisma.casino_p_subcontent.groupBy({
    by: ["content_id"],
    where: { content_linked: null },
  });
  for (const d of data) {
    await processSoftware(d.content_id);
  }

  // process Casino Reviews
  const cdata = await prisma.casino_p_descriptions_casinos.groupBy({
    by: ["parent"],
    where: { description: { contains: "a" }, description_link: null },
  });
  for (const d of cdata) {
    await processCasinos(d.parent);
  }

  // process slot Reviews
  const sdata = await prisma.casino_p_descriptions_games.groupBy({
    by: ["parent"],
    where: { description: { contains: "a" }, description_link: null },
  });
  for (const d of sdata) {
    console.log("Processing Slot ID Num : " + d.parent);
    await processSlots(d.parent);
  }
  return "completed";
}

async function processCasinos(id) {
  // remove all linked content for the the casino first
  await prisma.casino_p_descriptions_casinos.updateMany({
    where: { parent: id },
    data: { description_link: null },
  });
  const content = await prisma.casino_p_descriptions_casinos.findMany({
    where: { parent: id },
    select: { description: true, id: true },
  });
  const linkpath = await prisma.casino_p_casinos.findMany({
    where: { id: id },
    select: { clean_name: true },
  });
  const url = "/casinos/" + linkpath[0].clean_name;
  let rev: any;
  for (const e of content) {
    let links = rev?.links ?? new Array();
    rev = await InnerTextLinks(e.description, url, links);
    //insert new linkd review into db
    if (rev.review && e.id) {
      await prisma.casino_p_descriptions_casinos.update({
        where: { id: e.id },
        data: { description_link: rev.review },
      });
    }
  }
  return null;
}

async function processSlots(id) {
  // remove all linked content for the the casino first
  await prisma.casino_p_descriptions_games.updateMany({
    where: { parent: id },
    data: { description_link: null },
  });
  const content = await prisma.casino_p_descriptions_games.findMany({
    where: { parent: id },
    select: { description: true, id: true },
  });
  const linkpath = await prisma.casino_p_games.findMany({
    where: { game_id: id },
    select: { game_clean_name: true },
  });
  const url = "/slots/" + linkpath[0].game_clean_name;
  let rev: any;
  for (const e of content) {
    let links = rev?.links ?? new Array();
    rev = await InnerTextLinks(e.description, url, links);
    //insert new linkd review into db
    if (rev.review && e.id) {
      await prisma.casino_p_descriptions_games.update({
        where: { id: e.id },
        data: { description_link: rev.review },
      });
    }
  }
  return null;
}

// Software
async function processSoftware(id) {
  await prisma.casino_p_subcontent.updateMany({
    where: { content_id: id },
    data: { content_linked: null },
  });

  const content = await prisma.casino_p_subcontent.findMany({
    where: { content_id: id },
    select: { content: true, content_id: true, id: true },
  });

  const software = await prisma.casino_p_software.findMany({
    where: { id: content[0].content_id },
    select: { link: true },
  });

  let rev: any;
  let url = "/software/" + software[0].link;
  for (const e of content) {
    let links = rev?.links ?? new Array();
    rev = await InnerTextLinks(e.content, url, links);
    //insert new linkd review into db
    if (rev.review && e.id) {
      await prisma.casino_p_subcontent.update({
        where: { id: e.id },
        data: { content_linked: rev.review },
      });
    }
  }
  return null;
}
