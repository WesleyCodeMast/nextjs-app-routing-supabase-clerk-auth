import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import prisma from "../../client";
import MessageList from "./_Components/MessageList";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";
import { aggregateMessageLike } from "./_lib/utils";
import { revalidateTag } from "next/cache";

async function clear() {
  "use server";
  revalidateTag("fetch-chat");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Community Chat, lets talk about whatever!";
  const description =
    "Hang out with the fun AFC members and discuss anything you like as long as you do not get offensive.";
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

export default async function Chat() {
  const session = await getServerSession(authOptions);
  let userEmail = session?.user?.email || "never@addUsername.no"; //  stop prisma from returning a val on undefined
  let user: any = session?.user ?? null;
  if (!userEmail || userEmail == "" || user?.role == 3) {
    user = null;
  }
  const myId = user?.id;
  async function updateMessage(message: any) {
    "use server";

    await prisma.chatMessage.update({
      where: {
        id: message.id,
      },
      data: {
        message: message.message,
      },
    });
    await clear();
  }

  async function removeMessage(messageId: string) {
    "use server";
    const result = await prisma.chatMessage.delete({
      where: {
        id: messageId,
      },
    });
    await clear();
    return messageId;
  }

  async function like(message: any) {
    "use server";
    if (myId) {
      let liked = await prisma.tb_pbot.findFirst({
        where: {
          messageId: message.id,
          authorId: myId,
        },
      });

      if (message.userId != myId && myId) {
        if (!liked) {
          await prisma.tb_pbot.create({
            data: { messageId: message.id, authorId: myId },
          });

          await prisma.chatMessage.update({
            where: {
              id: message.id,
            },
            data: { like: { increment: 1 } },
          });
        } else {
          await prisma.tb_pbot.delete({
            where: { id: liked.id },
          });
          await prisma.chatMessage.update({
            where: {
              id: message.id,
            },
            data: { like: { decrement: 1 } },
          });
        }
      }
    }
    await clear();
    return message;
  }

  async function sendMessage(message: any) {
    "use server";

    if (message.length > 0 && message.length <= 400) {
      let result = await prisma.chatMessage.create({
        data: { message, author: { connect: { email: userEmail } }, like: 0 },
      });
      await clear();
      const updatedMessages = async () => {
        await prisma.chatMessage.findMany({
          select: {
            createdAt: true,
            message: true,
            authorId: true,
            like: true,
            id: true,
            author: {
              select: { name: true, image: true, role: true, email: true },
            },
            likes: {
              select: { authorId: true },
              where: { authorId: user?.id },
            },
          },
          where: {
            id: result.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return updatedMessages[0];
      };
    }
  }

  async function getMessages() {
    "use server";

    const messages = await unstable_cache(
      async () => {
        const msg = await prisma.chatMessage.findMany({
          select: {
            createdAt: true,
            message: true,
            authorId: true,
            like: true,
            id: true,
            author: {
              select: { name: true, image: true, role: true, email: true },
            },
            likes: {
              select: { authorId: true },
              where: { authorId: user?.id },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 25,
        });
        return msg;
      },
      ["fetch-chat"],
      { revalidate: 30000, tags: ["fetch-chat"] },
    )();

    let updatedMessages = aggregateMessageLike(messages);

    return updatedMessages;
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <MessageList
          getMessages={getMessages}
          user={user}
          like={like}
          updateMessage={updateMessage}
          removeMessage={removeMessage}
          sendMessage={sendMessage}
        />
      </section>
    </>
  );
}
