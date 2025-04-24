import Link from "next/link";
// import { FaArrowCircleRight } from "react-icons/fa";
import { client } from "@/sanity/client";
import AfricanFashionImage from "@/assets/images/african_fashion_image.jpg";
import EcoTrendsImage from "@/assets/images/eco_trends.png";
import GreenFashionImage from "@/assets/images/green_fashion_image.png";
import SustainabilityImage from "@/assets/images/sustainability_image.jpg";
import { urlFor } from "@/sanity/image";
import { Post } from "@/utils/interface";
import { PostTimeEstimator } from "@/components/PostTimeEstimator";
import { FiChevronsRight } from "react-icons/fi";
import { StaticImageData } from "next/image";

const QUERY = `*[_type == "category" && _id == $categoryId][0]{
  _id,
  title,
  description,
  slug,
  mainImage,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    description,
    synopsis,
    body,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
}`;
const categoriesTitle: Record<string, StaticImageData> = { 
  "Sustainability for Fashion Brands": SustainabilityImage,
  "Green Fashion 101": GreenFashionImage,
  "Eco Trends & Innovations": EcoTrendsImage
}

export const CategoryDisplay = async ({
  category,
}: {
  category: string;
}) => {
  const categoryData = await client.fetch(QUERY, { categoryId: category });

  if (!categoryData) return null;

  return (
    <section className="w-full container mx-auto px-4 md:px-0">
      <div className="w-full lg:w-[80%] xl:w-[60%] py-6 md:py-10 mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{categoryData.title}</h2>
        <div className="rounded-lg overflow-hidden flex flex-col md:flex-row gap-6">
          {/* Category Header */}
          <Link href={`postList/${categoryData.slug.current}`} className="md:w-2/5">
            <div className="py-4 md:py-6 border-b w-full h-fit shadow-sm group hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 mb-4 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-no-repeat bg-center mx-auto transform transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${
                      categoriesTitle[categoryData.title]?.src || AfricanFashionImage.src
                    }')`,
                  }}
                />
              </div>

              <div>
                <p className="text-gray-600 mt-2">{categoryData.description}</p>
                <span className="flex gap-2 items-center mt-4 text-primary font-medium group-hover:translate-x-2 transition-transform duration-300 delay-300">
                  Explore
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiChevronsRight />
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Posts Grid */}
          <div className="w-full md:w-3/5 md:p-6">
            <div className="grid gap-3 md:gap-4">
              {categoryData.posts?.map((post: Post) => (
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
                      <span>•</span>
                      <PostTimeEstimator body={post.body} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
