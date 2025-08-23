import { CheckCircle } from 'lucide-react';

const StripeSuccess = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center animate-fade-in">
                <CheckCircle size={72} className="text-green-500 mx-auto mb-4 animate-pop" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been successfully processed.</p>
                <a href="/shop/home" className="inline-block bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default StripeSuccess;
