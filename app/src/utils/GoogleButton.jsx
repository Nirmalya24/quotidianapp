import React, { useEffect, useState } from "react";
import googleOneTap from "google-one-tap";
import jwt_decode from "jwt-decode";
import axios from "axios";

const options = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "use",
};

const URL = "https://quotidianapp-production.up.railway.app";

function GoogleButton() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    if (!loginData) {
      googleOneTap(options, async (response) => {
        console.log(response);
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(`${URL}/api/google-login`, {
          data: JSON.stringify({ token: response.credential }),
          headers,
        });
        // const res = await fetch("/api/google-login", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     token: response.credential,
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
      });
    }
  }, [loginData]);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  // const [user, setUser] = useState(false);

  // function handleSignout(e) {
  //   setUser({});
  //   document.getElementById("google-signin-button").classList.remove("hidden");
  //   document.getElementById("google-signout-button").classList.add("hidden");
  // }

  // function handleCallbackResponse(response) {
  //   // console.log("Encoded JWT response:", response);
  //   let userObj = jwt_decode(response.credential);
  //   console.log("Decoded JWT response:", userObj);
  //   setUser(userObj);
  //   // add class hidden to the button
  //   document.getElementById("google-signin-button").classList.add("hidden");
  //   document.getElementById("google-signout-button").classList.remove("hidden");
  // }

  // // Global google
  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "321432838940-6b0v4vec649gq9iflbl0cfupn7vp47ql.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //     ux_mode: "popup",
  //     allowed_parent_origins: ["http://localhost:5173", "http://localhost"],
  //     context: "use",
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("google-signin-button"),
  //     { theme: "outline", size: "medium", type: "standard" }
  //   );

  //   google.accounts.id.prompt(); // display the One Tap dialog
  // }, []);

  return (
    <>
      <div
        id="google-signin-button"
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      ></div>
      {loginData && <div>Welcome {loginData.name}</div>}
      {loginData && (
        <button
          id="google-signout-button"
          onClick={handleLogout}
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out hidden"
        >
          Sign out
        </button>
      )}
    </>
  );
}

export default GoogleButton;
