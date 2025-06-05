import { client } from "./sanity/client";
import { MetadataRoute } from "next";
import { Post } from "./utils/interface";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {

  async function getPosts() {
    const query = `
    *[_type == "post"] {
      title,
      slug,
      synopsis,
      publishedAt,
      excerpt,
      categories[]-> {
        _id,
        slug,
        name
      }
    }
    `;
    const data = await client.fetch(query);
    return data;
  }

  const posts: Post[] = await getPosts();
  const postUrls = posts.map((post) => ({
    url: `https://threaditafrica.com/post/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    synopsis: post.synopsis,
    title: post.title,
  }))
  return [
    {
      url: `https://threaditafrica.com`,
      lastModified: new Date(),
    },
    ...postUrls, 
  ]
}