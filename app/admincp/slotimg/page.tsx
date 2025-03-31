import prisma from "@/client";

export default async function slotfix() {
  const broke = await prisma.casino_p_games.findMany({
    where: { vercel_image_url: null },
    select: {
      game_id: true,
      game_image: true,
      game_software: true,
      software: true,
      game_name: true,
      game_clean_name: true,
    },
  });
  let newName;
  let link;
  console.log("Processing " + broke.length);
  broke.map((g, i) => {
    link = g.software.link;

    link = link.replace("-", "");
    link = link.replace("-", "");
    link = link.replace("-", "");
    let clenaName = g?.game_clean_name?.replace(g.software.link + "-", "");
    newName = link.substr(0, 6) + "-" + clenaName + ".png";
    // console.log(
    //   g.game_name +
    //     "game image is " +
    //     newName +
    //     " on software " +
    //     g.software.link,
    // );
    updatName(g.game_id, newName);
  });

  return (
    <div>
      <h3>Fix the slots images</h3>
    </div>
  );
}

async function updatName(id, newName) {
  await prisma.casino_p_games.update({
    where: { game_id: id },
    data: { game_image: newName },
  });
  return null;
}
