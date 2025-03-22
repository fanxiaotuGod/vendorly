import React, { useState } from 'react';

export default function Step3({ formData, setFormData, prevStep, onSubmit }) {
    const [firstName, setFirstName] = useState(formData.firstName || "");
    const [lastName, setLastName] = useState(formData.lastName || "");
    const [password, setPassword] = useState(formData.password || "");
    const [email, setEmail] = useState(formData.email || "");

    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = () => {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address.";
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setFormData({
                ...formData,
                firstName,
                lastName,
                password,
                email
            });
            onSubmit();
        }
    };

    return (
        <div className="min-h-screen flex items-stretch">
            {/* Left: Form */}
            <div className="w-full md:w-1/2 bg-white relative px-6 min-h-screen overflow-hidden max-w-md mx-auto flex flex-col">
                {/* Logo and Progress Bar */}
                <div className="text-lg font-bold pt-16 pl-2 mb-8">vendorly</div>
                <div className="pl-2 mb-8">
                    <div className="flex gap-4">
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-black" />
                    </div>
                </div>

                {/* Main content */}
                <div className="pt-8 pb-28 max-w-md">
                    <h2 className="text-xl font-semibold mb-6 text-left">Create your account</h2>

                    {/* First & Last Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Full name</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={firstName}
                                onChange={e => {
                                    setFirstName(e.target.value);
                                    setErrors({ ...errors, firstName: "" });
                                }}
                                placeholder="First name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={e => {
                                    setLastName(e.target.value);
                                    setErrors({ ...errors, lastName: "" });
                                }}
                                placeholder="Last name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        {(errors.firstName || errors.lastName) && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName || errors.lastName}
                            </p>
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
                                setErrors({ ...errors, password: "" });
                            }}
                            placeholder="Enter at least 8 characters"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-6">
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
                </div>

                {/* Navigation buttons (fixed bottom right) */}
                <div className="absolute bottom-10 right-6 flex gap-4">
                    <button
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                    >
                        &lt; Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
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
