"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userCredentials, setUserCredentials] = useState(() => {
    return localStorage.getItem("userCredentials");
  });
  useEffect(() => {
    // Define a function to handle storage events
    const handleStorageChange = () => {
      setUserCredentials(localStorage.getItem("userCredentials"));
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userCredentials");
    setUserCredentials(null);
  };
  return (
    <navbar className="flex justify-between font-semibold items-center px-4 py-2 rounded-3xl my-2 bg-orange-400 mx-2 md:mx-4 lg:mx-0">
      <div className="hover:text-white text-white text-sm md:text-lg">
        <Link href={"/"}>Home</Link>
      </div>
      <div className="flex items-center gap-4">
        {userCredentials ? (
          <>
            <h1 className="text-white text-sm md:text-lg">{userCredentials}</h1>
            <button
              onClick={handleLogout}
              className=" text-white px-4 py-1 rounded-md text-sm md:text-lg hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div>
              <Link href={"/register"} className="hover:text-orange-white text-sm md:text-lg p-1 rounded-md text-white px-2">
                Register
              </Link>
            </div>
            <div>
              <Link href={"/login"} className="hover:text-white text-sm md:text-lg text-white p-1 rounded-md px-2">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </navbar>
  );
};

export default Navbar;
