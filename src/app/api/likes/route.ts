import { NextResponse } from "next/server";
import { client } from "@/sanity/client";

type LikeAction = "like" | "unlike";

interface LikeRequest {
  postId: string;
  action: LikeAction;
}

export async function POST(req: Request) {
  try {
    const { postId, action }: LikeRequest = await req.json();

    // First, get the current likes count
    const post = await client.fetch(
      `*[_type == "post" && _id == $postId][0]{ likes }`,
      { postId }
    );

    // If likes field doesn't exist, initialize it
    const currentLikes = typeof post?.likes === "number" ? post.likes : 0;

    // Calculate new likes count
    const newLikes =
      action === "like"
        ? currentLikes + 1
        : Math.max(0, currentLikes - 1);

    // Update the post with new likes count using set instead of increment
    await client.patch(postId).set({ likes: newLikes }).commit();

    return NextResponse.json({ likes: newLikes });
  } catch (error: Error | unknown) {
    console.error("Error processing likes:", error);

    // Check if error is related to missing likes field
    if (
      error instanceof Error &&
      error.message?.includes("because it is not present")
    ) {
      try {
        const { postId, action }: LikeRequest = await req.json();
        // Initialize likes field with 1 for like action, 0 for unlike
        const initialLikes = action === "like" ? 1 : 0;

        await client.patch(postId).set({ likes: initialLikes }).commit();

        return NextResponse.json({ likes: initialLikes });
      } catch (initError) {
        console.error("Error initializing likes:", initError);
      }
    }

    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}