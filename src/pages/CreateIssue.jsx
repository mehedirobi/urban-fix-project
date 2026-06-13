import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  MapPin,
  Upload,
  User,
  AlertTriangle,
  FileText,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/UseAuth";

const API_BASE = "https://urban-fix-server.vercel.app";

const CreateIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");
  const [priority, setPriority] = useState("Normal");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const createIssueMutation = useMutation({
    mutationFn: async (newIssue) => {
      const res = await axios.post(`${API_BASE}/issues`, newIssue);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-issues", user?.email],
      });

      Swal.fire({
        icon: "success",
        title: "Issue Reported",
        text: "Your issue has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-issues");
    },

    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong.",
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
        text: "Please login first.",
      });
      return;
    }

    const newIssue = {
      title,
      description,
      category,
      priority,
      location,
      image,

      postedBy: {
        email: user.email,
        name: user.displayName || "User",
        photoURL: user.photoURL || "",
      },

      status: "Pending",
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
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-3xl
            bg-gradient-to-r
            from-primary
            to-secondary
            text-white
            p-8 md:p-12
            mb-10
          "
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Report Urban Issues
          </h1>

          <p className="max-w-3xl text-white/90 text-lg">
            Help improve your community by reporting
            infrastructure problems, road damage,
            water supply issues, waste management
            concerns, and public service failures.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Card */}
            <div className="bg-base-200 rounded-3xl p-6 shadow-sm">
              <User className="text-primary mb-3" size={28} />

              <h3 className="text-xl font-bold mb-4">
                Reporter Information
              </h3>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">
                    Name:
                  </span>{" "}
                  {user?.displayName || "User"}
                </p>

                <p>
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-base-200 rounded-3xl p-6 shadow-sm">
              <AlertTriangle
                className="text-warning mb-3"
                size={28}
              />

              <h3 className="text-xl font-bold mb-4">
                Reporting Tips
              </h3>

              <ul className="space-y-3 text-sm opacity-80">
                <li>• Use a clear and specific title.</li>
                <li>• Add an exact location.</li>
                <li>• Upload a quality image.</li>
                <li>• Explain the issue clearly.</li>
                <li>• Select correct category.</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="
                bg-base-200
                rounded-3xl
                p-8
                shadow-sm
                space-y-6
              "
            >
              {/* Title */}
              <div>
                <label className="font-medium mb-2 block">
                  Issue Title
                </label>

                <input
                  type="text"
                  placeholder="Broken Streetlight Near Main Road"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-medium mb-2 block">
                  Description
                </label>

                <textarea
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                  className="
                    textarea
                    textarea-bordered
                    min-h-[160px]
                    w-full
                  "
                />
              </div>

              {/* Category + Priority */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-2 block">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="select select-bordered w-full"
                  >
                    <option>Road</option>
                    <option>Garbage</option>
                    <option>Water</option>
                    <option>Streetlight</option>
                    <option>Electricity</option>
                    <option>Drainage</option>
                    <option>Others</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="Normal">
                      Normal
                    </option>
                    <option value="High">
                      High
                    </option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="font-medium mb-2 block">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Enter exact location"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    required
                    className="
                      input
                      input-bordered
                      w-full
                      pl-12
                    "
                  />
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="font-medium mb-3 block">
                  Upload Image
                </label>

                <div
                  className="
                    border-2
                    border-dashed
                    border-base-300
                    rounded-2xl
                    p-6
                    text-center
                  "
                >
                  <Upload
                    size={40}
                    className="
                      mx-auto
                      text-primary
                      mb-3
                    "
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="
                      file-input
                      file-input-bordered
                      w-full
                    "
                  />

                  <p className="text-sm opacity-70 mt-3">
                    Upload a clear image of the issue.
                  </p>
                </div>
              </div>

              {/* Preview */}
              {preview && (
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={preview}
                    alt="Preview"
                    className="
                      w-full
                      h-72
                      object-cover
                    "
                  />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={createIssueMutation.isPending}
                className="
                  btn
                  btn-primary
                  btn-lg
                  w-full
                "
              >
                {createIssueMutation.isPending
                  ? "Submitting..."
                  : "Submit Issue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIssue;