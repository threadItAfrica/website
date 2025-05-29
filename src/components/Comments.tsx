"use client";
import { Comment } from "@/utils/interface";
import * as React from "react";
import { useForm } from "react-hook-form";
import { client } from "@/sanity/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema
const commentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(1, "Comment is required")
});

type CommentFormData = z.infer<typeof commentSchema>;

export default function Comments({ id, comments }: { id: string; comments: Comment[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema)
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localComments, setLocalComments] = React.useState(comments);
  const [statusMessage, setStatusMessage] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const onSubmit = async (data: CommentFormData) => {
    if (!data.comment.trim()) return;
    setIsSubmitting(true);

    const commentData = {
      _type: "comment",
      name: data.name.trim() || `Anonymous${Math.round(Math.random() * 1000)}`,
      comment: data.comment.trim(),
      _createdAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: id,
      },
    };

    try {
      const newComment = await client.create(commentData);
      setLocalComments(prev => [{ ...commentData, _id: newComment._id }, ...prev]);
      reset();
      setStatusMessage({
        type: 'success',
        message: 'Comment posted successfully!'
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setStatusMessage({
        type: 'error',
        message: error instanceof Error && error.message.includes("Insufficient permissions")
          ? "You do not have permission to submit comments."
          : "There was an error submitting your comment. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body">
      <h3 className="text-xl md:text-2xl font-heading font-semibold mb-6">Comments</h3>
      
      {/* Status Message */}
      {statusMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            statusMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {statusMessage.message}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Your name (optional)"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Share your thoughts..."
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {localComments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-medium text-gray-900">{comment.name}</h4>
              <span className="text-sm text-gray-500">
                {new Date(comment._createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
          </div>
        ))}

        {localComments.length === 0 && (
          <p className="text-gray-500 text-center italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
