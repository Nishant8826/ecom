import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addCart, fetchCart } from "@/store/cartSlice";
import { Badge } from "../ui/badge";
import { resetProductDetails } from "@/store/shopProductSlice";
import StarComponent from "../common/starcomponent";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/reviewSlice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const { reviews } = useSelector(state => state.productReview);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0);

    const handleRatingChange = (star) => {
        setRating(star)
    }

    const handleDialogClose = () => {
        dispatch(resetProductDetails());
        setOpen(false);
        setRating(0);
        setReviewMsg('');
    }

    const handleAddtoCart = (productId, getTotalStock) => {

        let getCartItems = cartItems.items || [];
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === productId);
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });
                    return;
                }
            }
        }

        dispatch(addCart({ userId: user?._id, productId, quantity: 1 })).then((response) => {
            if (response?.payload?.success) {
                dispatch(fetchCart({ userId: user?._id }))
                toast({
                    variant: 'success',
                    title: 'Product is Added to Cart successfully'
                })
            }
        }).catch((err) => {
            toast({
                variant: 'destructive',
                title: err.message ? err.message : 'Error Occured'
            })
        })
    }

    const handleAddReview = () => {
        dispatch(
            addReview({
                productId: productDetails?._id,
                userId: user?._id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((data) => {
            if (data.payload?.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast({ title: "Review added successfully!", });
            } else {
                toast({ title: "You need to purchase product to review it.", variant: 'destructive' });
            }
        });
    }


    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);


    const averageReview = reviews && reviews.length > 0 ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className="aspect-square w-full object-contain" />
                    {
                        productDetails?.totalStock == 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Out of Stock
                        </Badge> : productDetails?.totalStock < 10 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            {`only ${productDetails?.totalStock} items left`}
                        </Badge> :
                            productDetails?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale
                            </Badge>
                                : null
                    }
                </div>
                <div>
                    <div>
                        <DialogTitle className="text-3xl font-extrabold">{productDetails?.title}</DialogTitle>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarComponent rating={averageReview} />
                        </div>
                        <span className="text-muted-foreground">
                            ({averageReview.toFixed(2)})
                        </span>
                    </div>
                    <div className="mt-5 mb-5">
                        {productDetails?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
                        ) : (
                            <Button className="w-full" onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}>Add to Cart</Button>
                        )}
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                            {reviews && reviews.length > 0 ? (
                                reviews.map((reviewItem) => (
                                    <div className="flex gap-4">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback>
                                                {reviewItem?.userName[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold">{reviewItem?.userName}</h3>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                <StarComponent rating={reviewItem?.reviewValue} />
                                            </div>
                                            <p className="text-muted-foreground">
                                                {reviewItem.reviewMessage}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No Reviews</h1>
                            )}
                        </div>
                        <div className="mt-10 flex-col flex gap-2">
                            <Label>Write a review</Label>
                            <div className="flex gap-1">
                                <StarComponent rating={rating} handleRatingChange={handleRatingChange} />
                            </div>
                            <Input name="reviewMsg" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="Write a review..." />
                            <Button onClick={handleAddReview} disabled={reviewMsg.trim() == ''}>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;