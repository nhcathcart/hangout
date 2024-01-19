"use server";

import { prisma } from "@/server/db/client";
import { auth } from "@/auth";

export async function createPost(title: string, link?: string, text?: string) {
  const session = await auth();
  console.log(session)
  if (!session?.user?.id) throw new Error("Not authenticated");
  
  const res = await prisma.post.create({
    data: {
      title: title,
      link: link || undefined,
      text: text || undefined,
      authorId: session.user.id
    },
  });
  console.log(res);
}
