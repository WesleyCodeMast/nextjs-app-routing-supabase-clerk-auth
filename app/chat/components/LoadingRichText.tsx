interface props {}
const LoadingRichText: React.FC<props> = ({}) => {
  return (
    <>
      <div
        role="status"
        className="max-w-md animate-pulse space-y-4 divide-y divide-gray-200  "
      >
        <div className="flex flex-row items-center justify-items-center">
          <div
            className="ml-32 mr-32 rounded border border-gray-200 p-4 shadow md:p-6 dark:divide-gray-700  dark:border-gray-700 "
            style={{ width: "920px" }}
          >
            <div className="mb-2.5 h-3 w-5/6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-10 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};
export default LoadingRichText;
