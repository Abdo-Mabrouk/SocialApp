import React from 'react'

export default function PostCardSkeleton() {
  return (
 <div className="container pt-15 space-y-7 animate-pulse">
      <div className="post p-4 border-2 border-gray-200 shadow-lg rounded-2xl w-full lg:w-[800px] mx-auto space-y-5">
        {/* الهيدر: صورة المستخدم والاسم */}
        <div className="post-data-user flex items-center justify-between border-b-2 pb-2 border-gray-200">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gray-300 h-12 w-12" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>
          <div className="h-6 w-6 bg-gray-300 rounded-lg" />
        </div>

        {/* المحتوى */}
        <div className="post-content space-y-4">
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-5/6" />
          <div className="h-3 bg-gray-300 rounded w-2/3" />
          <div className="w-full h-48 bg-gray-300 rounded-2xl" />
        </div>

        {/* الأيقونات */}
        <div className="post-icon border-t-2 pt-2 border-gray-200 flex items-center justify-around">
          <div className="h-6 w-12 bg-gray-300 rounded" />
          <div className="h-6 w-12 bg-gray-300 rounded" />
          <div className="h-6 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>  )
}
