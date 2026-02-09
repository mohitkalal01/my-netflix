export const Spinner = () => (
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-red"></div>
);
  
export const SkeletonCard = () => (
    <div className="relative aspect-[2/3] bg-brand-dark rounded-md animate-pulse" />
);

export const SkeletonRow = () => (
    <div className="my-8">
        <div className="h-8 w-48 bg-brand-dark rounded-md mb-4 animate-pulse px-4 sm:px-6 lg:px-8" />
        <div className="flex items-center space-x-2.5 overflow-x-hidden px-4 sm:px-6 lg:px-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="min-w-[180px] h-[270px]">
                    <SkeletonCard />
                </div>
            ))}
        </div>
    </div>
);

export const SkeletonHero = () => (
    <div className="relative h-[56.25vw] min-h-[400px] max-h-[800px] bg-brand-dark flex items-center justify-center">
        <div className="w-full h-full bg-gray-800 animate-pulse" />
    </div>
);
