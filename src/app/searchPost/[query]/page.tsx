import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/postCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { LuArrowLeftToLine } from "react-icons/lu";

const POSTS_PER_PAGE = 12;
const SEARCH_QUERY = `*[_type == "post" && (
  title match $searchQuery + "*" || 
  synopsis match $searchQuery + "*" ||
  content[]._type == "block" && content[].children[].text match $searchQuery + "*"
)]|order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  mainImage,
  synopsis,
  publishedAt,
  "authorName": author->name,
  "categoryTitles": categories[]->title
}`;

const TOTAL_SEARCH_QUERY = `count(*[_type == "post" && (
  title match $searchQuery + "*" || 
  synopsis match $searchQuery + "*" ||
  content[]._type == "block" && content[].children[].text match $searchQuery + "*"
)])`;

const options = { next: { revalidate: 30 } };

// Define the PageProps type
type PageProps = {
  params: Promise<{
    query: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const TitleSection = ({ query }: { query: string }) => (
  <div className="bg-gray-100 py-8">
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600">Showing results for: &quot;{query}&quot;</p>
    </div>
  </div>
);

export default async function SearchResults({ params, searchParams }: PageProps) {
  const searchQuery = decodeURIComponent((await params).query);
  const page = parseInt((await searchParams)?.page || "1", 10);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch search results
  const posts = await client.fetch<SanityDocument[]>(
    SEARCH_QUERY,
    { searchQuery, start, end },
    options
  );

  const totalPosts = await client.fetch<number>(
    TOTAL_SEARCH_QUERY,
    { searchQuery }
  );

  if (!posts.length) {
    return (
      <main>
        <Header />
        <TitleSection query={searchQuery} />
        <section className="container mt-[2vh] mx-auto lg:min-h-[90vh] flex flex-col justify-center items-center">
          <p className="text-xl text-gray-600">No results found for &quot;{searchQuery}&quot;</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <TitleSection query={searchQuery} />
      
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
                href={`/searchPost/${searchQuery}?page=1`}
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
                href={`/searchPost/${searchQuery}?page=${page - 1}`}
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
                    href={`/searchPost/${searchQuery}?page=${index + 1}`}
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
                href={`/searchPost/${searchQuery}?page=${page + 1}`}
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
