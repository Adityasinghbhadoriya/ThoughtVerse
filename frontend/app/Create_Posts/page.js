"use client";

import React, { useEffect, useState } from "react";
import { createBlog, UpdateBlogById, DeleteBlogsById, getBlogs } from "@/app/api";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [UpdateBlog, setUpdateBlog] = useState(null);

  // Fetch Blogs on Component Mount
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // Set form data when editing
  useEffect(() => {
    if (UpdateBlog) {
      setFormData({
        title: UpdateBlog.title || "",
        author: UpdateBlog.author || "",
        content: UpdateBlog.content || "",
      });
    }
  }, [UpdateBlog]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (UpdateBlog) {
        // Update Existing Blog
        await UpdateBlogById(UpdateBlog._id, formData);
      } else {
        // Create New Blog
        await createBlog(formData);
      }
      fetchAllBlogs();
      setFormData({ title: "", author: "", content: "" });
      setUpdateBlog(null); // Reset after updating
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlogs = async (id) => {
    try {
      await DeleteBlogsById(id);
      fetchAllBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pt-24 animated-background">
      <div className="max-w-4xl mx-auto p-10">
        {/* Form Section */}
        <h1 className="text-5xl font-bold mb-10 text-black">
          {UpdateBlog ? "EDIT BLOG POST" : "CREATE A BLOG POST"}
        </h1>
        <form>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border-2 w-full h-10 p-2 rounded mb-5 bg-white"
          />
          <br />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="border-2 w-full h-10 p-2 rounded mb-5 bg-white"
          />
          <br />
          <textarea
            name="content"
            rows="4"
            value={formData.content}
            onChange={handleChange}
            className="border-2 w-full h-40 p-2 rounded mb-5 bg-white"
            placeholder="Write your blog here..."
          ></textarea>
          <br />
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {UpdateBlog ? "Update Blog" : "Publish Blog"}
          </button>
        </form>

        {/* Blog Posts Section */}
        <div className="mt-20  p-10 rounded-lg">
          <h1 className="text-5xl font-bold mb-10 text-black">BLOG POSTS</h1>
          {blogs.map((item) => (
            <div key={item._id} className="w-full h-36 rounded-lg border-2 p-5 mb-5 flex justify-between bg-gradient-to-r from-yellow-900 to-white text-white">
              <div>
                <h1 className="author">{item.author}</h1>
                <h1 className="title font-bold text-4xl">{item.title}</h1>
                <p className="content">{item.content}</p>
              </div>
              <div className="bg-yellow-500 mb-14 rounded-lg">
                <button onClick={() => setUpdateBlog(item)} className="text-black px-2 py-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDeleteBlogs(item._id)} className="text-black px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
