"use client";

import { PortableTextBlock } from "@portabletext/types";
import { toPlainText } from "@portabletext/react";

type PostTimeEstimatorProps = {
  body: PortableTextBlock[]; // Sanity Portable Text body
  wordsPerMinute?: number; // Optional: Words per minute (default is 200)
};

export const PostTimeEstimator = ({
  body,
  wordsPerMinute = 200,
}: PostTimeEstimatorProps) => {
  // Convert Portable Text to plain text and calculate word count
  const plainText = toPlainText(body);
  const wordCount = plainText.split(" ").length;

  // Calculate the estimated reading time
  const estimatedTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="text-gray-500 text-sm">
      <p className="text-gray-500">{estimatedTime} mins read</p>
    </div>
  );
};
