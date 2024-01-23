import { getCommentsByUserId } from "@/app/actions";
import { dashify } from "@/utils/formaters";
import Link from "next/link";
import UserComment from "./components/user-comment";

export default async function CommentsPage() {
  const userComments = await getCommentsByUserId();
  return (
    <>
      {userComments.map((comment, index) => {
        return (
          <UserComment key={`user-comment-${comment.id}`} {...comment}/>
        );
      })}
    </>
  );
}
