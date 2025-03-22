import React, { useState } from 'react';

const restaurantTypes = ["Casual Dining", "Fine Dining", "Cloud Kitchen", "Café", "Other"];
const budgets = ["<95k", "95k - 150k", "150k - 250k", "250k - 400k", "400k - 600k", "600k - 800k", "800k - 1M", "1M+", "Other"];

export default function Step1({ formData, setFormData, nextStep, prevStep }) {
    const [selectedType, setSelectedType] = useState(formData.restaurantType || "");
    const [selectedBudget, setSelectedBudget] = useState(formData.budget || "");

    const handleNext = () => {
        setFormData({
            ...formData,
            restaurantType: selectedType,
            budget: selectedBudget
        });
        nextStep();
    };

    const buttonStyle = (selected, value) =>
        `px-4 py-2 rounded-full border mr-2 mb-2 transition
     ${selected === value ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`;

    return (
        <div className="min-h-screen flex items-stretch">
            {/* Left panel: form content */}
            <div className="w-full md:w-1/2 bg-white relative px-6 min-h-screen overflow-hidden max-w-md mx-auto">
                {/* Progress bar (fixed top) */}
                <div className="text-lg font-bold pt-16 pl-2 mb-8">vendorly</div>

                <div className="pl-2">
                    <div className="flex gap-4">
                        <div className="w-36 h-1 rounded bg-black"/>
                        <div className="w-36 h-1 rounded bg-gray-300"/>
                        <div className="w-36 h-1 rounded bg-gray-300"/>
                    </div>
                </div>


                {/* Main content */}
                <div className="pt-16 pb-28 max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-2">What type of restaurant are you opening?</h2>
                    <div className="flex flex-wrap mb-6">
                        {restaurantTypes.map(type => (
                            <button
                                key={type}
                                className={buttonStyle(selectedType, type)}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold mb-2">What’s your restaurant budget?</h2>
                    <div className="flex flex-wrap">
                        {budgets.map(b => (
                            <button
                                key={b}
                                className={buttonStyle(selectedBudget, b)}
                                onClick={() => setSelectedBudget(b)}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Next button (fixed bottom) */}
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

            {/* Right panel: illustration */}
            <div className="hidden md:flex w-1/2 bg-[#035CBA] items-center justify-center p-10">
                <div className="text-center max-w-sm">
                    <img src="/step1.svg" alt="Illustration" className="w-full"/>
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
