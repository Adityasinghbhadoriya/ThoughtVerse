'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { API_URL } from '../utils';

export default function Page() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  
  const validate = () => {
    let newErrors = {};
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
      const res = await fetch(`${API_URL}/user/login`, {
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
      setMessage('Login failed. Try again.');
    }
  };

  return (
    <div className='bg-white w-full h-screen flex justify-center items-center text-black'>
      <div className='w-[25vw] bg-white rounded-xl border-4 p-8 shadow-lg'>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='mt-8'>
          <input 
            type='email' 
            name='email' 
            placeholder='Email' 
            value={formData.email} 
            onChange={handleChange} 
            className={`bg-white border-2 w-full h-10 rounded-lg p-2 mt-4 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            value={formData.password} 
            onChange={handleChange} 
            className={`bg-white border-2 w-full h-10 rounded-lg p-2 mt-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          
          <button 
            type='submit' 
            className='bg-blue-500 text-white px-4 py-2 rounded w-full mt-5 hover:bg-blue-600'
          >
            Login
          </button>
        </form>
        {message && <p className='text-center mt-3 text-green-600 font-semibold'>{message}</p>}
        <div className='flex justify-center mt-4 text-gray-600'>
          <p>Don't have an account?</p>
          <Link href='/signup' className='text-blue-500 ml-1 hover:underline'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
