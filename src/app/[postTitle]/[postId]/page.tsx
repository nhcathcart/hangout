import { getPostById } from "@/app/actions";
import PaddedContainer from "@/app/components/padded-container";


export default async function PostPage({
  params,
}: {
  params: { postTitle: string; postId: string };
}) {
  const postIdNum = Number(params.postId)
  const post = await getPostById(postIdNum);
  return(
    <PaddedContainer>
      <h1>{post.title}</h1>
    </PaddedContainer>
  )
}
