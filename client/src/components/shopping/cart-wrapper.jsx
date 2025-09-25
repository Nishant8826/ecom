import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { motion } from "motion/react"


const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {

    const navigate = useNavigate();

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
                {cartItems && cartItems.length > 0 ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />) : null}
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <motion.button whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }} className="w-full mt-6 bg-primary text-white py-2 rounded-md" onClick={() => {
                navigate('/shop/checkout')
                setOpenCartSheet(false);
            }}>
                Checkout
            </motion.button>
        </SheetContent>
    );
}

export default UserCartWrapper;