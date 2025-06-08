import { Skeleton } from "@/components/ui/skeleton"

export default function CarDetailLoading() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery Skeleton */}
        <div className="grid gap-4">
          <Skeleton className="aspect-[16/10] w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
            <Skeleton className="aspect-square w-full rounded-md" />
          </div>
        </div>

        {/* Car Details & Booking Skeleton */}
        <div className="grid gap-6 py-4">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title */}
            <Skeleton className="h-6 w-1/4 mb-4" /> {/* Price */}
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-6 w-1/3 mb-3" /> {/* "Description" or "Features" heading */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </div>
          <Skeleton className="h-12 w-full md:w-2/3 mt-4" /> {/* Booking Button/Form placeholder */}
        </div>
      </div>
    </main>
  )
}
