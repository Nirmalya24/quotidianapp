import React, { useEffect, useState } from "react";
import googleOneTap from "google-one-tap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

const options = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "use",
};

// const URL = "https://quotidianapp-dev.up.railway.app";
const URL = import.meta.env.VITE_API_URL;

function GoogleButton() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  console.log("Login data:", loginData);

  useEffect(() => {
    // if (!loginData) {
    googleOneTap(options, async (response) => {
      console.log("Response from Google:", response);
      const res = await axios.post(`${URL}/google-login`, {
        body: {
          token: response.credential,
        },
      });

      const data = await res.data;
      console.log("Data from server:", data);
      setLoginData(data);
      localStorage.setItem("loginData", JSON.stringify(data));
    });
    // }
  }, [loginData]);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  // Global google
  useEffect(() => {
    if (!loginData) {
      google.accounts.id.initialize({
        client_id:
          "321432838940-6b0v4vec649gq9iflbl0cfupn7vp47ql.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        ux_mode: "popup",
        allowed_parent_origins: ["http://localhost:5173", "http://localhost"],
        context: "use",
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "medium", type: "standard" }
      );
    }
  }, []);

  return (
    <>
      <div
        id="google-signin-button"
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      ></div>
      {loginData && <div>Welcome {loginData.name}</div>}
      {loginData && (
        <Link
          to="/dashboard"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out text-sm"
        >
          Go to Dashboard
        </Link>
      )}
      {loginData && (
        <button
          id="google-signout-button"
          onClick={handleLogout}
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          Sign out
        </button>
      )}
    </>
  );
}

export default GoogleButton;
