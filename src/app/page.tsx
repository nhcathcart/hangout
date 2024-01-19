import PaddedContainer from "./components/padded-container";
import Card from "./components/card";
import { getAllPosts } from "./actions";

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <PaddedContainer>
      {posts.map((post) => {
        return (
          <Card key={post.title}>
            <p>{post.title}</p>
            <p>{post.text ? post.text : null}</p>
            <p>{post.link ? post.link : null}</p>
          </Card>
        );
      })}
    </PaddedContainer>
  );
}
