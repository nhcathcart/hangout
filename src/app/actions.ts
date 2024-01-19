"use server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/client";
import { Prisma } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();
  if (session?.user) return true;
  return false;
}
//helpers and generated types, exports below
function flattenResArray(res: PostArrayWithAuthor) {
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
function flattenRes(res: PostByIdWithAuthor) {
  if (!res) throw new Error("Post not found");
  return {
    id: res.id,
    title: res.title,
    link: res.link,
    text: res.text,
    createdAt: res.createdAt.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
    updatedAt: res.updatedAt,
    name: res.author.name,
    image: res.author.image,
  };
}
async function posts() {
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
  return res;
}
type PostArrayWithAuthor = Prisma.PromiseReturnType<typeof posts>;
async function postById(id: number) {
  const res = await prisma.post.findUnique({
    where: {
      id: id,
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
  return res
}
type PostByIdWithAuthor = Prisma.PromiseReturnType<typeof postById>;

//actions that are called from the client -- these are 
export async function getAllPosts() {
  const res = await posts();
  return flattenResArray(res);
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
  return flattenResArray(res);
}

export async function getPostById(id: number) {
  const res = await postById(id);
  return flattenRes(res);
}
