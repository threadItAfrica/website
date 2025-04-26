import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, action } = await req.json();

    // Update the post document in Sanity
    const result = await client
      .patch(postId)
      .inc({ likes: action === "like" ? 1 : -1 })
      .commit();

    return NextResponse.json({ success: true, likes: result.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update likes" },
      { status: 500 }
    );
  }
}