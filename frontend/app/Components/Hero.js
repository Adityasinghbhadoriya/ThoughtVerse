"use client";

import React, { useEffect, useState } from "react";
import { getBlogs } from "../api";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./LoadingSpinner";

gsap.registerPlugin(ScrollTrigger);

export default function () {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  // Fetch Blogs on Component Mount
  useEffect(() => {
    fetchAllBlogs();

    // ScrollTrigger Animation for Sections After Hero
    gsap.utils.toArray(".anim").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 100, opacity: 0 }, // Initially out of view and hidden
        {
          y: 0, opacity: 1, // Slide to normal position and fade in
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // Start animation when the section is 80% from the top of the viewport
            end: "top 30%", // End when it’s 30% from the top of the viewport
            scrub: 0.5, // Smooth animation on scroll
          },
          stagger: 0.1, // Adds a slight delay between each section's animation
        }
      );
    });

    // Hero Section Animation for Text and Image
    gsap.fromTo(
      ".hero-text",
      { x: -200, opacity: 0 }, // Starts off the screen to the left
      {
        x: 0, opacity: 1, // Ends at its normal position
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".hero-img",
      { x: 200, opacity: 0 }, // Starts off the screen to the right
      {
        x: 0, opacity: 1, // Ends at its normal position
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".hero-title",
      { y: 100, opacity: 0 }, // Initially below the viewport and hidden
      {
        y: 0, opacity: 1, duration: 1.5, delay: 0.7, ease: "bounce.out", // Bouncing effect for title
      }
    );
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // In case of an error, stop loading
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
    <>
      {loading && <Loader />} {/* Show loading spinner while loading */}
      <div className="bg-white text-black animated-background">
        {/* Hero Section */}
        <div className="hero w-full h-screen flex justify-between">
          {/* Text Block */}
          <h1 className="text-8xl font-bold ml-16 mt-44 hero-text ">
            Thoughts,<br /> Stories and<br /> Everything in Between.
          </h1>

          {/* Image Block */}
          <div className="hero-img mr-10 mt-5 ">
            <img
              src="https://file.aiquickdraw.com/m/1739937908_b803b3af0b88425ebd2f19cafab74ba4.png"
              alt="hero-img"
              className="rounded-full w-[40vw] h-[40vw]"
            />
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="p-10 rounded-lg anim">
          <h1 className="text-7xl font-bold mb-10 ml-14">BLOG POSTS</h1>
          <div className="flex flex-wrap gap-5 justify-center">
            {blogs.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="w-[30%] h-[50vh] rounded-lg border-2 p-5 text-black flex flex-col justify-between"
                style={{ backgroundColor: getRandomColor() }} // Assigns a random color
              >
                <div>
                  <h1 className="author">{item.author}</h1>
                  <h1 className="title font-bold text-4xl">{item.title}</h1>
                  <p className="content">{item.content}</p>
                </div>

                <Link href='/Create_Posts' className="flex justify-between bg-rose-200 p-2 rounded-lg">
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
        </div>

        {/* Text Area */}
        <div className="flex gap-14 ml-20 mt-44 anim">
          <p className="text-5xl">
            Welcome to a space where ideas come to life! Our<br /> blog website is more than just a collection of posts—<br />
            it's a hub for thoughts, stories, and insights that spark<br /> conversations. Whether you're here for deep dives into<br />
            tech, creative inspirations, or personal reflections,<br /> every article is crafted to engage, inform, and inspire.
          </p>
          <img
            src="https://img.freepik.com/free-photo/3d-rendering-cartoon-like-woman-standing-sofa_23-2150797534.jpg?t=st=1739267087~exp=1739270687~hmac=cf36b2059c9b11bf1ff91e4a42ab1540b6811be0dabd9b8e9f048ddb2b899582&w=996"
            className="w-[29%] h-[35%] rounded-lg"
            alt="blog-banner"
          />
        </div>

        <div className="flex justify-center items-center mt-24 anim">
          <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png" className="rounded-lg w-[80vw]" />
        </div>

        <div className="flex justify-center items-center mt-24 ml-20 mr-20 bg-gray-300 py-16 px-10 rounded-lg shadow-lg anim">
          {/* Left Content */}
          <div className="w-1/2">
            <h2 className="text-6xl font-bold mb-6">Want to Share Your Ideas?</h2>
            <p className="text-lg mb-6">
              Have an interesting story, thought, or insight to share? Join our community of writers and start blogging today!
            </p>
            <Link href="/Create_Posts">
            
              <button
                class="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
              >
                <span
                  class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                >
                  <span
                    class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                >
                  <span
                    class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                  ></span>
                </span>
                <span
                  class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                  class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                >Get Started</span>
              </button>

            </Link>
          </div>

          {/* Right Image */}
          <div className="w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/content-writer-concept-illustration_114360-2443.jpg"
              alt="Write Blog"
              className="w-[50%] rounded-lg"
            />
          </div>
        </div>

        <div className="footer w-full h-20 bg-black text-white flex justify-center items-center mt-40">
          <h1 className="text-2xl">© 2021 Blogify. All Rights Reserved.</h1>
        </div>
      </div>
    </>
  );
}
