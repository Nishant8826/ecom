import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const dispatch = useDispatch();
    const { toast } = useToast();


    const handleItemUpdate = (getCartItem, typeOfAction) => {

        dispatch(updateCart({
            userId: user?._id, productId: getCartItem?.productId, quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart item is updated successfully",
                });
            }
        });
    }

    const handleDelete = (cartItem) => {
        dispatch(deleteCart({ userId: user?._id, productId: cartItem?.productId })).then((response) => {
            if (response?.payload?.success) {
                toast({
                    variant: 'success',
                    title: response?.payload?.message || 'Product removed successfully',
                })
            }
        })

    }


    return (
        <div className="flex items-center space-x-4">
            <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                    <Button onClick={() => handleItemUpdate(cartItem, 'minus')} variant="outline" className="h-8 w-8 rounded-full" size="icon" disabled={cartItem?.quantity === 1} >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button onClick={() => handleItemUpdate(cartItem, 'plus')} variant="outline" className="h-8 w-8 rounded-full" size="icon" >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
}

export default UserCartItemsContent;