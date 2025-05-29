import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { PostCard } from "./PostCard";
import Link from "next/link";
import { FiChevronsRight } from "react-icons/fi";
import { urlFor } from "@/sanity/image";
import { RelatedPostSkeleton } from "./RelatedPostSkeleton";

interface FetchPostsProps {
  query: string;
  params: {
    categories: string[];
    currentId: string;
  };
}

export const FetchPosts = async ({ query, params }: FetchPostsProps) => {
  const posts: SanityDocument[] = await client.fetch(query, params);
  const skeletonsNeeded = Math.max(0, 4 - posts.length);
  const skeletons = Array(skeletonsNeeded).fill(null);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="container mx-auto my-8">
      <div className="flex justify-between w-[90%] mx-auto items-center">
        <h2 className="text-lg font-[600] mb-4">Related Posts</h2>
        {posts[0]?.categories?.[0]?.slug?.current && (
          <Link
            href={`/postList/${posts[0].categories[0].slug.current}`}
            className="flex items-center gap-2 text-lg font-[500]"
          >
            More
            <FiChevronsRight />
          </Link>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 py-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <PostCard post={post} />
          </Link>
        ))}
        {skeletonsNeeded > 0 &&
          skeletons.map((_, index) => (
            <RelatedPostSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        {posts.map((post) => (
          <Link
            href={`/post/${post.slug.current}`}
            key={post._id}
            className="group flex gap-3 md:gap-4 items-start hover:bg-gray-50 p-3 md:p-4 rounded-lg transition-colors"
          >
            {/* Post Image */}
            {post.mainImage && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <div
                  className="w-full h-full bg-cover bg-center rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${urlFor(post.mainImage).width(200).url()})`,
                  }}
                />
              </div>
            )}

            {/* Post Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="overflow-hidden transition-all duration-300 ease-in-out">
                {post.synopsis && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 max-h-0 group-hover:max-h-[100px] transition-all duration-300 ease-in-out">
                    {post.synopsis}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
        {skeletonsNeeded > 0 &&
          skeletons.map((_, index) => (
            <RelatedPostSkeleton key={`mobile-skeleton-${index}`} />
          ))}
      </div>
    </section>
  );
};
