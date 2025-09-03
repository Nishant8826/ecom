import { useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import { useState } from "react";
import Address from "@/components/shopping/address";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { baseUrl } from "@/config";
import { Loader2 } from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  let totalCartAmount = 0;

  cartItems.items.forEach(item => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    totalCartAmount = totalCartAmount + (price * item.quantity)
  })

  const handlePayment = async () => {
    try {
      setIsPaymemntStart(true);
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
      const response = await axios.post(`${baseUrl}/order/create-checkout-session`, cartItems, { withCredentials: true });
      await stripe.redirectToCheckout({ sessionId: response?.data?.id });
    } catch (error) {
      console.error("Payment error:", error);
      setIsPaymemntStart(false);
    }
  };

  return (
    <div className="flex flex-col">

      {isPaymentStart && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
          <p className="mt-4 text-white text-lg font-medium">
            Processing Payment...
          </p>
        </div>
      )}


      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
            : null}
          {/* <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div> */}
          <div className="mt-4 w-full">
            <Button onClick={handlePayment} className="w-full">
              {`Pay Now $${totalCartAmount}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;