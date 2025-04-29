import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      window.location.href = '/LoginPage';
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/change-password.php", {
        email: user.email,
        oldPassword,
        newPassword,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setOldPassword("");
        setNewPassword("");
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage("An error occurred while changing the password.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost/logout.php", {
        email: user.email,
      });

      if (response.data.success) {
        localStorage.removeItem("user");
        window.location.href = "/LoginPage";
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage("An error occurred while logging out.");
    }
  };

  return (
    <div className="relative flex w-full h-screen py-32 bg-gray-50">
      <div className="w-full">
        <Link
          to="/dashboard"
          className="absolute flex items-center text-gray-700 top-10 left-4 hover:text-blue-700"
        >
          <img
            src="https://img.icons8.com/?size=100&id=40217&format=png&color=1D4ED8"
            alt="Back"
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold">Back</span>
        </Link>
        <div className="flex flex-col justify-center w-full md:flex-row">
          <div className="flex flex-col items-center justify-center w-full p-6 bg-white border-r border-gray-200 md:w-1/3">
            <img
              src={user.profileImage || "https://img.icons8.com/?size=100&id=23265&format=png&color=000000"}
              alt="Profile"
              className="object-cover w-32 h-32 mb-4 rounded-full"
            />
            <h2 className="text-2xl font-bold text-blue-700">{user.username}</h2>
            <p className="mt-2 text-gray-600">{user.email}</p>
          </div>

          <div className="relative flex flex-col justify-center w-full p-8 md:w-2/3">
            <h1 className="mb-6 text-3xl font-bold">User Profile</h1>

            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-700">
                  Account Information
                </h2>
                <p className="text-gray-600">Account Created At: {user.created_at}</p>
              </div>

              <div>
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-gray-700">Password</h2>
                  <form
                    className="flex flex-col mt-4 space-y-4"
                    onSubmit={handlePasswordChange}
                  >
                    <div>
                      <label
                        htmlFor="oldPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Old Password
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800"
                    >
                      Save
                    </button>
                  </form>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>


            {message && (
              <div
                className={`mt-4 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"
                  }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}