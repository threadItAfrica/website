import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import CarouselControls from "@/components/CarouselControls";
import PostSkeleton from "@/components/PostSkeleton";
import { PostCard } from "@/components/PostCard"; 
import { Suspense } from "react";

// Revalidate the data every 60 seconds
export const revalidate = 60;

const QUERY = `*[_type == "post"]|order(publishedAt desc)[0...10]{
  _id,
  title, 
  categories[]->{
    _id,
    title
  },
  body,
  slug,
  mainImage,
  publishedAt
}`; 

const PostsList = async () => {
  const posts: SanityDocument[] = await client.fetch(QUERY, {}, {
    next: { revalidate: 60 }
  });
  const skeletonsNeeded = Math.max(0, 5 - posts.length);
  const skeletons = Array(skeletonsNeeded).fill(null);
  
  return (
    <>
      {posts.map((post) => ( 
        <PostCard  key={post._id} post={post} /> 
      ))}
      {skeletonsNeeded > 0 && skeletons.map((_, index) => (
        <PostSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
};

export const RecentPosts = () => {
  return (
    <section className="max-w-[2024px] w-full h-full md:w-[90%] lg:w-[80%] container mx-auto py-6 md:py-10 px-4 md:px-0">
      <h2 className="text-xl md:text-2xl font-[600] text-gray-800">Most Recent Posts</h2>
      <div className="relative">
        {/* Carousel Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6">
          <Suspense fallback={Array(5).fill(null).map((_, index) => (
            <PostSkeleton key={`loading-${index}`} />
          ))}>
            <PostsList />
          </Suspense>
        </div>

        {/* Navigation Buttons */}
        <CarouselControls />
      </div>
    </section>
  );
};
