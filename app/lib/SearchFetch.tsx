"use server";
import prisma from "@/client";

export async function getCount(type, key) {
  switch (type) {
    case 1: {
      try {
        const count = await prisma.casino_p_casinos.count({
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
              {
                casino: {
                  contains: key,
                  mode: "insensitive",
                },
              },
            ],
          },
        });

        return count;
      } catch (err) {
        console.log(err);
      }
    }

    case 2: {
      try {
        const result: any = await prisma.casino_p_games.count({
          where: {
            OR: [
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
              {
                game_name: {
                  contains: key,
                  mode: "insensitive",
                },
              },
              {
                slot_theme: {
                  some: {
                    theme: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          },
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    }
    default:
      return null;
  }
}

export async function searchData(type, key, firstPageIndex) {
  switch (type) {
    case 1: {
      try {
        const results: any = await prisma.casino_p_casinos.findMany({
          select: {
            id: true,
            casino: true,
            button: true,
            clean_name: true,
            meta: { select: { title: true } },
          },
          where: {
            approved: 1,
            rogue: 0,
            OR: [
              // {
              //   meta: {
              //     some: {
              //       title: {
              //         startsWith: key,
              //         mode: 'insensitive',
              //       },
              //     },
              //   },
              // },
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
              // {
              //   casino: {
              //     startsWith: key,
              //     mode: 'insensitive',
              //   },
              // },
              {
                casino: {
                  contains: key,
                  mode: "insensitive",
                },
              },
            ],
          },
          take: 5,
          skip: firstPageIndex,
        });
        return results;
      } catch (err) {
        console.log(err);
      }
    }
    case 2: {
      try {
        const result: any = await prisma.casino_p_games.findMany({
          select: {
            game_id: true,
            game_name: true,
            game_image: true,
            game_clean_name: true,
            meta: {
              select: {
                title: true,
              },
            },
          },
          where: {
            OR: [
              // {
              //   meta: {
              //     some: {
              //       title: {
              //         startsWith: key,
              //         mode: 'insensitive',
              //       },
              //     },
              //   },
              // },
              {
                meta: {
                  some: {
                    title: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
              // {
              //   game_name: {
              //     startsWith: key,
              //     mode: 'insensitive',
              //   },
              // },
              {
                game_name: {
                  contains: key,
                  mode: "insensitive",
                },
              },
              {
                slot_theme: {
                  some: {
                    theme: {
                      contains: key,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          },
          take: 5,
          skip: firstPageIndex,
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    }
    default:
      return null;
  }
}
