import { SanityDocument } from "next-sanity";
import { DateFormatter } from "./DateFormatter";
import { urlFor } from "@/sanity/image";

export const Card = ({ post }: { post: SanityDocument }) => (
  <div className="w-full min-w-[320px] max-w-[330px] h-[310px] rounded-xl shadow-xl block transition-shadow duration-300 ease-in-out hover:shadow-2xl">
    <div className="w-full h-full p-4 flex flex-col justify-between">
    <div
        className="w-full h-[50%] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${urlFor(post.mainImage).url()})` }}
      ></div>
      <div className="w-full h-fit">
        <h2 className="text-lg font-[600]  line-clamp-2">{post.title}</h2>
        {post.synopsis && (
          <p className="my-2 text-sm line-clamp-3">
            {post.synopsis.length > 80
              ? `${post.synopsis.slice(0, 80)}...`
              : post.synopsis}
          </p>
        )}
        <p className="text-sm text-gray-400">
          <DateFormatter dateString={post.publishedAt} />
        </p>
      </div> 
    </div>
  </div>
);
