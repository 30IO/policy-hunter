const Skeleton = ({ className }) => {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse ${className}`}
    />
  )
}

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-3 w-5/6 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  )
}

export const SkeletonHero = () => {
  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 w-full max-w-2xl">
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <Skeleton className="h-8 w-8 rounded-lg mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton
