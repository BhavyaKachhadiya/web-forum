'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-between">
      <div className="font-semibold text-[1rem]">
        <Link href={"/"}>
          {" "}
          WEB <span className="text-red">FORUM</span>
        </Link>
      </div>
      <div className="relative">
        <div
          className="cursor-pointer bg-[#5c647025] p-1 border-0 rounded-sm"
          onClick={handleDropdownToggle}
        >
          {session ? (
            <img
              src={session.user.image}
              alt="Profile Image"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span>Account</span>
          )}
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-blue rounded-md shadow-lg z-10">
            <div className="py-1">
              {session ? (
                <div>

                <Link
                  className="block px-4 py-2 text-sm text-gray-700 bg-s-blue hover:bg-red  w-full text-left"
                  href={`/u/${session.user.name}`}
                  >
                  Profile
                </Link>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 bg-s-blue hover:bg-red w-full text-left"
                  onClick={handleSignOut}
                  >
                  Logout
                </button>
                  </div>
              ) : (
                <div>
                <Link href={"/login"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
      
                    Login
                </Link>
              <Link href={"/signup"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Sign Up
                
              </Link>
                </div>
              )}
              {/* Add more dropdown items here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
