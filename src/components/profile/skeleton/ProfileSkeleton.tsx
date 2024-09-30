export const ProfileSkeleton = () => {
    return (
      <div className="w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg text-white animate-pulse">
        <div className="text-center">
          <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto mb-2"></div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full bg-gray-700"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;
  