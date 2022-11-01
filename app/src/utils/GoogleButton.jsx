import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function GoogleButton() {
  const [user, setUser] = useState(false);

  function handleSignout(e) {
    setUser({});
    document.getElementById("google-signin-button").classList.remove("hidden");
    document.getElementById("google-signout-button").classList.add("hidden");
  }

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT response:", response);
    let userObj = jwt_decode(response.credential);
    console.log("Decoded JWT response:", userObj);
    setUser(userObj);
    // add class hidden to the button
    document.getElementById("google-signin-button").classList.add("hidden");
    document.getElementById("google-signout-button").classList.remove("hidden");
  }

  // Global google
  useEffect(() => {
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

    google.accounts.id.prompt(); // display the One Tap dialog
  }, []);

  return (
    <>
      <div
        id="google-signin-button"
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      ></div>
      {user && <div>Welcome {user.name}</div>}
      {Object.keys(user).length != 0 && (
        <button
          id="google-signout-button"
          onClick={(e) => {
            handleSignout(e);
          }}
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out hidden"
        >
          Sign out
        </button>
      )}
    </>
  );
}

export default GoogleButton;
