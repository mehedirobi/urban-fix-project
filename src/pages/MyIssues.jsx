import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE = "https://urban-fix-server.vercel.app";

const MyIssues = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const [editModal, setEditModal] = useState(false);
  const [editIssueData, setEditIssueData] = useState(null);

  if (!user)
    return <p className="text-center py-10">Please login to see your issues.</p>;

  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ["my-issues", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/issues/my/${user.email}`);
      return res.data || [];
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/issues/${id}`, { data: { userEmail: user.email } });
        await queryClient.invalidateQueries(["my-issues", user.email]);
        Swal.fire("Deleted!", "Your issue has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete issue.", "error");
      }
    }
  };

  const openEditModal = (issue) => {
    setEditIssueData({ ...issue });
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { _id, title, description, category, location } = editIssueData;

    try {
      await axios.put(`${API_BASE}/issues/${_id}`, {
        title,
        description,
        category,
        location,
      });
      await queryClient.invalidateQueries(["my-issues", user.email]);
      setEditModal(false);
      setEditIssueData(null);
      Swal.fire("Updated!", "Your issue has been updated successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update issue.", "error");
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Loading issues...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Error loading issues.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl text-center font-bold mb-8 text-primary">My Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">You haven’t posted any issues yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div key={issue._id} className="card border shadow-lg rounded-xl">
              <figure>
                <img
                  src={issue.image || "/default-image.png"}
                  alt={issue.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </figure>

              <div className="card-body flex flex-col gap-2">
                <h2 className="text-xl font-bold">{issue.title}</h2>

                <div className="flex gap-2 flex-wrap">
                  <span className="badge badge-primary">{issue.category}</span>
                  <span className="badge badge-secondary">{issue.status}</span>
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
                  <span className="text-gray-500">{issue.upvotes || 0} 👍</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="btn btn-sm btn-warning flex-1"
                    onClick={() => openEditModal(issue)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error flex-1"
                    onClick={() => handleDelete(issue._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModal && editIssueData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                className="input input-bordered"
                value={editIssueData.title}
                onChange={(e) =>
                  setEditIssueData({ ...editIssueData, title: e.target.value })
                }
                required
              />
              <textarea
                className="textarea textarea-bordered"
                value={editIssueData.description}
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
                value={editIssueData.category}
                onChange={(e) =>
                  setEditIssueData({ ...editIssueData, category: e.target.value })
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
                value={editIssueData.location}
                onChange={(e) =>
                  setEditIssueData({ ...editIssueData, location: e.target.value })
                }
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
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
