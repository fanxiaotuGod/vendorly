import React, { useState } from 'react';

const provinces = [
    "Manitoba", "Ontario", "Alberta", "Nova Scotia", "New Brunswick",
    "British Columbia", "Nunavut", "Yukon", "Newfoundland and Labrador"
];

export default function Step2({ formData, setFormData, nextStep, prevStep }) {
    const [selectedProvince, setSelectedProvince] = useState(formData.province || "");
    const [restaurantName, setRestaurantName] = useState(formData.restaurantName || "");

    const handleNext = () => {
        setFormData({
            ...formData,
            province: selectedProvince,
            restaurantName: restaurantName,
        });
        nextStep();
    };

    const buttonStyle = (selected, value) =>
        `px-4 py-2 rounded-full border mr-2 mb-2 transition
     ${selected === value ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`;

    return (
        <div className="min-h-screen flex items-stretch">
            {/* Left: Form */}
            <div className="w-full md:w-1/2 bg-white relative px-6 min-h-screen overflow-hidden max-w-md mx-auto flex flex-col">
                {/* Logo and Progress Bar */}
                <div className="text-lg font-bold pt-16 pl-2 mb-8">vendorly</div>
                <div className="pl-2 mb-8">
                    <div className="flex gap-4">
                        <div className="w-36 h-1 rounded bg-gray-300" />
                        <div className="w-36 h-1 rounded bg-black" />
                        <div className="w-36 h-1 rounded bg-gray-300" />
                    </div>
                </div>

                {/* Main content */}
                <div className="pt-8 pb-28 max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-2">Where is your restaurant based?</h2>
                    <div className="flex flex-wrap mb-6">
                        {provinces.map(p => (
                            <button
                                key={p}
                                className={buttonStyle(selectedProvince, p)}
                                onClick={() => setSelectedProvince(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold mb-2">Have you decided on a restaurant name?</h2>
                    <input
                        type="text"
                        placeholder="Enter name (optional)"
                        value={restaurantName}
                        onChange={e => setRestaurantName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
                    />
                </div>

                {/* Navigation buttons */}
                <div className="absolute bottom-10 right-6 flex gap-4">
                    <button
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                    >
                        &lt; Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden md:flex w-1/2 bg-[#035CBA] items-center justify-center p-10">
                <div className="text-center max-w-sm">
                    <img src="/step1.svg" alt="Illustration" className="w-full" />
                    <h3 className="text-md text-white font-semibold mt-4">CONSULTANT NETWORK</h3>
                    <p className="text-sm text-white mt-1">
                        Put an end to hiring consultants by researching yourself to death.
                        Our platform has a centralized ecosystem of highly specialized consultants in bookkeeping,
                        real estate, construction, law, and more.
                    </p>
                </div>
            </div>
        </div>
    );
}
