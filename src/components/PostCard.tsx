import { SanityDocument } from "next-sanity";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { DateFormatter } from "./DateFormatter";

export const PostCard = ({ post }: { post: SanityDocument }) => {
  // console.log(post)
  return (
    <div className="max-w-[320px] group flex-shrink-0 h-fit w-full snap-center rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 font-body">
      <Link key={post._id} href={`/post/${post.slug.current}`}>
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
            {post.categoryTitles ||  post?.categories[0]?.title || ""}
          </p>
          <h3 className="text-base md:text-lg font-heading font-semibold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.synopsis && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {post.synopsis}
            </p>
          )}
          <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-4">
            <DateFormatter dateString={post.publishedAt} />
          </p>
        </div>
      </Link>
    </div>
  );
};
