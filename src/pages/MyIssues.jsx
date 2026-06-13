import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app";

const MyIssues = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const [editModal, setEditModal] = useState(false);
  const [editIssueData, setEditIssueData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const queryKey = useMemo(
    () => ["my-issues", user?.email],
    [user?.email]
  );

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE}/issues/my/${user.email}`
      );
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (!user) {
    return (
      <p className="text-center py-10">
        Please login to see your issues.
      </p>
    );
  }

  const refreshIssues = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this issue?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/issues/${id}`, {
        data: { userEmail: user.email },
      });

      await refreshIssues();

      Swal.fire({
        title: "Deleted",
        text: "Issue removed successfully.",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete issue.", "error");
    }
  };

  const openEditModal = (issue) => {
    setEditIssueData({ ...issue });
    setEditModal(true);
  };

  const closeModal = () => {
    setEditModal(false);
    setEditIssueData(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editIssueData?._id) return;

    try {
      setSubmitting(true);

      const { _id, title, description, category, location } =
        editIssueData;

      await axios.put(`${API_BASE}/issues/${_id}`, {
        title,
        description,
        category,
        location,
      });

      await refreshIssues();

      closeModal();

      Swal.fire({
        title: "Updated",
        text: "Issue updated successfully.",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update issue.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-10">Loading issues...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load issues.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl text-center font-bold mb-8 text-primary">
        My Issues
      </h1>

      {issues.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t posted any issues yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card border shadow-lg rounded-xl"
            >
              <figure>
                <img
                  src={
                    issue.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={issue.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  loading="lazy"
                />
              </figure>

              <div className="card-body flex flex-col gap-2">
                <h2 className="text-xl font-bold">
                  {issue.title}
                </h2>

                <div className="flex gap-2 flex-wrap">
                  <span className="badge badge-primary">
                    {issue.category}
                  </span>
                  <span className="badge badge-secondary">
                    {issue.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-3">
                  {issue.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <Link
                    to={`/issues/${issue._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>

                  <span className="text-gray-500">
                    {issue.upvotes || 0} 👍
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="btn btn-sm btn-warning flex-1"
                    onClick={() => openEditModal(issue)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-error flex-1"
                    onClick={() => handleDelete(issue._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && editIssueData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Edit Issue
            </h2>

            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                className="input input-bordered"
                value={editIssueData.title || ""}
                onChange={(e) =>
                  setEditIssueData({
                    ...editIssueData,
                    title: e.target.value,
                  })
                }
                required
              />

              <textarea
                className="textarea textarea-bordered"
                value={editIssueData.description || ""}
                onChange={(e) =>
                  setEditIssueData({
                    ...editIssueData,
                    description: e.target.value,
                  })
                }
                required
              />

              <select
                className="select select-bordered"
                value={editIssueData.category || "Others"}
                onChange={(e) =>
                  setEditIssueData({
                    ...editIssueData,
                    category: e.target.value,
                  })
                }
              >
                <option>Road</option>
                <option>Garbage</option>
                <option>Water</option>
                <option>Streetlight</option>
                <option>Others</option>
              </select>

              <input
                type="text"
                className="input input-bordered"
                value={editIssueData.location || ""}
                onChange={(e) =>
                  setEditIssueData({
                    ...editIssueData,
                    location: e.target.value,
                  })
                }
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;