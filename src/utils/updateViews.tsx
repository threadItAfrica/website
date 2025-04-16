import {client} from '@/sanity/client'

// Function to increment views
 export const incrementViews = async (postId: string) => {
    try {
      await client
        .patch(postId)
        .setIfMissing({ views: 0 }) // Ensure the "views" field exists
        .inc({ views: 1 }) // Increment the "views" field by 1
        .commit();
    } catch (error) {
      console.error("Error incrementing views:", error);
    } // Increment views when the component is mounted
  
  };

 