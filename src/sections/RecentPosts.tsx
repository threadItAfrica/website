import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { urlFor } from "@/sanity/image";
import { DateFormatter } from "@/components/DateFormatter";
import Link from "next/link";
import CarouselControls from "@/components/CarouselControls";
// import CarouselControls from "./CarouselControls"; // Import the Client Component for interactivity

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

export const RecentPosts = async () => {
  const posts: SanityDocument[] = await client.fetch(QUERY);

  return (
    <section className="max-w-[2024px] w-full md:w-[90%] lg:w-[80%] container mx-auto py-6 md:py-10 px-4 md:px-0">
      <h2 className="text-xl md:text-2xl font-[600] text-gray-800">Most Recent Posts</h2>
      <div className="relative">
        {/* Carousel Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group flex-shrink-0 h-fit w-[70%] sm:w-[45%] md:w-[calc(100%/3)] lg:w-[calc(100%/4)] xl:w-[calc(100%/5)] snap-center rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/post/${post.slug.current}`}>
                {/* Post Image */}
                {post.mainImage && (
                  <div
                    className="w-full h-[150px] sm:h-[180px] md:h-[200px] bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${urlFor(post.mainImage).url()})`,
                    }}
                  ></div>
                )}

                {/* Post Content */}
                <div className="p-3 md:p-4">
                  <p className="text-xs md:text-sm font-medium text-slate-700 mb-2 line-clamp-1">
                    {post.categories[0]?.title || "Uncategorized"}
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-1 hover:text-primary transition">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-4">
                    <DateFormatter dateString={post.publishedAt} />
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <CarouselControls />
      </div>
    </section>
  );
};
