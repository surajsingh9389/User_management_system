import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const UserForm = ({ initialData = {}, isEdit = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    age: initialData.age || "",
    gender: initialData.gender || "",
    status: initialData.status || "Active",
  });

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.profileImage || null);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        age: initialData.age || "",
        gender: initialData.gender || "",
        status: initialData.status || "Active",
      });
      setPreviewUrl(initialData.profileImage || null);
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("profileImage", image);

    try {
      if (isEdit) {
        await API.put(`/users/${initialData._id}`, data);
      } else {
        await API.post("/users", data);
      }
      setLoading(false);
      setSnackbar({
        open: true,
        message: isEdit ? "User updated successfully!" : "User created successfully!",
      });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-md border border-gray-200">
      {/* Avatar preview */}
      <div className="flex justify-center mb-6">
        <div
          className="w-18 h-18 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
          style={{ width: 72, height: 72 }}
          onClick={() => fileInputRef.current.click()}
          title="Click to change photo"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">👤</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1: First Name + Last Name */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">First name</label>
            <input
              className="px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-800 outline-none focus:border-[#7b1a1a] transition-colors"
              name="firstName"
              placeholder="Enter FirstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Last Name</label>
            <input
              className="px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-800 outline-none focus:border-[#7b1a1a] transition-colors"
              name="lastName"
              placeholder="Enter LastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2: Email + Age */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email address</label>
            <input
              className="px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-800 outline-none focus:border-[#7b1a1a] transition-colors"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Age</label>
            <input
              className="px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-800 outline-none focus:border-[#7b1a1a] transition-colors"
              name="age"
              type="number"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
        </div>

        {/* Row 3: Gender + Status */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Select Your Gender</label>
            <div className="flex gap-5 mt-2">
              <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Select Your Status</label>
            <select
              className="px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-800 outline-none bg-white cursor-pointer focus:border-[#7b1a1a] transition-colors"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
        </div>

        {/* Row 4: Profile File Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Select Your Profile</label>
          <div className="flex items-center gap-3 mt-1.5">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="px-3 py-1.5 border border-gray-400 rounded text-sm cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => fileInputRef.current.click()}
            >
              Choose file
            </button>
            <span className="text-xs text-gray-500">
              {image ? image.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 bg-[#7b1a1a] text-white text-base font-semibold rounded cursor-pointer hover:bg-[#5a1212] transition-colors disabled:opacity-60"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {/* Success Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-7 py-3 rounded-md text-sm font-medium shadow-lg z-[300]">
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default UserForm;
