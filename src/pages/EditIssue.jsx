import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/UseAuth";

const EditIssue = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    location: "",
    image: "",
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app"}/issue/${id}`);
        const issue = res.data;

        if (!user || issue.postedBy !== user.email) {
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You can only edit your own issues!",
          });
          return navigate("/dashboard/my-issues");
        }

        if (issue.status !== "Pending") {
          Swal.fire({
            icon: "warning",
            title: "Cannot Edit",
            text: "You can only edit issues with Pending status.",
          });
          return navigate("/dashboard/my-issues");
        }

        setFormData({
          title: issue.title || "",
          description: issue.description || "",
          category: issue.category || "Road",
          location: issue.location || "",
          image: issue.image || "",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch issue data!",
        });
        navigate("/dashboard/my-issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SUBMIT EDIT 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || "https://urban-fix-server.vercel.app"}/issue/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Updated Succesfully",
        text: "Issue updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err.response?.data?.message || err.message || "Could not update issue!",
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center md:text-left">
        Edit Issue
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Issue Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full min-h-[120px]"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option>Road</option>
          <option>Garbage</option>
          <option>Water</option>
          <option>Streetlight</option>
          <option>Others</option>
        </select>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary mt-3">
          Update Issue
        </button>
      </form>
    </div>
  );
};

export default EditIssue;
