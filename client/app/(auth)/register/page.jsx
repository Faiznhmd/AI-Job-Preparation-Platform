'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        // ✅ FIXED
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      dispatch(loginSuccess(data));
      localStorage.setItem('token', data.token);

      router.push('/dashboard');
    } catch (err) {
      console.error('REGISTER ERROR:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl w-96 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold mb-4"
        >
          Register
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
