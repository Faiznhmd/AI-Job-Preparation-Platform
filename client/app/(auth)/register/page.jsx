'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      dispatch(setLoading(true));

      const res = await registerUser(form);

      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      localStorage.setItem('token', res.data.token);

      dispatch(setLoading(false));

      router.push('/dashboard');
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create Account
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Register
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{' '}
          <span
            className="text-gray-900 cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
