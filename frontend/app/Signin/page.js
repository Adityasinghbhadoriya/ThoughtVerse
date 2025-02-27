'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../utils';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    try {
        const res = await fetch(`${API_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
    
        const data = await res.json();
        setMessage(data.message);
    
        if (res.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        }
      } catch (error) {
        setMessage('Signup failed. Try again.');
      }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-screen flex justify-center items-center text-white">
      <motion.div
        ref={formRef}
        className="w-[30vw] bg-white text-black rounded-xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl text-center font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['username', 'email', 'password'].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full h-12 p-3 rounded-lg border-2 bg-white text-black ${
                  errors[field] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-400 outline-none`}
                autoComplete="off"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>
        {message && <p className="text-center mt-3 text-green-600 font-semibold">{message}</p>}
        <div className="flex justify-center mt-4 text-gray-600">
          <p>Already have an account?</p>
          <Link href="/Login" className="text-blue-500 ml-1 hover:underline">Login</Link>
        </div>
      </motion.div>
    </div>
  );
}
