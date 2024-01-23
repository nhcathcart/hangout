import { getPostById } from "@/app/actions";
import PaddedContainer from "@/app/components/padded-container";
import Post from "./components/post";
import Comments from "./components/comments";
import { auth } from "@/auth";



export default async function PostPage({
  params,
}: {
  params: { postTitle: string; postId: string };
}) {
  const postIdNum = Number(params.postId)
  const post = await getPostById(postIdNum);
  const session = await auth();
  return(
    <PaddedContainer>
      <Post {...post}/>
      <Comments postId={post.id} username={session?.user.name} userAvatar={session?.user.image}/>
    </PaddedContainer>
  )
}
