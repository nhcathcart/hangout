"use server"

import { prisma } from "@/server/db/client";

export async function getAllPosts() {
  const res = await prisma.post.findMany();
  console.log("res type is: ", typeof res)
  console.log("res is: ", res)
  return res
}