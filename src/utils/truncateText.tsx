import { PortableTextBlock } from "@portabletext/types";
import { toPlainText } from "@portabletext/react";
import Link from "next/link";

/**
 * Truncates a Sanity Portable Text body to a specified word limit and appends a "Read More" link.
 * @param body - The Sanity Portable Text body (array of blocks).
 * @param wordLimit - The maximum number of words to include in the truncated text.
 * @param readMoreLink - The URL to the full post (e.g., `/post/[slug]`).
 * @returns The truncated text with a "Read More" link as a string.
 */
export const truncateText = (
  body: PortableTextBlock[],
  wordLimit: number,
  readMoreLink: string
) => {
  if (!body || !Array.isArray(body)) {
    // Return an empty string if the body is undefined, null, or not an array
    return "";
  }

  // Convert Portable Text to plain text
  const plainText = toPlainText(body);

  // Split the plain text into words
  const words = plainText.split(" ");

  // If the word count is within the limit, return the full text
  if (words.length <= wordLimit) {
    return plainText;
  }

  // Otherwise, truncate the text and append the "Read More" link
  const truncatedText = words.slice(0, wordLimit).join(" ");
  return <span>{truncatedText}... <Link href={`post/${readMoreLink}`} className="text-white italic hover:underline">[Read More]</Link></span>;
}