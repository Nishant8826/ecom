import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {

    let totalCartAmount = 0;

    cartItems.forEach(item => {
        const price = item.salePrice > 0 ? item.salePrice : item.price;
        totalCartAmount = totalCartAmount + (price * item.quantity)
    })

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {cartItems && cartItems.length > 0 ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />) : null}
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={() => setOpenCartSheet(false)} className="w-full mt-6" >
                Checkout
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;