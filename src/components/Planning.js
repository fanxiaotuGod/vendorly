import React from 'react';
import { Link } from 'react-router-dom';
export default function Planning() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Sidebar */}
            <div className="w-64 bg-[#035CBA] text-white p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8">vendorly</h1>
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="flex items-center space-x-2 font-semibold">
                            <img src="/dashboard.svg" className="w-5 h-5"/>
                            <span>Dashboard</span>
                        </Link>

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

                {/* Section 1: Recent Documents */}
                <section>
                    <h2 className="text-2xl font-bold">Recent Documents</h2>
                    <p className="text-gray-500 mb-4">To fast track your restaurant compliance and plan your
                        paperwork.</p>
                    <div className="bg-white rounded-lg shadow p-4 overflow-auto">
                        <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                            <thead className="text-left text-gray-600 border-b">
                            <tr className="bg-gray-100">
                                <th className="p-2">Document Name</th>
                                <th className="p-2">Document Details</th>
                                <th className="p-2">Assignees</th>
                                <th className="p-2">Date</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {[
                                {
                                    name: 'Restaurant Business Plan',
                                    detail: 'Executive summary, company description, market analysis, marketing strategy, and financial projections.',
                                    assignees: ['A', 'K', 'C'],
                                    date: '2024-10-06',
                                },
                                {
                                    name: "Food Handler’s Permit",
                                    detail: 'Complete BC-approved food safety training course such as FOODSAFE Level 1.',
                                    assignees: ['D', 'C'],
                                    date: '2024-11-09',
                                },
                                {
                                    name: 'Due Diligence and Contingencies',
                                    detail: 'Covers financial performance, legal compliance, operational aspects, and market analysis.',
                                    assignees: ['K', 'A', 'D'],
                                    date: '2024-11-19',
                                },
                                {
                                    name: 'Key Lease Provisions and Term Sheets',
                                    detail: 'Acquisition or financing for negotiations before a legally binding agreement is finalized.',
                                    assignees: ['C'],
                                    date: '2025-02-04',
                                },
                                {
                                    name: 'Customer Traffic Data Report',
                                    detail: 'Analyzes the number of customers entering a physical retail location or website.',
                                    assignees: ['D', 'K'],
                                    date: '2025-03-07',
                                },
                            ].map((doc, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-2 font-medium">{doc.name}</td>
                                    <td className="p-2">{doc.detail}</td>
                                    <td className="p-2 flex space-x-2">
                                        {doc.assignees.map((a, i) => (
                                            <span
                                                key={i}
                                                className="w-6 h-6 rounded text-white text-xs font-bold flex items-center justify-center"
                                                style={{
                                                    backgroundColor:
                                                        a === 'A' ? '#EF4444' :
                                                            a === 'K' ? '#22C55E' :
                                                                a === 'C' ? '#8B5CF6' :
                                                                    a === 'D' ? '#EAB308' :
                                                                        '#999',
                                                }}
                                            >
                          {a}
                        </span>
                                        ))}
                                    </td>
                                    <td className="p-2">{doc.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 2: Experts Hired */}
                <section>
                    <h2 className="text-2xl font-bold">Experts Hired</h2>
                    <p className="text-gray-500 mb-4">Shows the experts onboarded, to represent the consultants
                        contributing to your restaurant’s growth and success.</p>
                    <div className="bg-white rounded-lg shadow p-4 overflow-auto">
                        <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                            <thead className="text-left text-gray-600 border-b">
                            <tr className="bg-gray-100">
                                <th className="p-2">Experts</th>
                                <th className="p-2">Task Assigned</th>
                                <th className="p-2">Stage</th>
                                <th className="p-2">Date</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {[
                                {
                                    name: 'Carmelita Abadian',
                                    task: 'Restaurant Insurance Brokerage: Contamination insurance, BOP, liquor liability, and food spoilage.',
                                    stage: 3,
                                    date: '2023-11-17',
                                },
                                {
                                    name: 'William Paul Ackman',
                                    task: 'Remodeling and Construction Contractor: Kitchen equipment, general construction, and electrical procedures.',
                                    stage: 2,
                                    date: '2024-03-02',
                                },
                                {
                                    name: 'Paul Graham',
                                    task: 'Real Estate Broker and Bookkeeper: Audits, budgets, forecasts, private listings, and taxes.',
                                    stage: 4,
                                    date: '2024-06-13',
                                },
                                {
                                    name: 'Bernardo Frizoni',
                                    task: 'Restaurant Lawyer: Drafting contracts, managing disputes, ensuring regulatory compliance, and advising.',
                                    stage: 1,
                                    date: '2025-02-16',
                                },
                            ].map((expert, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-2 font-medium">{expert.name}</td>
                                    <td className="p-2">{expert.task}</td>
                                    <td className="p-2 flex items-center space-x-1">
                                        {[1, 2, 3, 4].map((dot) => (
                                            <span
                                                key={dot}
                                                className={`w-3 h-3 rounded-full ${
                                                    dot <= expert.stage ? 'bg-black' : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </td>
                                    <td className="p-2">{expert.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
