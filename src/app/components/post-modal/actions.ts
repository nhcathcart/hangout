"use server";

import { prisma } from "@/server/db/client";

export async function createPost(title: string, link?: string, text?: string) {
  const res = await prisma.post.create({
    data: {
      title: title,
      link: link || undefined,
      text: text || undefined,
    },
  });
  console.log(res);
}
