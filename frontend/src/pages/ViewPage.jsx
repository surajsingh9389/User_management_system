import { startTransition, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import API from "../api/axios";

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      startTransition(() => {
        setUser(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] py-3.5 px-7 flex items-center justify-center">
        <span className="text-white text-base font-medium tracking-wide">
          MERN stack developer practical task
        </span>
      </div>

      <div className="max-w-lg mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5">User Details</h2>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-200 flex items-center justify-center text-5xl">
                👤
              </div>
            )}
          </div>

          {/* Info Rows */}
          <div className="mb-6">
            <InfoRow label="ID" value={user._id} />
            <InfoRow label="Name" value={`${user.firstName} ${user.lastName}`} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Age" value={user.age} />
            <InfoRow label="Gender" value={user.gender} />
            <InfoRow
              label="Status"
              value={
                <span
                  className={`text-white text-xs font-medium px-3 py-1 rounded ${
                    user.status === "Active" ? "bg-[#7b1a1a]" : "bg-gray-500"
                  }`}
                >
                  {user.status}
                </span>
              }
            />
          </div>

          <button
            className="px-5 py-2.5 bg-[#7b1a1a] text-white font-semibold rounded border-none cursor-pointer text-sm hover:bg-[#5a1212] transition-colors"
            onClick={() => navigate("/")}
          >
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex border-b border-gray-100 py-2.5">
    <span className="w-28 font-semibold text-gray-500 text-sm shrink-0">{label}:</span>
    <span className="text-gray-800 text-sm">{value}</span>
  </div>
);

export default ViewPage;