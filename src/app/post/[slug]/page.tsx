import * as React from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Head from "next/head";
import Comments from "@/components/Comments"; // Import Comments component
import { DateFormatter } from "@/components/DateFormatter";
import Socials from "@/components/Socials";
import { Likes } from "@/components/Likes";
import { FetchPosts } from "@/components/FetchPosts";
import { IoPerson } from "react-icons/io5";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { PostTimeEstimator } from "@/components/PostTimeEstimator";
import { GoDotFill } from "react-icons/go";
import { mainUrl } from "@/utils/links";
import { BodyFormatter } from "@/components/BodyFormatter";
import { TableOfContents } from "@/components/TableOfContents";
import Link from "next/link";

interface SanityBlock {
  _type: string;
  style?: string;
  children?: Array<{
    _type: string;
    text: string;
  }>;
}

// Function to extract headers from Sanity body
const extractHeaders = (body: SanityBlock[]) => {
  if (!body) return [];
  return body
    .filter((block) => block.style?.startsWith("h"))
    .map((block) => block.children?.[0]?.text || "");
};

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->,
  categories[]->,
  "comments": *[_type == "comment" && post._ref == ^._id]{
    _id,
    name,
    likes,
    views,
    synopsis,
    comment,
    _createdAt
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await the params to get the slug
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options
  );

  if (!post) {
    return (
      <main>
        <Header />{" "}
        <div className="min-h-[50vh]">
          <Loader />{" "}
        </div>
        <Footer />
      </main>
    );
  }

  const headers = extractHeaders(post.body);

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.synopsis} />
        <meta
          property="og:image"
          content={
            post.mainImage
              ? urlFor(post.mainImage).url()
              : `${mainUrl}/default-thumbnail.jpg`
          }
        />
        <meta
          property="og:url"
          content={`${mainUrl}/post/${post.slug.current}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.synopsis} />
        <meta
          name="twitter:image"
          content={
            post.mainImage
              ? urlFor(post.mainImage).url()
              : `${mainUrl}/default-thumbnail.jpg`
          }
        />
      </Head>

      <main>
        <Header />
        <div className="container mx-auto  max-w-[2024px]  py-4">
          {/* Number of views */}
          {/* <div className="mb-8 py-5 w-fit">
            <p className="text-md md:text-lg flex gap-2 items-center">
              <GrView /> <span className="font-[500]">{post.views || 0}</span>{" "}
            </p>
          </div> */}

          <div className="mb-8 w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-auto px-4">
          

            <div className=" flex items-center gap-4">
              <p className="w-fit text-sm font-[500] text-gray-900 bg-[#fff8ec] rounded-3xl md:px-4 py-1 my-6">
                {post.categories[0].title}
              </p>
              <PostTimeEstimator body={post.body} />
            </div>
            <div className="flex gap-6">
              <span className="hidden md:flex gap-2 mt-2">
                <Socials
                  title={post.slug.current}
                  postUrl={`${mainUrl}/post/${post.slug.current}`}
                />
              </span>

              <div>
                {/* POST TITLE */}
                <h1 className="font-bold lg:font-[500]  text-xl lg:text-4xl">
                  {post.title}
                </h1>

                <div className="flex gap-4 items-center">
                  <Link href={`/author/${post.author.slug.current}`}>
                    <div className="flex gap-2 items-center">
                      <IoPerson />
                      <p className="text-md text-gray-500 font-poppins hover:underline">
                        {post.author.name}
                      </p>
                    </div>
                  </Link>
                  <GoDotFill />
                  <p className=" text-gray-500 my-4">
                    <DateFormatter length="long" dateString={post.publishedAt} />
                  </p>
                </div>
                <span className="md:hidden flex gap-2 mt-2">
                  <Socials
                    title={post.slug.current}
                    postUrl={`${mainUrl}/post/${post.slug.current}`}
                  />
                </span>
              </div>
            </div>
            <div className="my-4 lg:mb-8">
              <p className="text-gray-400 text-md">{post.synopsis}</p>
            </div>
            {/* POST MAIN IMAGE */}
            <div>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  className="aspect-auto"
                  width={1550}
                  height={1310}
                />
              )}
            </div>
            <div>
                {/* Table of Contents */}
            <TableOfContents headers={headers} />
            </div>
            <hr />
            {/* POST BODY */}
            <BodyFormatter body={post.body} />
            <span className="flex gap-2 items-center w-fit mx-auto">
              {/* LIKES SECTION */}
              <Likes postId={post._id} postLikes={post.likes} />
            </span>
            <br />
            <hr />
            {/* COMMENTS SECTION */}
            <Comments id={post._id} comments={post.comments} /> <br />
            <br />
          </div>
          <FetchPosts
            query={`*[_type == "post"]|order(publishedAt desc)[0...4]{
            _id,
            title,
            slug,
            mainImage, 
            categories[]->,
            synopsis,
            publishedAt
          }`}
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
