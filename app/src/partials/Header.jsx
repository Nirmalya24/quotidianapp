import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Header() {
  const [user, setUser] = useState(false);

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT response:", response);
    let userObj = jwt_decode(response.credential);
    console.log("Decoded JWT response:", userObj);
    setUser(userObj);
    document.getElementById("google-signin-button").style.display = "none";
  }

  // Global google
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "321432838940-6b0v4vec649gq9iflbl0cfupn7vp47ql.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      // ux_mode: "popup",
      allowed_parent_origins: ["http://localhost:5173", "http://localhost"],
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "medium", type: "standard" }
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <div className="flex flex-grow justify-end flex-wrap items-center">
              <button
                id="google-signin-button"
                className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              ></button>
              {user && <div>Welcome {user.name}</div>}
              {user && (
                <button
                  id="google-signout-button"
                  onClick={(e) => {
                    handleSignout(e);
                  }}
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign out
                </button>
              )}
            </div>

            {/* <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link to="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  <span>Sign up</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li>
            </ul> */}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
