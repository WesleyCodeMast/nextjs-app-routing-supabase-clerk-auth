import prisma from "@/client";
import { del, head, put } from "@vercel/blob";
const sharp = require("sharp");
async function downloadAndStore(key: string, url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}.`);
  }
  const file = await response.blob();
  if (file.size <= 300) {
    //Skip files that are 300 bytes or fewer
    throw new Error(`File is too small ${url}`);
  }

  // save blob in vercel
  const blob = await put(key, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}

async function downloadAndStoreResize(key: string, url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}.`);
  }
  try {
    const file = await response.blob();
    if (file.size <= 300) {
      //Skip files that are 300 bytes or fewer
      throw Error(`File is too small ${url}`);
      return null;
    }
    // Convert the Blob to Buffer
    const buffer = await file.arrayBuffer();

    // Resize the image with Sharp
    const resizedImageBuffer = await sharp(Buffer.from(buffer))
      .resize({ height: 400, withoutEnlargement: true }) // Resize to max width of 600 pixels
      .toBuffer();

    // Get the image type
    const metadata = await sharp(Buffer.from(buffer)).metadata();
    const imageType = metadata.format;

    // Convert the resized image buffer to Blob
    const resizedImageBlob = await new Blob([resizedImageBuffer], {
      type: `image/${imageType}`,
    });

    //image: resizedImageBlob, type: imageType };

    // save blob in vercel
    const imSize = resizedImageBlob.size;

    const blob = await put(key, resizedImageBlob, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const newImage = { url: blob.url, type: imageType, size: imSize };
    return newImage.url;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
}

export const uploadGameImages = async () => {
  "use server";

  let error0;
  let error1;
  let error2;
  let result1: any = [];
  let result2: any = [];
  let result3: any = [];
  const games = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_image: true,
    },
    where: {
      AND: [
        {
          vercel_image_url: null,
        },
        {
          game_image: {
            not: "",
          },
        },
      ],
    },
    take: 50,
    orderBy: { game_id: "desc" },
  });

  if (games && games.length > 0) {
    await Promise.allSettled(
      games.map(async (g: any) => {
        if (!g.game_image) {
          return;
        }

        const blob = await downloadAndStore(
          g.game_image,
          `https://admin.allfreechips.com/image/sloticonssquare/${encodeURIComponent(
            g.game_image,
          )}`,
        );

        await prisma.casino_p_games.update({
          data: {
            vercel_image_url: blob,
          },
          where: {
            game_id: g.game_id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }
  const casinos1 = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      clean_name: true,
    },
    where: {
      vercel_image_url: null,
      rogue: 0,
      approved: 1,
    },
    orderBy: { id: "desc" },
    take: 300,
  });
  //  casinos1.map((d,i) => {
  // console.log(d.clean_name);
  //  });
  // return;

  if (casinos1 && casinos1.length > 0) {
    await Promise.allSettled(
      casinos1.map(async (c: any) => {
        if (!c.clean_name) {
          return;
        }

        const key = c.clean_name + "-homescreen.jpg";
        const url = "https://radiumpowered.com/radiumimages/homepage/" + key;
        const blob = await downloadAndStoreResize(key, url);

        await prisma.casino_p_casinos.update({
          data: {
            vercel_image_url: blob,
          },
          where: {
            id: c.id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }

  const casinos2 = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      clean_name: true,
      button: true,
    },
    where: {
      vercel_casino_button: null,
    },
    orderBy: { id: "desc" },
  });

  if (casinos2 && casinos2.length > 0) {
    await Promise.allSettled(
      casinos2.map(async (c: any) => {
        if (!c.button) {
          return;
        }

        const blob = await downloadAndStore(
          c.button,
          "https://radiumpowered.com/radiumimages/casinoiconscut/" + c.button,
        );

        await prisma.casino_p_casinos.update({
          data: {
            vercel_casino_button: blob,
          },
          where: {
            id: c.id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }

  return {
    success: true,
    error0,
    error1,
    error2,
    games,
    casinos1,
    casinos2,
    result1,
    result2,
    result3,
  };
};

export const uploadSoftLargeImages = async () => {
  const software = await prisma.casino_p_software.findMany({
    select: {
      id: true,
      image: true,
    },
    where: {
      vercel_image_url: null,
    },
    take: 20,
  });

  if (software && software.length > 0) {
    await Promise.allSettled(
      software.map(async (s: any) => {
        if (!s.image) {
          return;
        }
        const blob = await downloadAndStore(
          s.image,
          "https://admin.allfreechips.com/image/software/" + s.image,
        );
        await prisma.casino_p_software.update({
          data: {
            vercel_image_url: blob,
          },
          where: {
            id: s.id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }
  /*  no longer using smalls
    const banks1 = await prisma.casino_p_banks.findMany({
        select: {
            id: true,
            image: true
        },
        where: {
            vercel_image_url: null
        },
        take: 100
    });



    if(banks1 && banks1.length > 0) {

        banks1.map(async (b : any) => {

            if(b.image != null) {
                let img = "https://www.allfreechips.com/image/banks/" + b.image;
                try{
                    const response = await fetch(img, { method: 'HEAD' });
                    if(response.status == 200) {
                        // push file in buffer  https://www.allfreechips.com/image/hp/drake-homescreen.jpg
                        let file = await fetch(img)
                        .then(res  => res.blob());
                        // save blob in vercel
                        const blob = await put(b.image, file, {
                            access: 'public',
                            token: process.env.BLOB_READ_WRITE_TOKEN
                        });
                        // update the database
                        const res = await prisma.casino_p_banks.update({
                            data: {
                                vercel_image_url: blob.url
                            },
                            where: {
                                id: b.id
                            }
                        });
                    }
                }
                catch(error) {
                    console.log(error);
                }
            }
        });
    }
    */
  const banks2 = await prisma.casino_p_banks.findMany({
    select: {
      id: true,
      largeimage: true,
    },
    where: {
      vercel_largeimage_url: null,
    },
    take: 200,
  });

  if (banks2 && banks2.length > 0) {
    await Promise.allSettled(
      banks2.map(async (b: any) => {
        if (!b.largeimage) {
          return;
        }
        const blob = await downloadAndStore(
          b.largeimage,
          "https://admin.allfreechips.com/image/banks/l/" + b.largeimage,
        );
        await prisma.casino_p_banks.update({
          data: {
            vercel_largeimage_url: blob,
          },
          where: {
            id: b.id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }

  const pGames = await prisma.casino_p_games_image.findMany({
    select: {
      game_image_id: true,
      game_image_url: true,
    },
    where: {
      vercel_image_url: null,
    },
    orderBy: { game_image_id: "desc" },

    take: 300,
  });

  if (pGames && pGames.length > 0) {
    await Promise.allSettled(
      pGames.map(async (g: any) => {
        if (!g.game_image_url) {
          return;
        }
        console.log("SLOTS :: " + g.game_image_url);
        const blob = await downloadAndStoreResize(
          g.game_image_url,
          "https://radiumpowered.com/resize/5800/100/" + g.game_image_url,
        );

        await prisma.casino_p_games_image.update({
          data: {
            vercel_image_url: blob,
            status: "fixed",
          },
          where: {
            game_image_id: g.game_image_id,
          },
        });
      }),
    ).then((results) => {
      results.forEach((p) => {
        if (p.status === "rejected") {
          console.error("Failure", p.reason);
        }
      });
    });
  }

  const allGames = await prisma.casino_p_games_image.findMany({
    select: {
      game_image_id: true,
      game_image_url: true,
      vercel_image_url: true,
    },
    where: {
      vercel_image_url: { not: null },
      vercel_image_size: null,
    },
    orderBy: { game_image_id: "desc" },
    take: 300,
  });

  if (allGames && allGames.length > 0) {
    allGames.map(async (g: any) => {
      if (!g.vercel_image_url) {
        return;
      }
      const blobDetails = await head(g.vercel_image_url);
      const size = blobDetails?.size ?? 0;
      //console.log('Check : id: ' +g.game_image_id + ' size: ' + size + ' img : ' + g.vercel_image_url);
      if (size > 250) {
        //console.log('Updating : id: ' +g.game_image_id + ' img : ' + g.vercel_image_url);
        await prisma.casino_p_games_image.update({
          data: {
            vercel_image_size: size,
          },
          where: {
            game_image_id: g.game_image_id,
          },
        });
      } else {
        // Image size 0 lets delete
        //console.log('removing : id: ' +g.game_image_id + ' img : ' + g.vercel_image_url);
        await del(g.vercel_image_url);
        await prisma.casino_p_games_image.update({
          data: {
            vercel_image_size: null,
            vercel_image_url: null,
          },
          where: {
            game_image_id: g.game_image_id,
          },
        });
      }
    });
  }
};
