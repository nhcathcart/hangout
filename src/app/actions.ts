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
  //may want to generalize these but for now we will just write them as we need them.
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
function flattenCommentArray(res: CommentArrayWithAuthor) {
  return res.map((comment) => ({
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
    updatedAt: comment.updatedAt,
    name: comment.author.name,
    image: comment.author.image,
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      text: reply.text,
      createdAt: reply.createdAt.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
      updatedAt: reply.updatedAt,
      name: reply.author.name,
      image: reply.author.image,
    })),
  }));
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
  return res;
}
type PostByIdWithAuthor = Prisma.PromiseReturnType<typeof postById>;

async function getCommentsByPostId(postId: number) {
  // Get top-level comments
  const res = await prisma.comment.findMany({
    where: {
      postId: postId,
      parentId: null,
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
  // Get ids of top-level comments
  const resIds = res.map((comment) => comment.id);
  // Get replies for each top-level comment
  const replies = await prisma.comment.findMany({
    where: {
      parentId: {
        in: resIds,
      },
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

  // Combine replies with their corresponding parent comment
  const commentsWithReplies = res.map((comment) => ({
    ...comment,
    replies: replies.filter((reply) => reply.parentId === comment.id),
  }));
  return commentsWithReplies;
}

type CommentArrayWithAuthor = Prisma.PromiseReturnType<
  typeof getCommentsByPostId
>;
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

export async function createComment(postId: number, text: string) {
  const session = await auth();
  const userid = session?.user?.id;
  if (!userid) throw new Error("Not logged in");
  const res = await prisma.comment.create({
    data: {
      text: text,
      authorId: userid,
      postId: postId,
    },
  });
  return res;
}

export async function getComments(postId: number) {
  const res = await getCommentsByPostId(postId);
  return flattenCommentArray(res);
}
export type FlatComments = Prisma.PromiseReturnType<typeof getComments>;

export async function createReply(
  postId: number,
  text: string,
  commentId: number
) {
  const session = await auth();
  const userid = session?.user?.id;
  if (!userid) throw new Error("Not logged in");
  const res = await prisma.comment.create({
    data: {
      text: text,
      authorId: userid,
      postId: postId,
      parentId: commentId,
    },
  });
  return res;
}

interface CommentResult {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  postId: number;
  parentId: number | null;
  userId: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}

export interface NestedComment {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  postId: number;
  parentId: number | null;
  userId: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  replies: NestedComment[];
}


export async function getCommentsRecursive(postId: number): Promise<NestedComment[]> {
  const flatComments = await prisma.$queryRaw<CommentResult[]>`
    WITH RECURSIVE CommentTree AS (
      SELECT
        "id",
        "text",
        "createdAt",
        "updatedAt",
        "authorId",
        "postId",
        "parentId"
      FROM
        "Comment"
      WHERE
        "parentId" IS NULL -- Fetch only root comments
        AND "postId" = ${postId}
    
      UNION ALL
    
      SELECT
        c."id",
        c."text",
        c."createdAt",
        c."updatedAt",
        c."authorId",
        c."postId",
        c."parentId"
      FROM
        CommentTree ct
        JOIN "Comment" c ON ct."id" = c."parentId"
    )
    
    SELECT
      ct."id",
      ct."text",
      ct."createdAt",
      ct."updatedAt",
      ct."authorId",
      ct."postId",
      ct."parentId",
      u."id" AS "userId",
      u."name",
      u."email",
      u."emailVerified",
      u."image"
    FROM
      CommentTree ct
    JOIN
      "User" u ON ct."authorId" = u."id";
  `;

  const nestedComments: NestedComment[] = [];
  const commentMap = new Map<number, NestedComment>();

  flatComments.forEach((flatComment) => {
    const nestedComment: NestedComment = { ...flatComment, replies: [] };
    commentMap.set(flatComment.id, nestedComment);

    if (flatComment.parentId === null) {
      nestedComments.push(nestedComment);
    } else {
      const parentComment = commentMap.get(flatComment.parentId);
      if (parentComment) {
        parentComment.replies.push(nestedComment);
      }
    }
  });

  console.log("nestedComments is : ");
  console.dir(nestedComments, { depth: null });
  return nestedComments;
}
