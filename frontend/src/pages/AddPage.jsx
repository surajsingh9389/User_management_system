import UserForm from "../components/UserForm";

const AddPage = () => {
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
          Register Your Details
        </h2>
        <UserForm />
      </div>
    </div>
  );
};

export default AddPage;