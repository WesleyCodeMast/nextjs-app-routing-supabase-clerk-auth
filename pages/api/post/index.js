import { getSession } from "next-auth/react";
import prisma from "../../../client";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });

  // test email

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      vote_down: 35,
      vote_down: 2,
      added: "fdsa",
      author: { connect: { email: session?.user?.email } },
      // author: { connect: { email: email } }
    },
  });
  res.json(result);
}
