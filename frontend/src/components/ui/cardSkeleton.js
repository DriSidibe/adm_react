export default function CardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <div className="w-full sm:w-1/4 h-48 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse dark:bg-gray-700"></div>
        <div className="pt-6 flex space-x-3">
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse dark:bg-gray-700"></div>
          <div className="h-10 bg-gray-200 rounded-full w-10 animate-pulse dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
