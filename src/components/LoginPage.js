import React, { useState } from 'react';

export default function LoginPage({ onLogin, goToSignUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = () => {
        const newErrors = {};
        if (!isValidEmail(email)) newErrors.email = "Please enter a valid email.";
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onLogin({ email, password });
        }
    };

    return (
        <div className="min-h-screen flex items-stretch">
            {/* Left: Login Form */}
            <div className="w-full md:w-1/2 bg-white relative px-6 min-h-screen overflow-hidden max-w-md mx-auto flex flex-col">
                {/* Logo and Progress Bar */}
                <div className="text-lg font-bold pt-16 pl-2 mb-8">vendorly</div>

                {/* Fake Progress Bar */}
                <div className="pl-2 mb-8">
                    <div className="flex gap-4">
                        <div className="w-36 h-1 rounded bg-black" />
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-gray-300" />
                    </div>
                </div>

                {/* Login Form */}
                <div className="pt-8 pb-28 max-w-md">
                    <h2 className="text-xl font-semibold mb-6 text-left">Welcome Back</h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: '' });
                            }}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: '' });
                            }}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full px-6 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>

                    {/* Create Account Link */}
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={goToSignUp}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Create account
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Illustration side */}
            <div className="hidden md:flex w-1/2 bg-[#035CBA] items-center justify-center p-10">
                <div className="text-center max-w-sm">
                    <img src="/step1.svg" alt="Illustration" className="w-full" />
                    <h3 className="text-md text-white font-semibold mt-4">WELCOME BACK</h3>
                    <p className="text-sm text-white mt-1">
                        Log in to streamline your restaurant operations and manage your business more efficiently with vendorly.
                    </p>
                </div>
            </div>
        </div>
    );
}
