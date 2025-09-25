import { Skeleton } from "@/components/ui/skeleton";


export const AuthSkeleton = () => {
    return (
        <div className="space-y-6 mt-4">
         
            {/* Heading Skeleton */}
            <div className="text-center space-y-2">
                <Skeleton className="h-6 w-40 mx-auto rounded-md border-2" />
                <Skeleton className="h-4 w-64 mx-auto rounded-md border-2" />
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4 mt-6">
                <Skeleton className="h-10 w-full rounded-md border-2" />
                <Skeleton className="h-10 w-full rounded-md border-2" />
                <Skeleton className="h-10 w-full rounded-md border-2" />
            </div>

            {/* Forgot Password Button Skeleton */}
            <div className="flex justify-end">
                <Skeleton className="h-4 w-28 rounded-md border-2" />
            </div>

            {/* Divider Skeleton */}
            <Skeleton className="h-[1px] w-full" />

            {/* Signup Link Skeleton */}
            <div className="flex justify-center space-x-2">
                <Skeleton className="h-4 w-36 rounded-md border-2" />
                <Skeleton className="h-4 w-24 rounded-md border-2" />
            </div>
        </div>
    );
}
