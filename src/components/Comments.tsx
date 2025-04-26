"use client";
import { Comment } from "@/utils/interface";
import * as React from "react";
import { useForm } from "react-hook-form";
import { client } from "@/sanity/client"; // Import sanity client
import { Any } from "next-sanity";

export default function Comments({ id, comments }: {id: string, comments: Comment[] }) {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localComments, setLocalComments] = React.useState(comments);

  const onSubmit = async (data: Any) => {
    if (!data.comment.trim()) return;
    setIsSubmitting(true);

    const commentData = {
      _type: "comment",
      name: `Anonymous${Math.round(Math.random() * 1000)}`,
      comment: data.comment,
      _createdAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: id, 
      },
    };

    try {
      await client.create(commentData);
      // Add the new comment to local state
      setLocalComments(prev => [{ ...commentData, _id: Date.now().toString() }, ...prev]);
      reset();
      setError(null);
      setSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      if ((error as Error).message.includes("Insufficient permissions")) {
        setError("You do not have permission to submit comments.");
      } else {
        setError("There was an error submitting your comment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comments-section my-8">
      <h2 className="text-2xl mb-4">Comments</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          {...register("comment", {required: true})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
          placeholder="Add a comment..."
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2 animate-fade-in">
            Comment submitted successfully!
          </p>
        )}
      </form>
      <div className="comments-list space-y-4">
        {localComments.map((comment) => (
          <div 
            key={comment._id} 
            className="comment p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-fade-in"
          >
            <p className="font-bold text-primary">{comment.name}</p>
            <p className="mt-2">{comment.comment}</p>
            <p className="text-slate-400 text-sm mt-2">
              {new Date(comment._createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
