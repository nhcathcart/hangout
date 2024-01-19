"use server"
import { auth } from "@/auth";
import { prisma } from "@/server/db/client";

export async function checkAuth() {
  const session = await auth();
  if (session?.user) return true;
  return false;
}
export async function getAllPosts() {
  const res = await prisma.post.findMany();
  return res
}