import PaddedContainer from "./components/padded-container";
import Card from "./components/card";
import { getAllPosts } from "./actions";
import PostCard from "./components/post-card";

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <PaddedContainer>
      {posts.map((post) => {
        return (
          <PostCard key={post.title} {...post}/>
        );
      })}
    </PaddedContainer>
  );
}
