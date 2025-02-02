/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/TableSkeleton.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 7:07:32 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      {/* Table Header Skeleton */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-3">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-1/4 mx-2" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex p-3">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-5 w-1/4 mx-2" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
