import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/postCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { LuArrowLeftToLine } from "react-icons/lu";
import sustainability from "@/assets/images/sustainability.png"; // Fallback image
import EcoTrends from "@/assets/images/eco_trends.png"; // Fallback image
import GreenFashion from "@/assets/images/green_fashion.png"; // Fallback image
import AfricanFashion from "@/assets/images/arican_fashion.png"; // Fallback image

const POSTS_PER_PAGE = 12;
const POST_QUERY = `*[_type == "post" && $category in categories[]->slug.current]|order(publishedAt asc)[$start...$end]{
  _id,
  title,
  slug,
  mainImage,
  synopsis,
  publishedAt,
  "authorName": author->name,
  "categoryTitles": categories[]->title
}`;

const TOTAL_POSTS_QUERY = `count(*[_type == "post" && $category in categories[]->slug.current])`;

const options = { next: { revalidate: 30 } };

// Define the PageProps type
type PageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};
const TitleSection = ({category}: {category: string}) => (
  <div
  className="relative bg-cover bg-center text-white py-8 md:h-[20vh] conatiner  max-w-[2024px] mx-auto"
  style={{
    backgroundImage:
      category === "sustainability-for-fashion-brands"
        ? `url('${sustainability.src}')`
        : category === "eco-trends-innovations"
          ? `url('${EcoTrends.src}')`
          : category === "green-fashion-101"
            ? `url('${GreenFashion.src}')`
            : category === "african-fashion-history"
              ? `url('${AfricanFashion.src}')`
              : "",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-65"></div>

  <div className="relative w-full z-10 flex items-center justify-center h-full">
    <p className="text-lg md:text-3xl capitalize py-2 px-4 mx-auto rounded-lg w-fit font-[500] mb-4">
      {category.split("-").join(" ")} Posts
    </p>
  </div>
</div>
)
export default async function PostList({ params, searchParams }: PageProps) {
  // Await params to resolve the Promise
  const resolvedParams = await params;
  const cat = resolvedParams.category;

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || "1", 10);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch posts for the specific category
  const posts = await client.fetch<SanityDocument[]>(
    POST_QUERY,
    { category: cat, start, end },
    options
  );

  // Fetch total number of posts for pagination
  const totalPosts = await client.fetch<number>(TOTAL_POSTS_QUERY, {
    category: cat,
  });

  console.log({cate: cat});

  if (!posts.length) {
    return (
      <main>
        <Header />
        <TitleSection category={cat}/>
        <section className="w-[80%] mx-auto mt-16 min-h-[80vh]">
          <p className="text-primary bg-white py-2 px-4 rounded-lg w-fit font-bold shadow-lg mb-4">
            {cat.split("-").join(" ").toLocaleUpperCase()}
          </p>
          <div className="min-h-[70vh] w-full">
            <p>No posts found.</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <TitleSection category={cat}/>
    
      <section className="container mt-[2vh] mx-auto lg:min-h-[90vh] flex flex-col justify-between">
        <div className="flex flex-wrap justify-evenly gap-4 w-full h-full">
          {posts.map((post: SanityDocument) => (
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
              className="w-fit h-fit"
            >
              <Card post={post} />
            </Link>
          ))}
        </div>

        {/* Pagination Tab */}
        <div className="flex justify-between items-center gap-4 my-8">
          <div>
            {page > 1 && (
              <Link
                href={`/postList/${cat}?page=1}`}
                className="text-white py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                <LuArrowLeftToLine className="w-6 h-6" />
                Back to Page 1
              </Link>
            )}
          </div>

          <div className="flex justify-between items-center gap-4 ">
            {/* Previous Button */}
            {page > 1 && (
              <Link
                href={`/postList/${cat}?page=${page - 1}`}
                className="text-white py-2 px-6 rounded-lg bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                <FaArrowLeft />
                Previous
              </Link>
            )}

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from(
                { length: Math.ceil(totalPosts / POSTS_PER_PAGE) },
                (_, index) => (
                  <Link
                    key={index + 1}
                    href={`/postList/${cat}?page=${index + 1}`}
                    className={`py-2 px-6 rounded-lg ${
                      page === index + 1
                        ? "border-[1px] border-primary text-primary"
                        : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {index + 1}
                  </Link>
                )
              )}
            </div>

            {/* Next Button */}
            {page < Math.ceil(totalPosts / POSTS_PER_PAGE) && (
              <Link
                href={`/postList/${cat}?page=${page + 1}`}
                className="text-white py-2 px-6 rounded-lg bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                Next
                <FaArrowRight />
              </Link>
            )}
          </div>

          <div className="">
            <p className="text-sm lg:text-md flex justify-center items-center gap-2">
              Page{" "}
              <span className="px-2 flex justify-center items-center rounded-md border text-gray-500">
                {page}
              </span>{" "}
              of {Math.ceil(totalPosts / POSTS_PER_PAGE)}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
