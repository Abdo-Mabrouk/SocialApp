
export default function PortfolioDataSkeleton() {
return (
    <div className="container p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full space-y-4 animate-pulse">
      <div className="imagg relative">
        {/* Cover */}
        <div className="bg-gray-200 h-48 rounded-xl"></div>

        {/* Profile image */}
        <div className="absolute top-28 start-4">
          <div className="size-40 w-fit rounded-bl-4xl rounded-tr-4xl bg-gray-300 shadow-2xl"></div>
        </div>

        {/* Name */}
        <div className="ps-45 mt-5 mb-5">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 pt-5">
          <div className="h-4 w-60 bg-gray-200 rounded"></div>
        </div>

        {/* Date of birth */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
