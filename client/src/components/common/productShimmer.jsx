import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductTileSkeleton = () => {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>

                <div className="relative">
                    <Skeleton className="w-full h-[300px] rounded-t-lg bg-slate-200" />
                </div>

                <CardContent>

                    <Skeleton className="h-6 w-3/4 mt-3 mb-2" />


                    <div className="flex justify-between items-center mb-2 bg-slate-200">
                        <Skeleton className="h-5 w-16 bg-slate-200" />
                        <Skeleton className="h-5 w-14 bg-slate-200" />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                    <Skeleton className="h-10 w-20 rounded-md  bg-slate-200" />
                    <Skeleton className="h-10 w-20 rounded-md  bg-slate-200" />
                </CardFooter>
            </div>
        </Card>
    );
};

export default ProductTileSkeleton;
