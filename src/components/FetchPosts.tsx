import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { Card } from "./postCard";
import Link from "next/link";
import { FiChevronsRight } from "react-icons/fi";

export const FetchPosts = async ({query}: {query: string}) => {
  // Fetch posts directly on the server
  
  const posts: SanityDocument[] = await client.fetch(query);

  return (
    <section className="container mx-auto my-8">
      <div className="flex justify-between w-[90%] mx-auto items-center">
        <h2 className="text-lg font-[600] mb-4">Related Posts</h2>
        <Link
          href={`/postList/${posts[0].categories[0].slug.current}`}
          className="flex items-center gap-2 text-lg font-[500]"
        >
          More
          <FiChevronsRight  />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-4 py-4 w-full h-full">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <Card  post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
};
