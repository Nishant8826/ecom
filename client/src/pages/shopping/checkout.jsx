import { useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import { useState } from "react";
import Address from "@/components/shopping/address";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  let totalCartAmount = 0;

  cartItems.items.forEach(item => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    totalCartAmount = totalCartAmount + (price * item.quantity)
  })

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;