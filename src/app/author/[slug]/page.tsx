import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image"; 
import { SanityDocument } from "next-sanity";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BodyFormatter } from "@/components/BodyFormatter"; 
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { PostCard } from "@/components/PostCard";

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{
  name, 
  bio,
  image,
  x,
  facebook,
  linkedin,
  "posts": *[_type == "post" && author._ref == ^._id][0...4]{
    _id,
    synopsis,
    title,
    slug,
    mainImage,
    publishedAt
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await the params to get the slug
  const author = await client.fetch<SanityDocument>(
    AUTHOR_QUERY,
    { slug },
    options
  );
  // document.title = author.name

  return (
    <main>
      <Header />
      <section className="container mx-auto  max-w-[2024px] my-16 px-4">
        {/* Author Details */}
        <div className="flex flex-col items-center lg:items-start gap-8">
          <div className="container mx-auto flex items-center justify-center mt-8">
            {/* left line */}
            <div className="flex-grow h-[1px] bg-gray-300"></div>

            {/* Author Image */}
            {author.image && (
              <div
                className="h-[100px] md:w-[150px] w-[100px] md:h-[150px] bg-cover bg-center bg-no-repeat rounded-full mx-4"
                style={{
                  backgroundImage: `url(${urlFor(author.image).url()})`,
                }}
              ></div>
            )}

            {/* right line */}
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>

          {/* Author Info */}
          <div>
            <h1 className="text-2xl font-[600] text-center">{author.name}</h1>
            <p className="text-gray-400 text-center mt-4">Threadit Author</p>

            {/* Socials  */}
            <div className="flex gap-4 justify-center mt-4">
              {author.linedin && (
                <Link
                  href={author.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 hover:text-primary"
                >
                  <FaLinkedinIn className="text-blue-950" />
                </Link>
              )}
              {author.facebook && (
                <Link
                  href={author.facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 hover:text-primary"
                >
                  <FaFacebook className="text-blue-950" />
                </Link>
              )}
                 {author.x && (
                <Link
                  href={author.x || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 hover:text-primary"
                >
                  <FaXTwitter className="text-blue-950" />
                </Link>
              )}
            </div>
          <div className="w-full  md:w-[80%] lg:w-[60%] mx-auto">
          {Array.isArray(author.bio) && (
              <BodyFormatter body={author.bio}/>
            )}
          </div>
          </div>
        </div>

        {/* Author's Posts */}
        <div className="mt-12">
          <h2 className="text-lg font-[600] mb-6 text-center">Most recent posts by {author.name}</h2>
        
          <hr/>
          <br/>
          <div className="flex justify-center items-center flex-wrap gap-8">
            {author.posts.map((post: SanityDocument) => (
              <Link
                key={post._id}
                href={`/post/${post.slug.current}`}
                className="block bg-white shadow-lg rounded-lg overflow-hidden"
              >
               <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
