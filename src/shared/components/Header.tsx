"use client";
import React, { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Searchbar from "./Searchbar";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hideGoLiveButton = pathname.startsWith("/go-live");

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="w-full shadow-[0_1px_2px_rgba(0,0,0,0.06)] bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div
          className="text-3xl font-bold text-gray-900 cursor-pointer flex-shrink-0"
          onClick={() => router.push("/")}
        >
          Strea<span className="text-green-700">Meyo</span>
        </div>

        {/* Desktop searchbar */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-lg">
            <Searchbar />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex gap-3 items-center flex-shrink-0">

          {/* 🔍 Mobile Search Toggle Button */}
          <button 
            className="md:hidden text-gray-800"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <SignedOut>
            <SignInButton>
              <span className="text-gray-700 hover:text-black cursor-pointer hidden sm:inline">
                Login
              </span>
            </SignInButton>

            <SignUpButton>
              <button className="hidden sm:inline bg-gray-900 text-white rounded-full px-4 py-1.5 text-sm hover:bg-black">
                Register
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            {!hideGoLiveButton && (
              <button
                className="hidden sm:flex text-gray-900 border border-gray-900 rounded-md px-3 py-1.5 text-sm hover:bg-gray-900 hover:text-white"
                onClick={() => router.push("/home/go-live")}
              >
                Go Live
              </button>
            )}

            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* 🔥 Mobile Searchbar Dropdown */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 animate-fadeIn">
          <Searchbar />
        </div>
      )}
    </header>
  );
};

export default Header;
