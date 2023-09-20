import React, { useState } from "react";
import Logo from "./logo";
import { Link, Redirect } from "react-router-dom";
import PinEntry from "./PinEntry"; // Import the PinEntry component

function Navbar() {
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication

  // Function to handle PIN entry and authentication
  const handlePinEntered = (pin) => {
    // Replace '1234' with your actual PIN for authentication
    if (pin === "1234") {
      setAuthenticated(true);
    }
  };

  // If authenticated, render the admin link; otherwise, show PIN entry
  return (
    <div>
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <div className="flex items-center justify-between">
          <h1 className="justify-end font-black">
            <Link to="/">
              <Logo />
            </Link>
            Roster
          </h1>
          {authenticated ? (
            // If authenticated, show the admin link
            <Link
              to="/admin"
              className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                aria-hidden="true"
              >
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              New
            </Link>
          ) : (
            // If not authenticated, show PIN entry
            <PinEntry onPinEntered={handlePinEntered} />
          )}
        </div>
        <form className="group relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects..."
          />
        </form>
      </header>
    </div>
  );
}

export default Navbar;
