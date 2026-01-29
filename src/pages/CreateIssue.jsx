import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE = "https://urban-fix-server.vercel.app";

const CreateIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(""); 
  const [preview, setPreview] = useState("");

  const createIssueMutation = useMutation({
    mutationFn: async (newIssue) => {
      const res = await axios.post(`${API_BASE}/issues`, newIssue);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-issues", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Issue Created",
        text: "Your issue has been reported successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard/my-issues");
    },
    onError: (err) => {
      console.error(" Issue Creation Failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || err.message || "Could not create the issue",
      });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit an issue",
      });
      return;
    }

    const newIssue = {
      title,
      description,
      category,
      location,
      image: image || "",
      postedBy: {
        email: user.email,
        name: user.displayName || "User",
        photoURL: user.photoURL || "",
      },
      status: "Pending",
      priority: "Normal",
      upvotes: 0,
      upvotedUsers: [],
      timeline: [
        {
          status: "Pending",
          message: "Issue reported by citizen",
          updatedBy: user.email,
          date: new Date(),
        },
      ],
    };

    createIssueMutation.mutate(newIssue);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-center font-bold mb-8 text-primary">
        Create New Issue
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea textarea-bordered w-full min-h-[120px]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option>Road</option>
          <option>Garbage</option>
          <option>Water</option>
          <option>Streetlight</option>
          <option>Others</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="input input-bordered w-full"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md mt-2"
          />
        )}

        <button
          type="submit"
          className={`btn btn-primary mt-3 ${createIssueMutation.isLoading ? "loading" : ""}`}
          disabled={createIssueMutation.isLoading}
        >
          {createIssueMutation.isLoading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;
