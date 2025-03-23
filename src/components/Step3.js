import React, { useState } from 'react';

export default function Step3({ formData, setFormData, prevStep, onSubmit }) {
    const [firstName, setFirstName] = useState(formData.firstName || "");
    const [lastName, setLastName] = useState(formData.lastName || "");
    const [password, setPassword] = useState(formData.password || "");
    const [email, setEmail] = useState(formData.email || "");
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async () => {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address.";
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const payload = {
                firstName,
                lastName,
                email,
                password
            };

            try {
                const res = await fetch('http://localhost:5001/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',  // Allows cookies and credentials to be sent.
                    body: JSON.stringify(payload),
                });

                if (res.ok) {
                    console.log('✅ Registration successful');
                    onSubmit();
                } else {
                    const err = await res.json();
                    alert('❌ Registration failed: ' + err.message);
                }
            } catch (err) {
                console.error(err);
                alert('❌ Server error.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-stretch">
            {/* Left: Form */}
            <div className="w-full md:w-1/2 bg-white relative px-6 min-h-screen overflow-hidden max-w-md mx-auto flex flex-col">
                <div className="text-lg font-bold pt-16 pl-2 mb-8">vendorly</div>
                <div className="pl-2 mb-8">
                    <div className="flex gap-4">
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-black" />
                    </div>
                </div>
                <div className="pt-8 pb-8 max-w-md">
                    <h2 className="text-xl font-semibold mb-6 text-left">Create your account</h2>
                    {/* First & Last Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">First name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => {
                                setFirstName(e.target.value);
                                setErrors({ ...errors, firstName: "" });
                            }}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => {
                                setLastName(e.target.value);
                                setErrors({ ...errors, lastName: "" });
                            }}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: "" });
                            }}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: "" });
                            }}
                            placeholder="Enter at least 8 characters"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">OR</span>
                        </div>
                    </div>
                    {/* Google Login Removed */}
                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        By signing up, you agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
            {/* Right: Illustration side */}
            <div className="hidden md:flex w-1/2 bg-[#035CBA] items-center justify-center p-10">
                <div className="text-center max-w-sm">
                    <img src="/step1.svg" alt="Illustration" className="w-full" />
                    <h3 className="text-md text-white font-semibold mt-4">ENHANCE PRODUCTIVITY</h3>
                    <p className="text-sm text-white mt-1">
                        It takes 8 to 12 months to open a restaurant through consulting services.
                        We help streamline restaurant operations to reduce the average time taken
                        to open an F&amp;B establishment.
                    </p>
                </div>
            </div>
        </div>
    );
}
