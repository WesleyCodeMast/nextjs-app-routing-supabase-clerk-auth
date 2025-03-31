import prisma from "@/client";
/**
 *
 * type = 0: casino homescreen
 * type = 1: casino icons
 * type = 2: slot icons
 * type = 3: software icons
 * type = 4: bank image
 * type = 5: bank large image
 * type = 6: slot game image
 * type = 7: user avatars
 */

export const LoadImage = async (img, type): Promise<Blob> => {
  let result;

  if (type == 0) {
    const cleanName = img.split("-homescreen")[0];
    const casino = await prisma.casino_p_casinos.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        clean_name: cleanName,
      },
    });
    result = casino?.vercel_image_url;
  } else if (type == 1) {
    const casino = await prisma.casino_p_casinos.findFirst({
      select: {
        vercel_casino_button: true,
      },
      where: {
        button: decodeURIComponent(img),
      },
    });

    result = casino?.vercel_casino_button;
  } else if (type == 2) {
    const slot = await prisma.casino_p_games.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        game_image: decodeURIComponent(img),
      },
    });

    result = slot?.vercel_image_url;
  } else if (type == 3) {
    const software = await prisma.casino_p_software.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        image: decodeURIComponent(img),
      },
    });

    result = software?.vercel_image_url;
  } else if (type == 4) {
    const bank = await prisma.casino_p_banks.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        image: decodeURIComponent(img),
      },
    });

    result = bank?.vercel_image_url;
  } else if (type == 5) {
    const bank = await prisma.casino_p_banks.findFirst({
      select: {
        vercel_largeimage_url: true,
      },
      where: {
        largeimage: decodeURIComponent(img),
      },
    });

    result = bank?.vercel_largeimage_url;
  } else if (type == 6) {
    const game = await prisma.casino_p_games_image.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        game_image_url: decodeURIComponent(img),
      },
    });

    result = game?.vercel_image_url;
  } else if (type == 7) {
    const user = await prisma.user.findFirst({
      select: {
        vercel_image_store: true,
      },
      where: {
        image: decodeURIComponent(img),
      },
    });

    result = user?.vercel_image_store;
  } else if (type == 8) {
    const news = await prisma.news.findFirst({
      select: {
        vercel_image_url: true,
      },
      where: {
        image: decodeURIComponent(img),
      },
    });

    result = news?.vercel_image_url;
  }
  if (result) return fetch(result).then((res) => res.blob());
  else return new Blob();
};
