import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>

      {/* Generate Report Button */}
      <div className="flex w-full justify-end mb-4">
        <div className="h-10 bg-gray-300 rounded-xl w-48"></div>
      </div>

      {/* Main Content Grid */}
      <div className="flex w-full gap-3">
        {/* Left Section - Stats and Chart */}
        <div className="grid w-7/10 grid-cols-3 grid-rows-4 gap-3 h-full">
          {/* Stats Cards - 3 cards in first row */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`stat-${index}`}
              className="bg-gray-200 rounded-xl p-4 space-y-3"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}

          {/* Chart Section - spans 3 columns, 3 rows */}
          <div className="col-span-3 row-span-3 bg-gray-200 rounded-xl p-5">
            <div className="h-3 bg-gray-300 rounded w-32 mb-4"></div>
            {/* Chart skeleton */}
            <div className="space-y-3">
              <div className="flex items-end justify-between h-32">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 rounded-t w-4"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between">
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <div
                    key={index}
                    className="h-3 bg-gray-300 rounded w-6"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Fees and Absentees */}
        <div className="grid w-3/10 grid-cols-1 grid-rows-5 gap-3 h-full">
          {/* Fees Section */}
          <div className="row-span-2 bg-gray-200 rounded-xl p-4">
            <div className="h-4 bg-gray-300 rounded w-20 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`fee-${index}`}
                  className="flex justify-between items-center"
                >
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Absentees Section */}
          <div className="row-span-3 bg-gray-200 rounded-xl p-4">
            <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`absent-${index}`}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
