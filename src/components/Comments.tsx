"use client";
import { Comment, CommentForm } from "@/utils/interface";
import * as React from "react";
import { useForm } from "react-hook-form";
import { client } from "@/sanity/client";
import { BiCommentDetail, BiLoaderAlt } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
// Comment Counter
async function fetchCommentCount(postId: string): Promise<number> {
  const query = `count(*[_type == "comment" && post._ref == $postId])`;
  const count = await client.fetch(query, { postId });
  return count;
}

// 'Time Ago' for comment
const TimeAgoFormatter = ({ dateString }: { dateString: string }) => {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };
  const commentDate = new Date(dateString);
  return <span>{getTimeAgo(commentDate)}</span>;
};

// Helper function to get or set a cookie
const getOrSetCookie = (
  cookieName: string,
  valueGenerator: () => string
): string => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    if (cookies[cookieName]) {
      return cookies[cookieName];
    }

    const newValue = valueGenerator();
    document.cookie = `${cookieName}=${newValue}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year expiration
    return newValue;
  }
  return valueGenerator();
};

export default function Comments({
  id,
  comments: initialComments,
}: {
  id: string;
  comments: Comment[];
}) {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const [error, setError] = React.useState<string | null>(null);
  const [commentCount, setCommentCount] = React.useState<number | null>(0);
  const [isSubmmitting, setIsSubmmitting] = React.useState<boolean | null>(
    false
  );

  // Fetch the comment count
  React.useEffect(() => {
    fetchCommentCount(id).then((count) => {
      setCommentCount(count);
    });
  }, [id]);

  // Generate a unique identifier for the user and store it in cookies
  const getUniqueIdentifier = () => {
    return getOrSetCookie("uniqueUserId", () => {
      // if (typeof window !== "undefined") {
      //   return `anonymous-${Math.random()}`;
      // }
      return `anonymous-${Math.floor(100 + Math.random() * 900)}`;
    });
  };

  const onSubmit = async ({ comment }: CommentForm) => {
    if (!comment.trim()) return;
    setIsSubmmitting(true);

    const uniqueId = getUniqueIdentifier();

    const commentData = {
      _type: "comment",
      name: `user_${uniqueId}`, // Replace with actual user name if available
      comment: comment,
      _createdAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: id,
      },
    };

    try {
      const newComment = await client.create(commentData);
      setComments([...comments, newComment]);
      setIsSubmmitting(false);
      reset();
      setError(null); // Clear any previous errors
      // Optionally, refresh comments list or update UI
    } catch (error) {
      console.error("Error submitting comment:", error);
      setIsSubmmitting(false);

      if ((error as Error).message.includes("Insufficient permissions")) {
        setError("You do not have permission to submit comments.");
      } else {
        setError(
          "There was an error submitting your comment. Please try again."
        );
      }
    }
  };

  return (
    <div className="comments-section mb-8 mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="bg-gray-50 p-4 rounded-2xl">
          <textarea
            {...register("comment", { required: true })}
            className="w-full h-full p-2 border-none bg-transparent outline-none"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 min-w-[150px] flex justify-center items-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              {isSubmmitting ? (
                <span className="">
                  {" "}
                  <BiLoaderAlt className="animate-spin mx-auto" />{" "}
                </span>
              ) : (
                <span className="flex gap-2 items-center">
                  Submit
                  <FiSend className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              )}
            </span>
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <br />
      <hr />
      <br />
      <div className="comments-list">
        <h2 className="text-lg mb-4 flex gap-2 items-center">
          <BiCommentDetail /> Comments
          <span className="px-2 h-fit flex justify-center items-center rounded-full bg-primary text-white">
            {commentCount}
          </span>
        </h2>
        {comments
          .sort(
            (a, b) =>
              new Date(b._createdAt).getTime() -
              new Date(a._createdAt).getTime()
          )
          .map((comment) => (
            <div key={comment._id} className="comment p-2 border-b">
              <div className="flex gap-2 items-center my-4">
                <p className="font-[600]">{comment.name}</p>

                <p className="text-slate-400 text-sm">
                  <TimeAgoFormatter dateString={comment._createdAt} />
                </p>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
