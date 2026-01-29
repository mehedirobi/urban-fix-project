import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AiFillLike } from "react-icons/ai";

const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-md min-h-[380px]">
    <div className="h-48 bg-gray-300 w-full"></div>
    <div className="p-4 space-y-2">
      <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const AllIssues = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchIssues = useCallback(async () => {
    if (firstLoad) setLoading(true);
    try {
      const res = await axiosSecure.get("/issues", { params: { limit: 200 } });
      const list = Array.isArray(res.data)
        ? res.data.filter((i) => i?._id)
        : [];
      setIssues(list);
    } catch (err) {
      console.error("Issue Fetch Failed!", err);
    } finally {
      if (firstLoad) {
        setLoading(false);
        setFirstLoad(false);
      }
    }
  }, [axiosSecure, firstLoad]);

  useEffect(() => {
    if (!authLoading) fetchIssues();
  }, [authLoading, fetchIssues]);

  const handleUpvote = async (issue) => {
    if (!user?.email) return navigate("/login");
    if (!issue?._id || issue.postedBy?.email === user.email) return;

    const alreadyUpvoted = issue.upvotedUsers?.includes(user.email);
    if (alreadyUpvoted) return;

    setIssues((prev) =>
      prev.map((i) =>
        i._id === issue._id
          ? {
              ...i,
              upvotes: (i.upvotes || 0) + 1,
              upvotedUsers: [...(i.upvotedUsers || []), user.email],
            }
          : i,
      ),
    );

    try {
      const res = await axiosSecure.put(`/issues/${issue._id}/upvote`, {
        userEmail: user.email,
      });
      const updatedIssue = res?.data;
      if (updatedIssue?._id)
        setIssues((prev) =>
          prev.map((i) => (i._id === updatedIssue._id ? updatedIssue : i)),
        );
    } catch (err) {
      console.error("Upvote Failed:", err);
      fetchIssues();
    }
  };

  const filtered = useMemo(() => {
    let data = [...issues];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.location?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q),
      );
    }
    if (category)
      data = data.filter(
        (i) => i.category?.toLowerCase() === category.toLowerCase(),
      );
    if (status)
      data = data.filter(
        (i) => i.status?.toLowerCase() === status.toLowerCase(),
      );
    if (priority)
      data = data.filter(
        (i) => i.priority?.toLowerCase() === priority.toLowerCase(),
      );
    data.sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return (b.upvotes || 0) - (a.upvotes || 0);
    });
    return data;
  }, [issues, search, category, status, priority]);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentIssues = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  if (authLoading || (loading && firstLoad))
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Explore Issues
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full md:w-1/3 text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Filters */}
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered text-sm"
          >
            <option value="">Category</option>
            <option>Electricity</option>
            <option>Water Supply</option>
            <option>Road</option>
            <option>Cleanliness</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered text-sm"
          >
            <option value="">Status</option>
            <option>Pending</option>
            <option>In-Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered text-sm"
          >
            <option value="">Priority</option>
            <option>High</option>
            <option>Normal</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentIssues.length ? (
          currentIssues.map((issue) => {
            const alreadyUpvoted = issue.upvotedUsers?.includes(user?.email);
            return (
              <div
                key={issue._id}
                className="group card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]"
              >
                <figure className="overflow-hidden">
                  <img
                    src={
                      issue.image ||
                      "https://via.placeholder.com/600x350?text=No+Image"
                    }
                    alt={issue.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </figure>
                <div className="card-body flex flex-col">
                  <h3 className="card-title text-gray-800">{issue.title}</h3>
                  <p className="text-sm text-gray-500">{issue.location}</p>
                  <div className="flex gap-2 flex-wrap my-2">
                    <span className="badge badge-primary">
                      {issue.category}
                    </span>
                    <span className="badge badge-secondary">
                      {issue.status}
                    </span>
                    <span
                      className={`badge ${issue.priority === "High" ? "badge-error" : "badge-success"}`}
                    >
                      {issue.priority || "Normal"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-auto flex-wrap">
                    <button
                      onClick={() => handleUpvote(issue)}
                      className={`btn btn-sm transition-all duration-300 ${alreadyUpvoted ? "btn-success text-white" : "btn-outline"}`}
                      disabled={issue.postedBy?.email === user?.email}
                    >
                      <AiFillLike className="text-yellow-400 text-xl" />{" "}
                      {issue.upvotes || 0}
                    </button>
                    <Link
                      to={`/issues/${issue._id}`}
                      className="btn btn-sm btn-primary transition-all duration-300 group-hover:scale-105"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No issues found
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
