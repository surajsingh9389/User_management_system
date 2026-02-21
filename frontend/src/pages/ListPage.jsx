import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import UserTable from "../components/UserTable";
import PaginationComponent from "../components/Pagination";

const ListPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await API.get(`/users?search=${search}&page=${page}&limit=5`);
      startTransition(() => {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleExport = async () => {
    try {
      const response = await API.get("/users/export", { responseType: "blob" });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-[#1a1a2e] py-3.5 px-7 flex items-center justify-center">
        <span className="text-white text-base font-medium tracking-wide">
          MERN stack developer practical task
        </span>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center px-7 py-4 bg-white border-b border-gray-200">
        {/* Left: Search */}
        <div className="flex items-center gap-2">
          <input
            className="px-3 py-2 border border-gray-300 rounded text-sm outline-none w-48 focus:border-[#7b1a1a] transition-colors"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="px-4 py-2 bg-[#7b1a1a] text-white text-sm font-medium rounded border-none cursor-pointer hover:bg-[#5a1212] transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Right: Add User + Export */}
        <div className="flex gap-2.5">
          <button
            className="px-4 py-2 bg-[#7b1a1a] text-white text-sm font-medium rounded border-none cursor-pointer hover:bg-[#5a1212] transition-colors"
            onClick={() => navigate("/add")}
          >
            + Add User
          </button>
          <button
            className="px-4 py-2 bg-[#7b1a1a] text-white text-sm font-medium rounded border-none cursor-pointer hover:bg-[#5a1212] transition-colors"
            onClick={handleExport}
          >
            Export To Csv
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-7 mt-5 bg-white rounded-md shadow-sm overflow-hidden">
        <UserTable users={users} onRefresh={fetchUsers} />
      </div>

      {/* Pagination */}
      <div className="px-7 pb-6">
        <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ListPage;
