"use client";
import { Comment } from "@/utils/interface";
import * as React from "react";
import { useForm } from "react-hook-form";
import { client } from "@/sanity/client"; // Import sanity client
import { Any } from "next-sanity";

export default function Comments({ id, comments }: {id: string, comments: Comment[] }) {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: Any) => {
    if (!data.comment.trim()) return;

    const commentData = {
      _type: "comment",
      name: `Anonymous${Math.round(Math.random() * 1000)}`, // Replace with actual user name if available
      comment: data.comment,
      _createdAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: id, 
      },
    };

    try {
      // Check for user permissions before creating the comment
      // const hasPermission = await client.fetch(`*[_type == "permission" && userId == $userId && permission == "create"]`, { userId: "currentUserId" });
      // if (!hasPermission.length) {
      //   throw new Error("Insufficient permissions; permission 'create' required");
      // }

      await client.create(commentData);
      reset();
      setError(null); // Clear any previous errors
      // Optionally, refresh comments list or update UI
    } catch (error) {
      console.error("Error submitting comment:", error);
      if ((error as Error).message.includes("Insufficient permissions")) {
        setError("You do not have permission to submit comments.");
      } else {
        setError("There was an error submitting your comment. Please try again.");
      }
    }
  };

  return (
    <div className="comments-section my-8">
      <h2 className="text-2xl mb-4">Comments</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          {...register("comment", {required: true})}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment p-2 border-b">
            <p className="font-bold">{comment.name}</p>
            <p>{comment.comment}</p>
            <p className="text-slate-400 text-sm">
              {new Date(comment._createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
