import React, { useEffect, useState, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import InvoicePDF from "../components/InvoicePDF";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE =
  import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app";

const PaymentsChart = ({ data }) => {
  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.month),
      datasets: [
        {
          label: "Payment Amount",
          data: data.map((d) => d.amount),
          backgroundColor: "rgba(59, 130, 246, 0.7)",
        },
      ],
    }),
    [data]
  );

  return <Bar data={chartData} />;
};

const UserPayments = () => {
  const { user } = UseAuth();

  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("session_id");
  }, []);

  /**
   * Fetch payments
   */
  const fetchPayments = async (email, signal) => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/payments/${email}`, {
        signal,
      });

      setPayments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.name === "CanceledError") return;

      console.error(err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify Stripe session + fetch payments
   */
  useEffect(() => {
    if (!user?.email) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        if (sessionId) {
          await axios.post(`${API_BASE}/payments/verify`, {
            sessionId,
            email: user.email,
          });
        }

        await fetchPayments(user.email, controller.signal);
      } catch (err) {
        console.error("Payment verification error:", err);
      }
    };

    run();

    return () => controller.abort();
  }, [sessionId, user?.email]);

  /**
   * Fallback fetch when user changes
   */
  useEffect(() => {
    if (!user?.email) return;

    const controller = new AbortController();
    fetchPayments(user.email, controller.signal);

    return () => controller.abort();
  }, [user?.email]);

  /**
   * Filtered payments
   */
  const filteredPayments = useMemo(() => {
    return payments
      .filter((p) =>
        filterStatus === "All" ? true : p.status === filterStatus
      )
      .filter((p) =>
        filterMethod === "All" ? true : p.method === filterMethod
      );
  }, [payments, filterStatus, filterMethod]);

  /**
   * Chart aggregation
   */
  const chartData = useMemo(() => {
    const grouped = {};

    filteredPayments.forEach((p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      grouped[month] = (grouped[month] || 0) + (p.amount || 0);
    });

    return Object.entries(grouped).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [filteredPayments]);

  /**
   * Stripe checkout
   */
  const handlePayment = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.post(
        `${API_BASE}/create-checkout-session`,
        {
          cost: 100,
          userEmail: user.email,
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        console.error("Checkout URL missing");
      }
    } catch (err) {
      console.error("Stripe error:", err);
    }
  };

  if (!user?.email) {
    return (
      <p className="text-center py-10">Login first</p>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl text-center font-bold mb-8 text-primary">
        My Payments
      </h2>

      {/* Controls */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button
          onClick={handlePayment}
          className="btn btn-primary"
        >
          Pay Now
        </button>

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
          className="select"
        >
          <option>All</option>
          <option>Paid</option>
        </select>

        <select
          value={filterMethod}
          onChange={(e) =>
            setFilterMethod(e.target.value)
          }
          className="select"
        >
          <option>All</option>
          <option>Card</option>
        </select>
      </div>

      {/* Chart */}
      {filteredPayments.length > 0 && (
        <PaymentsChart data={chartData} />
      )}

      {/* Empty state */}
      {filteredPayments.length === 0 ? (
        <p className="text-center mt-6">
          No payments found
        </p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Transaction</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>
                    {new Date(
                      p.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td>${p.amount}</td>
                  <td>{p.transactionId}</td>
                  <td>
                    <span className="badge badge-success">
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <PDFDownloadLink
                      document={
                        <InvoicePDF payment={p} />
                      }
                      fileName={`Invoice-${p._id}.pdf`}
                    >
                      Download
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPayments;