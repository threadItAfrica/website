const PostSkeleton = () => {
  return (
    <div className="flex-shrink-0 h-full w-[70%] sm:w-[45%] md:w-[calc(100%/3)] lg:w-[calc(100%/4)] xl:w-[calc(100%/5)] snap-center rounded-lg overflow-hidden shadow-md">
      {/* Skeleton Image */}
      <div className="w-full h-[150px] sm:h-[180px] md:h-[200px] bg-gray-200 animate-pulse"></div>
      
      {/* Skeleton Content */}
      <div className="p-3 md:p-4">
        {/* Category skeleton */}
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
        
        {/* Title skeleton */}
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
        
        {/* Date skeleton */}
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2 md:mt-4"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
