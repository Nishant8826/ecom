import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StripeCancel = () => {
  return (
    <div className="min-h-[90vh] flex justify-center bg-gradient-to-br from-red-100 to-white px-4">
      <div className="bg-white mt-24 h-3/6 px-10 py-8 rounded-2xl shadow-xl max-w-md text-center animate-fade-in">
        <XCircle size={72} className="text-red-500 mx-auto mb-4 animate-pop" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">It looks like you cancelled the payment. If this was a mistake, you can try again.</p>
        <Link to="/shop/checkout" className="inline-block bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default StripeCancel;
