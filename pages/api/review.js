import { Prisma } from "@prisma/client";
import cheerio from "cheerio";
import BonusFilter from "../../components/functions/bonusfilter";

export default async function handler(req, res) {
  try {
    const slug = req.query.slug;
    const bp = req.query.bp;
    const sp = req.query.sp;

    const data = await prisma.casino_p_casinos.findFirst({
      where: { clean_name: slug },
      select: {
        id: true,
        casino_faq: true,
        casino_pros: true,
        casino_cons: true,
        clean_name: true,
        casino: true,
        updated: true,
        button: true,
        meta: true,
        homepageimage: true,
        bonuses: {
          orderBy: {
            position: "desc",
          },
        },
        banklist: {
          select: {
            bank_data: true,
          },
        },
        review: {
          select: {
            description: true,
          },
          orderBy: {
            ordered: "desc",
          },
        },
        softwares: {
          select: {
            softwarelist: true,
          },
        },
      },
    });

    const swId = data.softwares
      .filter((x) => x.softwarelist.id > 0)
      .map((x) => x.softwarelist.id);

    const gamedata = await prisma.$queryRawUnsafe(
      `SELECT s.software_name,g.game_name,g.game_clean_name,g.game_reels,g.game_lines,g.game_image FROM casino_p_games g

          LEFT JOIN casino_p_software s
          ON g.game_software = s.id
          LEFT JOIN casino_p_descriptions_games d
          ON g.game_id = d.parent
          WHERE game_software in (` +
        swId +
        `)
          AND d.description != ''
          OFFSET ${5 * (sp - 1)}
          LIMIT ${5}`,
      // ORDER BY RANDOM ()
    );
    // Find 3 casinos that share the same software as the reviewd casino
    const casinodata = await prisma.$queryRawUnsafe(
      `SELECT c.id FROM casino_p_casinos c
        LEFT JOIN casino_p_software_link s
        on s.casino = c.id
        WHERE s.software in (` +
        swId +
        `)
          AND c.approved = 1
          AND c.rogue = 0
          LIMIT 5`,
      // ORDER BY RANDOM ()
    );

    const likeCasinoIds = casinodata.map((x) => x.id); // make a list of casinos that matched software

    const LikeCasinoData = await prisma.casino_p_casinos.findMany({
      where: {
        id: { in: likeCasinoIds },
      },
      select: {
        id: true,
        clean_name: true,
        casino: true,
        button: true,
        homepageimage: true,
        bonuses: {
          orderBy: {
            position: "desc",
          },
        },
      },
      take: 3,
    });

    const bdatav = LikeCasinoData.filter((p) => p.bonuses.length > 0);

    const bdata = BonusFilter(bdatav);

    data.review = data.review.map((entry) => {
      let desc = entry.description;
      const $ = cheerio.load(desc);
      $("p").addClass("my-4");
      $("h1").addClass("text-3xl font-semibold my-6 md:text-4xl");
      $("h2").addClass("text-3xl font-semibold my-6 md:text-4xl");
      $("h3").addClass("text-3xl font-semibold my-6 md:text-4xl");
      $("h4").addClass("text-3xl font-semibold my-6 md:text-4xl");
      $("h5").addClass("text-3xl font-semibold my-6 md:text-4xl");
      $("h6").addClass("text-3xl font-semibold my-6 md:text-4xl");
      return { description: $.html() };
    });
    const faq = data.casino_faq;
    const pros = data.casino_pros;
    const cons = data.casino_cons;
    const prosCons = { pros, cons };

    res.status(200).json({
      doc: {
        data: data,
        gamedata: gamedata,
        bdata: bdata,
        faq: faq,
        prosCons: prosCons,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error" });
  }
}
