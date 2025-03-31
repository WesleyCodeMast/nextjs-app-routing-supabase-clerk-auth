import prisma from "@/client";
import { del, head, list } from "@vercel/blob";

export const RemoveImages = async () => {
  "use server";

  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    limit: 500,
  });

  const updatedcasinos = await prisma.casino_p_casinos.updateMany({
    data: {
      vercel_image_url: null,
      vercel_casino_button: null,
    },
    where: {
      OR: [
        {
          vercel_casino_button: {
            not: null,
          },
        },
        {
          vercel_image_url: {
            not: null,
          },
        },
      ],
    },
  });

  await prisma.casino_p_games_image.updateMany({
    data: {
      vercel_image_url: null,
    },
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });

  blobs.map(async (b: any) => {
    await del(b.url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  });

  await prisma.casino_p_banks.updateMany({
    data: {
      vercel_image_url: null,
      vercel_largeimage_url: null,
    },
    where: {
      OR: [
        {
          vercel_image_url: {
            not: null,
          },
        },
        {
          vercel_largeimage_url: {
            not: null,
          },
        },
      ],
    },
  });

  await prisma.casino_p_software.updateMany({
    data: {
      vercel_image_url: null,
    },
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });

  const updatedGames = await prisma.casino_p_games.updateMany({
    data: {
      vercel_image_url: null,
    },
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });

  return {
    success: "removed",
    blobs: blobs,
    updatedcasinos,
    updatedGames,
  };
};

export async function removeBankImageFromVercelWithId() {
  "use server";

  const banks = await prisma.casino_p_banks.findMany({
    where: {
      vercel_largeimage_url: {
        not: null,
      },
    },
    select: {
      id: true,
      vercel_largeimage_url: true,
      image: true,
      vercel_image_url: true,
      largeimage: true,
    },
    take: 10,
  });
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    limit: 10,
  });
  let result: any = [];
  let step: any = [];
  if (banks && banks.length > 0) {
    banks.map(async (bank, index) => {
      step.push(1);
      if (bank && bank.vercel_largeimage_url) {
        step.push(2);
        try {
          let vercel_image_url1 = bank.vercel_largeimage_url;
          step.push(3);
          step.push(blobs[0].url);
          const blob1 = await head(blobs[0].url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          step.push(blob1);
          const blobDetails = await head(vercel_image_url1, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          step.push(blobDetails);
          await del(bank.vercel_largeimage_url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          step.push(4);
          await prisma.casino_p_banks.update({
            data: {
              vercel_largeimage_url: null,
            },
            where: {
              id: bank.id,
            },
          });
          step.push(5);
          result.push(bank);
          step.push(6);
        } catch (e) {
          step.push(7);
          console.log(e);
          result.push(e);
        }
      }
    });
  }
  return {
    result: result,
    step: step,
    banks: banks,
    blobs: blobs,
  };
}

export async function testRemoveVercelImage() {
  "use server";

  const vercelLargeImage =
    "https://e4tchmxe7stjffhy.public.blob.vercel-storage.com/mastercard-IryH54ZjGvOcHwJ0hqcsCx88YLW6f0.jpg";
  let step: any = [];
  const bank = await prisma.casino_p_banks.findFirst({
    select: {
      id: true,
      image: true,
      vercel_image_url: true,
      largeimage: true,
      vercel_largeimage_url: true,
    },
    where: {
      vercel_largeimage_url: vercelLargeImage,
    },
  });
  step.push(1);
  if (bank)
    try {
      step.push(2);
      const blob1 = await head(vercelLargeImage, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      step.push(3);
      step.push(blob1);
      await del(vercelLargeImage, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      step.push(4);
      await prisma.casino_p_banks.update({
        data: {
          vercel_largeimage_url: null,
        },
        where: {
          id: bank.id,
        },
      });
      step.push(true);
    } catch (error) {
      step.push(error);
    }
  return { result: step };
}
