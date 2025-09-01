import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuthStore from "../store/useStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // State for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  // Apply dark mode class to html element whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div
      className="min-h-screen transition-all duration-300"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <nav
        className="shadow-lg border-b transition-all duration-300"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--text-secondary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  MyApp
                </h1>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Settings
                </a>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-200 focus:outline-none "
                aria-label="Toggle dark mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
                <span className="absolute inset-0 flex items-center justify-between px-1">
                  <span className="text-xs">🌙</span>
                  <span className="text-xs">☀️</span>
                </span>
              </button>

              {/* User Profile */}
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-600"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
              </div>

              {/* Logout Button */}
              <Button text="Logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex justify-center items-center mt-20">
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-2 transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome back! 👋
          </h1>
          <p
            className="text-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Here's what's happening with your account today.
          </p>
        </div>
      </main>

      <div>
        <button>Add Project for collab +</button>
      </div>
    </div>
  );
};

export default Dashboard;
