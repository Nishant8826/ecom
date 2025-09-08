import { capturePayment } from '@/services/api';
import { fetchCart } from '@/store/cartSlice';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const StripeSuccess = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const [loading, setLoading] = useState(true);

    const updateOrder = async () => {
        try {
            const res = await capturePayment(orderId);
            dispatch(fetchCart({ userId: user?._id }))
            console.log("Order updated:", res);
        } catch (err) {
            console.error("Failed to mark paid:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            updateOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-[95vh] flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-pulse">
                    <div className="h-16 w-16 bg-green-200 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3 mx-auto"></div>
                    <div className="h-10 bg-green-200 rounded-full w-1/2 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[95vh] flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center animate-fade-in">
                <CheckCircle size={72} className="text-green-500 mx-auto mb-4 animate-pop" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                <a
                    href="/shop/home"
                    className="inline-block bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default StripeSuccess;
