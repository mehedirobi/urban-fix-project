import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app";

  const displayText = (value) => {
    if (!value) return "Unknown";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value.name || value.email || JSON.stringify(value);
    return String(value);
  };

  useEffect(() => {
    const loadIssue = async () => {
      try {
        const res = await axios.get(`${API_URL}/issues/${id}`);
        const found = res.data;

        if (!found) return navigate("/all-issues");

        // Single image only, optimized height
        if (!found.image) found.image = "https://via.placeholder.com/600x300?text=No+Image";

        if (!Array.isArray(found.upvotedUsers)) found.upvotedUsers = [];
        if (!found.timeline || found.timeline.length === 0) {
          found.timeline = [
            {
              status: "Pending",
              message: "Issue reported by citizen",
              updatedBy: displayText(found.postedBy),
              date: found.createdAt ? new Date(found.createdAt) : new Date(),
            },
          ];
        }

        setIssue(found);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/all-issues");
      }
    };

    loadIssue();
  }, [id, navigate]);

  if (loading) return <div className="flex justify-center py-20 text-xl font-bold">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 bg-base-200">

      {/* Optimized Image */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
      </div>

      {/* Overview Section */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">{issue.title}</h1>

        <div className="flex gap-2 flex-wrap">
          <span className="badge badge-primary">{issue.category}</span>
          <span className="badge badge-secondary">{issue.status}</span>
          <span className={`badge ${issue.priority?.toLowerCase() === "high" ? "badge-error" : "badge-success"}`}>
            {issue.priority || "Normal"}
          </span>
        </div>

        <p className="text-gray-600">Location: <span className="font-semibold">{issue.location}</span></p>
        <p className="text-gray-700 leading-relaxed">{issue.description || "No description available."}</p>
        <p className="text-sm text-gray-500">Posted by: <span className="font-semibold">{displayText(issue.postedBy)}</span></p>
        <p className="text-lg font-semibold">{issue.upvotes || 0} Upvotes</p>
      </div>

      {/* Timeline Section */}
      {issue.timeline.length > 0 && (
        <div className="bg-base-200 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-6">Issue Timeline</h2>
          <div className="flex flex-col gap-4">
            {issue.timeline.slice().reverse().map((t, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-4 h-4 mt-2 rounded-full border-2 border-blue-500 bg-white flex-shrink-0"></div>
                <div className="flex-1 p-4 border-l-4 border-blue-500 bg-white rounded shadow-sm">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className={`badge ${
                      t.status?.toLowerCase() === "resolved"
                        ? "badge-success"
                        : t.status?.toLowerCase() === "in-progress"
                        ? "badge-warning"
                        : t.status?.toLowerCase() === "closed"
                        ? "badge-error"
                        : "badge-primary"
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-gray-400 text-xs">{new Date(t.date).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-700">{t.message}</p>
                  <p className="text-gray-500 text-xs">By: {displayText(t.updatedBy)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default IssueDetails;
