import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-200 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center animate-fade-in">

        <div className="flex justify-center mb-4">
          <XCircle className="w-20 h-20 text-red-500 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled !
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your payment was cancelled or failed. Don’t worry — no money was deducted.
        </p>

        {/* Info Card */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
          <p>💳 Payment Status: <span className="font-semibold text-red-600">Cancelled</span></p>
          <p>🔁 You can try the payment again anytime.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/payment"
            className="btn btn-error flex-1 rounded-xl"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="btn btn-outline btn-error flex-1 rounded-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
