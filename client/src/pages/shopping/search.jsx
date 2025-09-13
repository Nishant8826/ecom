import ProductDetailsDialog from "@/components/shopping/product-details";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addCart, fetchCart } from "@/store/cartSlice";
import { getSearchResults, resetSearchResults } from "@/store/searchProductSlice";
import { fetchProductDetail } from "@/store/shopProductSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { searchResults } = useSelector((state) => state.searchProduct);
    const { productDetails } = useSelector((state) => state.shoppingProduct);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { toast } = useToast();

    const [keyword, setKeyword] = useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            dispatch(resetSearchResults());
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        }
    }, [keyword]);

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
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

        dispatch(addCart({ userId: user?._id, productId: getCurrentProductId, quantity: 1, })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCart({ userId: user?._id }));
                toast({ title: "Product is added to cart" });
            }
        });
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetail(getCurrentProductId));
        setOpenDetailsDialog(true)
    }


    console.log('productDetails>>', productDetails)

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input value={keyword} name="keyword" onChange={(event) => setKeyword(event.target.value)} className="py-6" placeholder="Search Products..." />
                </div>
            </div>
            {!searchResults.length ? (
                <h1 className="text-5xl font-extrabold">No result found!</h1>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {searchResults.map((item) => (
                    <ShoppingProductTile
                        key={item._id}
                        handleAddtoCart={handleAddtoCart}
                        product={item}
                        handleGetProductDetails={handleGetProductDetails}
                    />
                ))}
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default SearchProducts;