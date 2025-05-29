export const RelatedPostSkeleton = () => {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="h-full rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200 animate-pulse" />
          
          {/* Content skeleton */}
          <div className="p-4">
            {/* Category skeleton */}
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-2" />
            
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
            
            {/* Date skeleton */}
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mt-4" />
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="block md:hidden">
        <div className="flex gap-3 items-start p-3 rounded-lg">
          {/* Image skeleton */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-200 rounded-lg animate-pulse" />
          
          {/* Content skeleton */}
          <div className="flex-1 min-w-0">
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            
            {/* Synopsis skeleton */}
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse mb-1" />
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse mb-2" />
            
            {/* Date skeleton */}
            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse mt-2" />
          </div>
        </div>
      </div>
    </>
  );
};
