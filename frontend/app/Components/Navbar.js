"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './CreatePostButton';
import Logoutbutton from './LoginButton';
import SigninButton from './SigninButton';
import Logo from './Logo';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div className='navbar ml-[10vw] text-black h-16 flex justify-between items-center mt-5 bg-gray-400 rounded-full w-[80vw] fixed backdrop-blur bg-opacity-0 z-10'>   
      <Link className='logo ml-20 text-3xl font-bold  px-4 py-1 rounded-lg' href='/'><Logo/></Link>
      <div className='menu text-2xl'>
        <ul className='flex'>
          <Link className='mr-5 hover:bg-slate-200 px-4 py-1 rounded-lg' href='/'>Home</Link>
          <Link className='mr-5 hover:bg-slate-200 px-4 py-1 rounded-lg' href='/Posts'>Posts</Link>
          <Link className='mr-5 hover:bg-slate-200 px-4 py-1 rounded-lg' href='/Contact'>Contact</Link>
        </ul>
      </div>
      
      <div className="buttons mr-20">
          {isLoggedIn && (
            <Link href="/Create_Posts">
              <Button/>
            </Link>
          )}

        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className=' text-white px-[1rem] py-[0.4rem] rounded-full'
          >
            <Logoutbutton/>
          </button>
        ) : (
          <Link href="/Signin">
            <button className=' text-white px-[1rem] py-[0.4rem] rounded-full'>
             <SigninButton/>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
