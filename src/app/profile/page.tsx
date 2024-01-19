import { getAllPostsByUser } from "../actions";
import PostCard from "../components/post-card";
export default async function Profile() {
  const posts = await getAllPostsByUser();
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </>
  );
}
