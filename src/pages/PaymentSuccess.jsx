import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 px-4">
      <main
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your payment has been processed successfully. You can now continue using the service.
        </p>

        {/* Details */}
        <section className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-gray-700 space-y-2 text-left">
          <p>
            💳 Payment Status:{" "}
            <span className="font-semibold text-green-600">
              Completed
            </span>
          </p>

          <p>
            📦 Order Status:{" "}
            <span className="font-semibold">
              Processing
            </span>
          </p>

          <p className="break-all">
            🧾 Session ID:{" "}
            <span className="font-semibold text-gray-800">
              {sessionId || "Not Available"}
            </span>
          </p>
        </section>

        {/* Actions */}
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
      </main>
    </div>
  );
};

export default PaymentSuccess;