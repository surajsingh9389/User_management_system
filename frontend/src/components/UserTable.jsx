import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import API from "../api/axios";

const UserTable = ({ users, onRefresh }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setConfirmDeleteId(null);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/users/${id}/status`, { status: newStatus });
      setStatusMenuId(null);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse bg-white text-sm">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="py-3 px-4 text-left font-bold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">FullName</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">Email</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">Gender</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">Profile</th>
              <th className="py-3 px-4 text-left font-bold text-gray-700">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {/* ID */}
                <td className="py-3 px-4 text-gray-700 align-middle">{index + 1}</td>

                {/* Full Name */}
                <td className="py-3 px-4 text-gray-700 align-middle">
                  {user.firstName} {user.lastName}
                </td>

                {/* Email */}
                <td className="py-3 px-4 text-gray-700 align-middle">{user.email}</td>

                {/* Gender */}
                <td className="py-3 px-4 text-gray-700 align-middle">
                  {user.gender === "Male" ? "M" : "F"}
                </td>

                {/* Status — clickable pill with dropdown */}
                <td className="py-3 px-4 align-middle">
                  <div className="relative inline-block">
                    <button
                      className="bg-[#7b1a1a] text-white text-xs font-medium px-3 py-1 rounded cursor-pointer border-none"
                      onClick={() =>
                        setStatusMenuId(statusMenuId === user._id ? null : user._id)
                      }
                    >
                      {user.status} ▾
                    </button>
                    {statusMenuId === user._id && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[100px]">
                        {["Active", "InActive"].map((opt) => (
                          <div
                            key={opt}
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleStatusChange(user._id, opt)}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>

                {/* Profile Avatar */}
                <td className="py-3 px-4 align-middle">
                  <Avatar src={user.profileImage || ""} sx={{ width: 36, height: 36 }} />
                </td>

                {/* Action — three-dot menu */}
                <td className="py-3 px-4 align-middle">
                  <div className="relative inline-block">
                    <button
                      className="bg-transparent border-none text-xl cursor-pointer px-2 py-0.5 text-gray-500 rounded hover:bg-gray-100"
                      onClick={() =>
                        setOpenMenuId(openMenuId === user._id ? null : user._id)
                      }
                    >
                      ⋮
                    </button>
                    {openMenuId === user._id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[110px]">
                        <div
                          className="px-4 py-2 text-sm font-medium text-green-700 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => { setOpenMenuId(null); navigate(`/view/${user._id}`); }}
                        >
                          ● View
                        </div>
                        <div
                          className="px-4 py-2 text-sm font-medium text-blue-700 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => { setOpenMenuId(null); navigate(`/edit/${user._id}`); }}
                        >
                          ✎ Edit
                        </div>
                        <div
                          className="px-4 py-2 text-sm font-medium text-red-700 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => { setOpenMenuId(null); setConfirmDeleteId(user._id); }}
                        >
                          ■ Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-2xl">
            <p className="font-bold text-gray-800 mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-5 py-2 rounded border border-gray-300 bg-white text-gray-700 cursor-pointer text-sm hover:bg-gray-50"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded border-none bg-red-700 text-white font-semibold cursor-pointer text-sm hover:bg-red-800"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
