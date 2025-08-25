import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const click = () => {
    navigate("/signin");
    logout();
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-20 text-gray-800">
        Welcome to Your Dashboard
      </h1>
      <button
        onClick={click}
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
