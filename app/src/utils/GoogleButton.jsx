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

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT response:", response);
    let userObj = jwt_decode(response.credential);
    console.log("Decoded JWT response:", userObj);
    setLoginData(userObj);
    localStorage.setItem("loginData", JSON.stringify(userObj));
    // add class hidden to the button
    document.getElementById("google-signin-button").classList.add("hidden");
    document.getElementById("google-signout-button").classList.remove("hidden");
  }

  const handleLogout = () => {
    console.log("Logging out...");
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
