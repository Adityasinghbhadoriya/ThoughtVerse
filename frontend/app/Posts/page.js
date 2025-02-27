"use client";

import React, { useEffect, useState } from "react";
import { getBlogs } from "../api";
import Link from "next/link";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="w-full h-full pt-24 text-black animated-background">
      {/* Blog Posts Section */}
      <div className="p-10 rounded-lg">
        <h1 className="text-5xl font-bold mb-10 ml-14">BLOG POSTS</h1>

        {loading ? (
          // Show a skeleton or loading state
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl font-semibold">Loading Blogs...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-center">
            {blogs.map((item) => (
              <div
                key={item._id}
                className="w-[30%] h-[50vh] rounded-lg border-2 p-5 flex flex-col justify-between transition-all duration-500"
                style={{ backgroundColor: getRandomColor() }}
              >
                <div>
                  <h1 className="author">{item.author}</h1>
                  <h1 className="title font-bold text-4xl">{item.title}</h1>
                  <p className="content">{item.content}</p>
                </div>
                <Link
                  href="/Create_Posts"
                  className="flex justify-between bg-rose-200 p-2 rounded-lg"
                >
                  <button className="text-black px-4 py-2 rounded-lg hover:bg-slate-100">
                    Edit
                  </button>
                  <button className="text-black px-4 py-2 rounded-lg hover:bg-slate-100">
                    Delete
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
