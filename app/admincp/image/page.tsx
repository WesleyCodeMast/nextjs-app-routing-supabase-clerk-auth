import Image from "next/image";
import { del, head, put } from "@vercel/blob";
import prisma from "@/client";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
const sharp = require("sharp");
export default async function Pic() {
  return (
    <div className="mx-auto w-60">
      <h4>Image with opt</h4>
      <div className="w-60">
        <Image
          className="h-full max-h-[inherit] w-full object-contain"
          src={"/image/casino/homescreen/new-funclub-homescreen.jpg"}
          width={2560}
          height={1600}
          alt={"Optimized"}
        ></Image>
      </div>

      <h4>Image without opt</h4>
      <div className="w-60">
        <Image
          unoptimized
          src={"/image/casino/homescreen/new-funclub-homescreen.jpg"}
          width={2560}
          height={1600}
          alt={"Unoptimized"}
        ></Image>
      </div>

      {/* <form action={action}>
        <input type="hidden" name="type" value="3" />
        <LoadMoreButton text="Add More" />
      </form> */}
    </div>
  );
}
async function RandomCache() {
  const number = 7;
  return number;
}
async function userImage() {
  const users = await prisma.user.findMany({
    where: { image: { contains: "base64" } },
    select: { name: true, id: true, image: true },
  });

  let newimage;
  let newUrl;
  users.map(async (u, i) => {
    if (u.image !== null && u.image.indexOf("http") == 0) {
      return null; // already an image url
    } else {
      // base64
      const urls = "https://www.allfreechips.com/chat/avatar/" + u.id;

      newimage = await downloadAndStore(u.id, urls);

      newUrl = u.id + "." + newimage.type;
      // insert into profile
      await prisma.user.update({
        where: { id: u.id },
        data: {
          vercel_image_store: newimage.url,
          image: newUrl,
          image_backup: u.image,
        },
      });
    }
  });
  return null;
}

async function downloadAndStore(key: string, url: string, url2: string = "") {
  let response = await fetch(url);
  let file;
  let response2;
  if (!response.ok) {
    response = await fetch(url2);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url2}.`);
    }
  }
  try {
    file = await response.blob();
    if (file.size <= 300) {
      response2 = await fetch(url2);
      if (!response2.ok) {
        throw new Error(`Failed to fetch ${url2}.`);
      }
      file = await response2.blob();
      console.log("used Radium");
      if (file.size <= 300) {
        //Skip files that are 300 bytes or fewer
        throw Error(`File is too small ${url}`);
        return null;
      }
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

    return newImage;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
}

async function replaceSlotImages() {
  const images = await prisma.casino_p_games_image.findMany({
    where: {
      status: null,
      vercel_image_size: { gt: 60000 },
    },
    select: {
      game_image_parent: true,
      status: true,
      game_image_id: true,
      game_image_url: true,
      game_image_name: true,
      vercel_image_url: true,
    },
    orderBy: { vercel_image_size: "desc" },
    take: 5000,
  });
  for (const image of images) {
    await ProcessIm(image);
  }
}

async function ProcessIm(im) {
  let urls;
  let url2;
  let newImage;
  let delIm;
  let statusUpdate;

  urls = "https://admin.allfreechips.com/image/slots/" + im?.game_image_url;
  url2 = "https://radiumpowered.com/resize/1000/100/" + im?.game_image_url;
  newImage = await downloadAndStore(im?.game_image_url, urls, url2);
  delIm = await del(im?.vercel_image_url ?? "none");
  statusUpdate = "fixed";
  console.log(newImage);
  console.log("Updating " + im.game_image_id + " Image : " + newImage.url);
  // let ms = 20;
  // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  await prisma.casino_p_games_image.update({
    where: { game_image_id: im.game_image_id },
    data: {
      status: statusUpdate,
      vercel_image_url: newImage.url,
      vercel_image_size: newImage.size,
    },
  });
  return true;
}

async function action(formData: FormData) {
  "use server";
  let type = formData.get("type");
  const type2 = Number(type) ?? 0;
  if (type2 == 3) {
    const test = await replaceSlotImages();
  }
}
