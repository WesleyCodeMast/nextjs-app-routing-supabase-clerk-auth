import prisma from "@/client";

export const removeItemfromNotificationlist = async (id) => {
  "use server";

  try {
    await prisma.contactMessage.update({
      where: {
        id: id,
      },
      data: {
        read: true,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const replyMessage = async ({
  email,
  message,
  toEmail,
  name,
  replyedId,
}) => {
  try {
    const updated = await prisma.contactMessage.update({
      where: {
        id: replyedId,
      },
      data: {
        replyed: true,
      },
    });

    const result = await prisma.contactMessage.create({
      data: {
        author: { connect: { email: email } },
        message: message,
        name: name,
        toEmail: toEmail,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function fetchUnreadMessages({ email }) {
  "use server";
  try {
    const messages = await prisma.contactMessage.findMany({
      select: {
        id: true,
        createdAt: true,
        message: true,
        name: true,
        email: true,
        toEmail: true,
        author: { select: { name: true, image: true, role: true } },
      },
      where: {
        toEmail: email,
        read: false,
        replyed: false,
      },
      take: 5,
    });
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchUnreadMessagesCount({ email }) {
  "use server";
  try {
    const count = await prisma.contactMessage.count({
      where: {
        toEmail: email,
        read: false,
        replyed: false,
      },
    });
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function fetchAllMessages(email) {
  "use server";
  try {
    if (email) {
      const messages = await prisma.contactMessage.findMany({
        select: {
          id: true,
          createdAt: true,
          message: true,
          name: true,
          author: { select: { name: true, image: true, role: true } },
        },
        where: {
          toEmail: {
            equals: email,
          },
          read: false,
          replyed: false,
        },
      });

      return messages;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const readAllMessages = async (email) => {
  try {
    await prisma.contactMessage.updateMany({
      where: {
        toEmail: {
          equals: email,
        },
        read: false,
      },
      data: {
        read: true,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
