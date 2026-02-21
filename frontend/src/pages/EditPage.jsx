import { startTransition, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import API from "../api/axios";
import UserForm from "../components/UserForm";

const EditPage = () => {
  const { id } = useParams();

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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] py-3.5 px-7 flex items-center justify-center">
        <span className="text-white text-base font-medium tracking-wide">
          MERN stack developer practical task
        </span>
      </div>

      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit User Details
        </h2>
        {user && <UserForm initialData={user} isEdit={true} />}
      </div>
    </div>
  );
};

export default EditPage;
