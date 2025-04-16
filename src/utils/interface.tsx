import { Any } from "next-sanity";
import { StaticImageData } from "next/image";

export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: Any;
  synopsis: string;
  body: Any;
  tags: Array<Tag>;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
  comments?: Array<Comment>;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

export interface Comment {
  name: string;
  comment: string;
  _createdAt: string;
  _id: string;
}
export interface HeadingsProps {
  icon: Any;
  mainText: string;
  color: string;
}
export interface CategoryTagProps {
  category: string;
  href: string;
}

export interface SocialsProps {
  postLink: string;
  size: number;
}

export interface AuthorCardProps {
  author: {
    image: string | StaticImageData;
    name: string;
    slug: {
      current: string;
    }
  };
}

export interface LikesProps {
  postId: string; // The Sanity document ID
  postLikes: number; // The initial number of likes
};

export interface SearchParams { [key: string]: string | string[] | undefined }
 
export interface Category {
  _id: string;
  title: string;
  description: string; 
  slug: {
    current: string;
  };
}

export interface PostCardProps {
  post: {  
    publishedAt: string;
    mainImage: string | StaticImageData;
    title: string;
    categories: Array<Category>;
    slug: string;
  };
}


export interface Comment {
  _id: string;
  name: string;
  comment: string;
  _createdAt: string;
}

export interface CommentForm { 
  comment: string; 
}

export interface DateFormatterProps {
  dateString: string;
  length?: 'short' | 'long' | 'numeric' | '2-digit' | 'narrow';
};