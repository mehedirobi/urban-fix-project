import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center animate-fade-in">

        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 
        </h1>

        <p className="text-gray-600 mb-6">
          Thanks for your payment! Your transaction has been completed successfully.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-gray-700 space-y-1">
          <p>
            💳 Payment Status: <span className="font-semibold text-green-600">Completed</span>
          </p>
          <p>
             Order Status: <span className="font-semibold">Processing</span>
          </p>
          <p className="break-all">
            🧾 Session ID: <span className="font-semibold text-gray-800">{sessionId || "Not Found"}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/dashboard"
            className="btn btn-success flex-1 rounded-xl"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-outline btn-success flex-1 rounded-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
