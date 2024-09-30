export const PostSkeleton = () => {

  return (
    Array.from({ length: 4 }).map((_, idx) => (
      <article className="flex w-full lg:w-1/3 bg-gray-800 p-3 rounded-xl shadow-lg shadow-gray-700/50 animate-pulse" key={idx}>
        <div className="w-3/4">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="flex items-center mb-2">
            <div className="h-4 bg-gray-700 rounded w-1/3 mr-2"></div>
            <div className="h-4 bg-gray-700 rounded w-8"></div>
          </div>
          <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="w-1/4">
          <div className="h-12 bg-gray-700 rounded mb-2"></div>
        </div>
      </article>
    ))
  );
};

export default PostSkeleton;
