"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [focused, setFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [probables, setProbables] = React.useState<any[]>([]);
  const router = useRouter();
  const searchRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetch(`${NEXT_PUBLIC_BACKEND_URL}/videos/search/${searchTerm}`)
          .then((res) => res.json())
          .then((data) => setProbables(data));
      } else {
        setProbables([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative  max-w-full md:max-w-md lg:max-w-lg"
    >
      {/* Searchbar */}
      <div className="flex items-center h-10 border rounded-md border-gray-300 bg-white w-full">
        <input
          placeholder="Search"
          className="flex-1 h-full px-3 text-gray-700 placeholder-gray-400 focus:outline-none"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
        />

        <span className="border-l border-gray-300 bg-gray-50 px-2 flex items-center justify-center rounded-r-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
            onClick={() => setFocused(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
            />
          </svg>
        </span>
      </div>

      {/* Dropdown */}
      {focused && probables.length > 0 && searchTerm.length > 2 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {probables.map((item) => (
            <div
              key={item._id}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => {
                router.push(`/home/video/${item._id}`);
                setSearchTerm("");
                setFocused(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
