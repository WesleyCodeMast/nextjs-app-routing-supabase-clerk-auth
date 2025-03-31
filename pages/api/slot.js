import cheerio from "cheerio";
import BonusFilter from "../../components/functions/bonusfilter";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  try {
    const slug = req.query.slug;
    const sp = req.query.sp;

    const data = await prisma.casino_p_games.findFirst({
      where: { game_clean_name: slug },
      select: {
        game_id: true,
        game_name: true,
        game_image: true,
        game_updated: true,
        game_faq: true,
        game_pros: true,
        game_cons: true,
        meta: {
          select: {
            title: true,
            description: true,
          },
        },
        review: {
          select: {
            description: true,
          },
        },
        software: {
          select: {
            id: true,
            software_name: true,
          },
        },
        game_images: {
          select: {
            game_image_url: true,
            game_image_alt_text: true,
          },
        },
        slot_theme: {
          select: {
            theme: true,
          },
        },
      },
    });
    //console.log(data);
    const swId = data.software.id;

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
        LIMIT 3`,
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
    });

    const bdata = LikeCasinoData.filter((p) => p.bonuses.length > 0);

    bdata.forEach(function (item, index) {
      let firstBonus = item.bonuses.find((v) => v.deposit > 0);
      let ndBonus = item.bonuses.find((v) => v.nodeposit > 0);
      item.nodeposit_type = "No Deposit";
      if (ndBonus) {
        item.nodeposit = ndBonus.nodeposit;
        item.nodepositplaythrough = ndBonus.playthrough;
        item.nodepositCode = ndBonus.code;
        if (ndBonus.code.length > 1) {
          item.ndCodeDisp = ndBonus.code;
        } else {
          item.ndCodeDisp = "No Code Used";
        }
        if (item.freespins > 0) {
          item.nodeposit_type = "Free Spins";
        }
      } else {
        item.ndCodeDisp = "No Code Used";
        item.nodeposit = 0;
        item.nodepositplaythrough = 0;
      }
      if (firstBonus) {
        item.deposit = firstBonus.deposit;
        item.depositBonus = firstBonus.deposit_amount;
        item.depositPlaythough = firstBonus.playthrough;
        item.depositCode = firstBonus.code;
        item.depositPercent = firstBonus.percent;
      } else {
        item.deposit = 0;
        item.depositBonus = 0;
        item.depositPlaythough = 0;
        item.depositCode = "No Bonus";
        item.depositPercent = 0;
      }
      if (item.depositCode.length > 1) {
        item.depCodeDisp = item.depositCode;
      } else {
        item.depCodeDisp = "No Code Used";
      }
      if (item.casino.length > 10) {
        item.casinoRevText = item.casino;
        item.casinoSiteText = "site";
      } else {
        item.casinoRevText = item.casino + " Review";
        item.casinoSiteText = "secure site";
      }

      delete item.bonuses;
    });

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
    const faq = data.game_faq;
    const pros = data.game_pros;
    const cons = data.game_cons;
    const prosCons = { pros, cons };

    res.status(200).json({
      doc: {
        data: data,
        gamedata: gamedata,
        bdata: bdata,
        faq: faq,
        prosCons: prosCons,
        swId: swId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error" });
  } finally {
    await prisma.$disconnect();
  }
}
