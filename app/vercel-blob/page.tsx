import prisma from "@/client";
import Image from "next/legacy/image";
import { Metadata } from "next";
import { list } from "@vercel/blob";
import UploadToVercel from "../components/vercel-blob/UploadToVercel";
import { uploadGameImages } from "../lib/UploadImages";

export const revalidate = 0;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Image Processor";
  const description = "Allfreechips Images.";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function page() {
  "use server";
  let games = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_clean_name: true,
      game_image: true,
    },
    where: {
      vercel_image_url: null,
    },
    take: 100,
  });
  let totalGameCount = await prisma.casino_p_games.count();
  let savedGameCount = await prisma.casino_p_games.count({
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });
  let savedGames = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_image: true,
      vercel_image_url: true,
    },
    where: {
      vercel_image_url: {
        not: null,
      },
    },
    orderBy: {
      game_updated: "desc",
    },
    take: 30,
  });
  let savedCount = await prisma.casino_p_casinos.count({
    where: {
      AND: [
        {
          vercel_image_url: {
            not: null,
          },
        },
        {
          vercel_image_url: {
            not: "",
          },
        },
      ],
    },
  });
  let casinos = await prisma.casino_p_casinos.findMany({
    where: {
      AND: [
        {
          vercel_image_url: {
            not: null,
          },
        },
        {
          vercel_image_url: {
            not: "",
          },
        },
      ],
    },
    select: {
      id: true,
      clean_name: true,
      vercel_image_url: true,
      button: true,
      vercel_casino_button: true,
    },
  });
  let softwares = await prisma.casino_p_software.findMany({
    select: {
      id: true,
      vercel_image_url: true,
      image: true,
    },
    where: {
      vercel_image_url: {
        not: null,
      },
    },
    take: 10,
  });
  const blob1 = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    limit: 5,
  });
  // const upload = async (games) => {
  //     "use server";
  //     if(games && games.length > 0) {
  //         const result1 : any = [];
  //         console.log(games);
  //         games.map(async (g : any) => {
  //             if(g.game_image != '' && g.game_image != null) {
  //                 const img = 'https://www.allfreechips.com/image/sloticonssquare/'+ g.game_image;

  //                 const response = await fetch(img, { method: 'HEAD' });
  //                 if(response.status == 200) {
  //                     // push file in buffer
  //                     result1.push('head fetch');
  //                     let file = await fetch(img)
  //                     .then(res  => res.blob())
  //                     // save blob in vercel
  //                     const blob = await put(g.game_image, file, {
  //                         access: 'public',
  //                         token: process.env.BLOB_READ_WRITE_TOKEN
  //                     });
  //                     result1.push('db');

  //                     // update the database
  //                     const result = await prisma.casino_p_games.update({
  //                         data: {
  //                             vercel_image_url: blob.url
  //                         },
  //                         where: {
  //                             game_id: g.game_id
  //                         }
  //                     });

  //                     result1.push('result');
  //                 }
  //             }
  //         });
  //         return {result1};
  //     }
  // }

  // async function testUpload() {
  //     const result = await uploadGameImages();
  //     console.log(" *************** this is upload game image test ********************************* ");
  //     console.log(result);
  // }

  const deleteImage = async () => {
    "use server";

    const result0 = await prisma.casino_p_casinos.updateMany({
      data: {
        vercel_casino_button: null,
        vercel_image_url: null,
      },
    });

    const result1 = await prisma.casino_p_games.updateMany({
      data: {
        vercel_image_url: null,
      },
    });
  };
  const count1 = await prisma.casino_p_casinos.count({
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });
  const count2 = await prisma.casino_p_casinos.count({
    where: {
      vercel_casino_button: {
        not: null,
      },
    },
  });

  const count3 = await prisma.casino_p_software.count({
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });

  const count4 = await prisma.casino_p_banks.count({
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });

  const count5 = await prisma.casino_p_banks.count({
    where: {
      vercel_largeimage_url: {
        not: null,
      },
    },
  });
  const count6 = await prisma.casino_p_games_image.count({
    where: {
      vercel_image_url: {
        not: null,
      },
    },
  });
  const count7 = await prisma.casino_p_games_image.count({
    where: {
      vercel_image_url: {
        not: null,
      },
      vercel_image_size: null,
    },
  });
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
    take: 5,
  });
  const empty = "https://www.allfreechips.com/image/banks/visa.png";
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <div className="mt-2 p-2 py-8 text-center md:px-24">
        <h1 className="px-10 text-5xl font-bold ">
          blob images exists: &nbsp;{blob1?.blobs?.length}
        </h1>
        <h2 className="px-8 text-3xl font-semibold md:text-6xl ">
          In &nbsp;{totalGameCount}&nbsp; Games, &nbsp; {savedGameCount} Images
          has been saved currently .
        </h2>

        <h3>
          casinos homescreen saved: {count1}&nbsp;casinos... <br />
          casinos icons saved: {count2}&nbsp;casinos... software images saved:{" "}
          {count3}&nbsp;softwares... bank small images saved: {count4}&nbsp;bank
          small images... bank large images saved: {count5}&nbsp;bank large
          images... game_image large images saved: {count6}&nbsp;game large
          images... Images with no size yet: {count7}...
        </h3>
        <h2>This is software images...</h2>
        <ul className="list-decimal">
          {banks.map((b: any, index: number) => (
            <li className="py-2" key={index}>
              <Image
                unoptimized
                alt="image"
                width={240}
                height={160}
                src={b.vercel_largeImage_url ?? empty}
              />
              <div className="text-bold">
                <p className="text-base">vercel_largeimage_url image:&nbsp;</p>
                {b.vercel_largeimage_url}
              </div>
              <Image
                unoptimized
                alt="image"
                width={240}
                height={160}
                src={b.vercel_image_url ?? empty}
              />
              <div className="text-bold">
                <p className="text-base">vercel_image_url image:&nbsp;</p>
                {b.vercel_image_url}
              </div>
              <Image
                unoptimized
                alt="image"
                width={240}
                height={160}
                src={
                  `https://www.allfreechips.com/image/banks/` + b.largeimage ??
                  "blank.png"
                }
              />
              <div className="text-bold">
                <p className="text-base">large bank image:&nbsp;</p>
                {b.largeimage ?? "blank.png"}
              </div>
              <Image
                unoptimized
                alt="image"
                width={240}
                height={160}
                src={
                  `https://www.allfreechips.com/image/banks/` + b.image ??
                  "blank.png"
                }
              />
              <div className="text-bold">
                <p className="text-base">bank image:&nbsp;</p>
                {b.image}
              </div>
            </li>
          ))}
        </ul>
        <UploadToVercel
          onUpload={uploadGameImages}
          onDelete={uploadGameImages}
          games={games}
          savedGames={savedGames}
          uploadImages={uploadGameImages}
        />
      </div>
    </div>
  );
}
