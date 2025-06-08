import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-200">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-12 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-6 w-48 mb-4" />
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                {/* Author Info Skeleton */}
                <div className="flex items-center mb-8">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-4/6" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-full" />
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="md:col-span-1">
              <div className="space-y-8">
                {/* Author Card Skeleton */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                  <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto mb-4" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Related Posts Skeleton */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-5 w-2/3 mb-1" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories Skeleton */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-8 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
