"use server";
import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { del, head, put } from "@vercel/blob";
const sharp = require("sharp");
export async function getLoginUser() {
  "use server";
  try {
    const session = await getServerSession(authOptions);
    let user: any = session?.user;
    return user;
  } catch (err) {
    console.log(err);
  }
  return undefined;
}

export async function updateUser() {
  "use server";
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const username = session?.user?.name;

  // when username does not exist though user login
  if (userEmail && (!username || username === "")) {
    const originUsers = await prisma.vb_user.findMany({
      select: {
        username: true,
        user_afc: true,
      },
      where: {
        email: userEmail,
      },
    });

    // when this user exist in origin site
    if (originUsers && originUsers.length > 0) var user: any = originUsers[0];

    // update user information if this user exist in original site
    try {
      const updateuser = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          name: user?.username,
          afcRewards: user?.user_afc,
          emailVerified: new Date(),
        },
      });

      return updateuser?.name;
    } catch (err) {
      console.log(err);
    }
  }
  return username;
}
export async function addUsername(
  email: string,
  id: string,
  username: string,
  avatar: any,
  bio: string,
) {
  "use server";

  console.log(email, id, username, bio);
  let newUrl;
  // there is an avatar uploading...
  if (avatar) {
    const key2 = id + Math.floor(Math.random() * 100); // make image name diff for cache
    
    if (avatar.includes("base64")) {
      // avatar is base 64 string value type, download and store. and if there was a old avatar, then remove it...
      avatar = await downloadAndStore(key2, avatar);
      newUrl = key2 + "." + avatar.type;
      const oldBlob = await getUserBlob(id);
      if (oldBlob) {
        // destroy old stored image
        await del(oldBlob, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      }
      try {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            name: username,
            image: newUrl,
            vercel_image_store: avatar.url,
            emailVerified: new Date(),
            bio: bio,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      try {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            name: username,
            image: avatar.url,
            emailVerified: new Date(),
            bio: bio,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
  // there is no avatar upload
  try {
    let defaultAvatar = "data:image/png;base64,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";
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },  
      select: {
        image: true,
        vercel_image_store: true
      }
    })
    // user has a avatar currently.
    if(user?.image) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: username,
          emailVerified: new Date(),
          bio: bio,
        },
      });  
    }    
    else {
      // user has no avatar currently, by default set the user avatar as default avatar.
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: username,
          image: defaultAvatar,
          emailVerified: new Date(),
          bio: bio,
        },
      });
  
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }

  return false;
}

async function downloadAndStore(key: string, file: any) {
  try {
    // Convert the Blob to Buffer

    // const temo = file;
    // const buffer = temo.split(";base64,").pop(); // strip off base64 code
    // let imgBuffer = Buffer.from(buffer, "base64");
    if (!file) {
      return null;
    }
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

async function getUserBlob(id) {
  const blobV = await prisma.user.findFirst({
    where: { id: id },
    select: {
      image: true,
      vercel_image_store: true,
    },
  });

  return blobV?.vercel_image_store;
}

export async function checkNameExist(name: string) {
  const result = await prisma.user.findFirst({
    where: { name: name },
  });

  return result?.id;
}
