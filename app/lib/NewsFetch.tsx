import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { put, del } from "@vercel/blob";
const sharp = require("sharp");

export const recentNewsFetch = async (payload) => {
  const { softwareCat, slotCat, casinoCat, count } = payload;
  const category = softwareCat
    ? "software"
    : slotCat
      ? "slot"
      : casinoCat
        ? "casino"
        : undefined;
  const subCat = softwareCat || slotCat || casinoCat;
  let subCategory;
  try {
    if (category == "software") {
      const software = await prisma.casino_p_software.findFirst({
        select: {
          software_name: true,
        },
        where: {
          link: subCat,
        },
      });
      subCategory = software?.software_name;
    }
    if (category == "casino") {
      const casino = await prisma.casino_p_casinos.findFirst({
        select: {
          casino: true,
        },
        where: {
          clean_name: subCat,
        },
      });
      subCategory = casino?.casino;
    }
    if (category == "slot") {
      const slot = await prisma.casino_p_games.findFirst({
        select: {
          game_name: true,
        },
        where: {
          game_clean_name: subCat,
        },
      });
      subCategory = slot?.game_name;
    }
    if (category) {
      const news = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          createdAt: true,
          link: true,
        },
        where: {
          category: category,
          subCategory: subCategory,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: count,
      });
      return {
        news: news,
        subCategory: subCategory,
      };
    } else {
      const news = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          createdAt: true,
          link: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: count,
      });
      return {
        news: news,
        subCategory: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      news: [],
      subCategory: subCategory,
    };
  }
};

export async function addNews(data: any) {
  "use server";
  const session = await getServerSession(authOptions);
  let user: any = session?.user;
  const userRole: Number = Number(user?.role);
  const userEmail = session?.user?.email ?? null; //  stop prisma from returning a val on undefined
  let myId: any = user?.id;

  if (!myId || (user?.role !== 0 && user?.role !== 9 && user?.role !== 3))
    return null;

  let link = data?.title.replace(/ /gi, "-");
  link = link.toLowerCase();
  link = link.replace(/[^\w\s-]/gi, "");

  let imgName = link.slice(0, 25) + Math.floor(Math.random() * 50);
  const resImage = await downloadAndStore(imgName, data?.image);
  const imageStore = imgName + "." + resImage.type;
  console.log(imageStore);
  let result = await prisma.news.create({
    data: {
      title: data?.title,
      author: { connect: { id: myId } },
      category: data?.category,
      subCategory: data?.subCategory,
      description: data?.description,
      link: link,
      vercel_image_url: resImage?.url,
      image: imageStore,
    },
  });
  return { id: result?.id };
}

export async function updateNews(news: any) {
  "use server";
  const session = await getServerSession(authOptions);
  let user: any = session?.user;
  const userRole: Number = Number(user?.role);
  const userEmail = session?.user?.email ?? null; //  stop prisma from returning a val on undefined
  let myId: any = user?.id;

  if (!userEmail) {
    user = null;
  }

  if (
    !user ||
    !myId ||
    (user?.role !== 0 && user?.role !== 9 && user?.role !== 3)
  )
    return null;

  let link = news?.title.replace(/ /gi, "-");
  link = link.toLowerCase();
  link = link.replace(/[^\w\s-]/gi, "");

  let imgName = link.slice(0, 25) + Math.floor(Math.random() * 50);
  //delete storeed image
  const remove = del(news.vercel_image_url);
  const resImage = await downloadAndStore(imgName, news?.image);
  const imageStore = imgName + "." + resImage.type;

  try {
    let result = await prisma.news.update({
      where: {
        id: news?.id,
      },
      data: {
        image: imageStore,
        vercel_image_url: resImage.url,
        title: news?.title,
        description: news?.description,
        author: { connect: { id: myId } },
        link: link,
        category: news?.category,
        subCategory: news?.subCategory,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function downloadAndStore(key: string, file: any) {
  try {
    // Convert the Blob to Buffer

    // const temo = file;
    // const buffer = temo.split(";base64,").pop(); // strip off base64 code
    // let imgBuffer = Buffer.from(buffer, "base64");

    const base64Data = file.split(",")[1]; // Extract base64 data
    const buffer = Buffer.from(base64Data, "base64"); // Convert base64 to Buffer

    // Resize the image with Sharp
    const resizedImageBuffer = await sharp(Buffer.from(buffer))
      .resize({ width: 300, withoutEnlargement: true }) // Resize to max width of 600 pixels
      .toBuffer();

    // Get the image type
    const metadata = await sharp(Buffer.from(buffer)).metadata();
    const imageType = metadata.format;

    // Convert the resized image buffer to Blob
    const resizedImageBlob = new Blob([resizedImageBuffer], {
      type: `image/${imageType}`,
    });

    //image: resizedImageBlob, type: imageType };

    // save blob in vercel
    let av_name = key + "." + imageType;
    const blob = await put(av_name, resizedImageBlob, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const newImage = { url: blob.url, type: imageType };
    return newImage;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
}
