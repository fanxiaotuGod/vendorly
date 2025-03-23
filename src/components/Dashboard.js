import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const checklistItems = [
    {
        title: 'Complete restaurant business plan',
        completed: true,
    },
    {
        title: 'Choose a prime location',
        completed: true,
    },
    {
        title: 'Create menu plan and decide on costs',
        completed: true,
    },
    {
        title: 'Acquire capital to fund your restaurant',
        completed: false,
        details: [
            { title: 'Secure Grants', desc: 'Many grants have specific criteria, so take time to find one you’re eligible for.' },
            { title: 'Obtain a Business Loan', desc: 'Banks and credit unions provide small business loans.' },
            { title: 'Private Investors', desc: 'Get angel investors to fund your restaurant.' },
        ],
    },
    {
        title: 'Obtain restaurant licenses and permits',
        completed: false,
        details: [
            {
                name: 'Business Licence',
                url: 'https://cov.service-now.com/csp?id=csp_registration',
            },
            {
                name: 'Business Number Registration',
                url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/bro-register.html',
            },
            {
                name: 'BC Business Registration',
                url: 'https://www.names.bcregistry.gov.bc.ca/#iss=https%3A%2F%2Floginproxy.gov.bc.ca%2Fauth%2Frealms%2Fbcregistry',
            },
            {
                name: 'Liquor',
                url: 'https://justice.gov.bc.ca/lcrb/',
            },
            {
                name: 'Food Safety',
                url: 'https://www.vch.ca/en/service/food-service-permits-health-approvals#step-step--152656',
            },
            {
                name: 'Building and Renovating Permit',
                url: 'https://vancouver.ca/home-property-development/commercial-renovation-centre.aspx',
            },
        ],
    }
    ,
    {
        title: 'Hire qualified kitchen staff with experience',
        completed: false,
    },
];

export default function DashBoard() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-[#035CBA] text-white p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8">vendorly</h1>
                    <nav className="space-y-4">
                        <div className="flex items-center space-x-2 font-semibold">
                            <img src="/dashboard.svg" alt="Dashboard Icon" className="w-5 h-5"/>
                            <span>Dashboard</span>
                        </div>
                        <Link to="/planning" className="flex items-center space-x-2">
                            <img src="/planning.svg" className="w-5 h-5"/>
                            <span>Planning</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <img src="/relaunch.svg" alt="Pre-Launch Icon" className="w-5 h-5"/>
                            <span>Pre-Launch</span>
                        </div>

                    </nav>
                </div>
                <div className="text-sm text-blue-100">⚙ Settings</div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

                <h2 className="text-2xl font-bold">Restaurant Set Up Checklist</h2>
                <p className="text-gray-500">This dashboard is where you will find the latest updates and requirements
                    for your restaurant establishment.</p>

                {/* Checklist */}
                <div className="space-y-3">
                    {checklistItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg border ${
                                item.completed
                                    ? 'bg-green-100 border-green-200'
                                    : 'bg-purple-50 border-purple-200'
                            }`}
                        >
                            <button
                                onClick={() => toggleItem(idx)}
                                className="w-full flex justify-between items-center p-4 text-left"
                            >
                                <div className="flex items-center space-x-3">
                                    {item.completed ? (
                                        <span className="text-green-600 text-xl">✔️</span>
                                    ) : item.details ? (
                                        <span className="text-gray-600 text-xl">⭕</span>
                                    ) : (
                                        <span className="text-red-400 text-xl">➖</span>
                                    )}
                                    <span className="font-semibold">{item.title}</span>
                                </div>
                                <span className="text-gray-500 text-xl">{openIndex === idx ? '▾' : '▸'}</span>
                            </button>

                            {/* Dropdown content */}
                            {openIndex === idx && item.details && (
                                <div className="px-8 pb-4 text-sm text-gray-700 space-y-2">
                                    {item.details.map((detail, i) => {
                                        // Funding format (title + desc)
                                        if (detail.title && detail.desc) {
                                            return (
                                                <div key={i} className="text-gray-700 text-sm mb-2 px-4">
                                                    <strong>{i + 1}. {detail.title}:</strong> {detail.desc}
                                                </div>
                                            );
                                        }

                                        // License format (name + url)
                                        if (detail.name && detail.url) {
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm border border-gray-100 mb-2"
                                                >
                                                    <span className="font-medium">{i + 1}. {detail.name}</span>
                                                    <a
                                                        href={detail.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                                                    >
                                                        Apply
                                                    </a>
                                                </div>
                                            );
                                        }

                                        // Default fallback
                                        return (
                                            <div key={i} className="text-gray-500 text-sm italic px-4">
                                                {i + 1}.
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 px-6 py-8 space-y-6">
                {/* Consultants */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h3 className="font-bold text-lg mb-3">👤 Consultants</h3>
                    <ul className="text-sm space-y-2">
                        <li><strong>Chris P. Watson</strong><br/>Texas, 7 Years Experience</li>
                        <li><strong>Michael M. Davis</strong><br/>Massachusetts, 9 Years Experience</li>
                        <li><strong>Johnny Smith</strong><br/>Toronto, 5 Years Experience</li>
                        <li><strong>Carolina K. Williams</strong><br/>New York, 6 Years Experience</li>
                    </ul>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 p-4 shadow rounded-lg text-sm">
                    <h3 className="font-bold mb-2">💡 Tips</h3>
                    <p>Common restaurant licenses include business permits, food handler certifications, health and
                        insurance permits, and liquor licenses for bars. Before applying, confirm that your restaurant
                        location is properly zoned for commercial food service.</p>
                </div>
            </div>
        </div>
    );
}
