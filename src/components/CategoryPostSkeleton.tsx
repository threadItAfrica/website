const CategoryPostSkeleton = () => {
  return (
    <div className="flex gap-3 md:gap-4 items-start p-3 md:p-4 rounded-lg">
      {/* Skeleton Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
      </div>
      
      {/* Skeleton Content */}
      <div className="flex-1 min-w-0">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        
        {/* Synopsis skeleton */}
        <div className="mt-2 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
        
        {/* Date and reading time skeleton */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPostSkeleton;
