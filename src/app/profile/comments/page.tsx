import { getCommentsByUserId } from "@/app/actions";
import { dashify } from "@/utils/formaters";
import Link from "next/link";

export default async function CommentsPage() {
  const userComments = await getCommentsByUserId();
  return (
    <>
      {userComments.map((comment, index) => {
        return (
          <a
            href={`/${dashify(comment.post.title)}/${comment.postId}#${comment.id}`}
            key={comment.id}
          >
            {comment.text}
          </a>
        );
      })}
    </>
  );
}
