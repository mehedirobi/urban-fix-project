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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentsChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Payment Amount ($)",
        data: data.map((d) => d.amount),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };
  return <Bar data={chartData} />;
};

const UserPayments = () => {
  const { user } = UseAuth();
  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://urban-fix-server.vercel.app";
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  const fetchPayments = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/payments/${user.email}`);
      setPayments(res.data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyAndFetch = async () => {
      if (!sessionId || !user?.email) return;
      try {
        await axios.post(`${API_BASE}/payments/verify`, {
          sessionId,
          email: user.email,
        });
      } catch (err) {
        console.error("Error verifying payment:", err);
      } finally {
        fetchPayments();
      }
    };
    verifyAndFetch();
  }, [sessionId, user]);

  useEffect(() => {
    fetchPayments();
  }, [user]);

  const filteredPayments = useMemo(() => {
    return payments
      .filter((p) => (filterStatus === "All" ? true : p.status === filterStatus))
      .filter((p) => (filterMethod === "All" ? true : p.method === filterMethod));
  }, [payments, filterStatus, filterMethod]);

  const chartData = useMemo(() => {
    const grouped = {};
    filteredPayments.forEach((p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      grouped[month] = (grouped[month] || 0) + p.amount;
    });
    return Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
  }, [filteredPayments]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${API_BASE}/create-checkout-session`, {
        cost: 100,
        userEmail: user.email,
      });
      if (res.data?.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Stripe session URL not found");
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
    }
  };

  if (!user?.email) return <p className="text-center py-10">Login first</p>;
  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl text-center font-bold mb-8 text-primary">My Payments</h2>

      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button onClick={handlePayment} className="btn btn-primary">
          Pay Now
        </button>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="select">
          <option>All</option>
          <option>Paid</option>
        </select>

        <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="select">
          <option>All</option>
          <option>Card</option>
        </select>
      </div>

      {filteredPayments.length > 0 && <PaymentsChart data={chartData} />}

      {filteredPayments.length === 0 ? (
        <p className="text-center mt-6">No payments yet</p>
      ) : (
        <table className="table mt-6">
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
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>${p.amount}</td>
                <td>{p.transactionId}</td>
                <td>
                  <span className="badge badge-success">{p.status}</span>
                </td>
                <td>
                  <PDFDownloadLink
                    document={<InvoicePDF payment={p} />}
                    fileName={`Invoice-${p._id}.pdf`}
                  >
                    Download
                  </PDFDownloadLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPayments;
