"use server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/client";
import { Prisma } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();
  if (session?.user) return true;
  return false;
}
function flattenRes(res: PostsWithAuthor) {
  return res.map((post) => ({
    id: post.id,
    title: post.title,
    link: post.link,
    text: post.text,
    createdAt: post.createdAt.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
    updatedAt: post.updatedAt,
    name: post.author.name,
    image: post.author.image,
  }));
}
async function getPosts(){
  const res = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return res
}
type PostsWithAuthor = Prisma.PromiseReturnType<typeof getPosts>

export async function getAllPosts() {
  const res = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return flattenRes(res);
}

export async function getAllPostsByUser() {
  const session = await auth();
  const userid = session?.user?.id;
  const res = await prisma.post.findMany({
    where: {
      authorId: userid,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return flattenRes(res);
}
