import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';

function App() {
    const [formData, setFormData] = useState({});

    const handleLogin = async (credentials, navigate) => {
        try {
            const res = await fetch("http://localhost:5001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            if (res.ok) {
                navigate("/dashboard");
            } else {
                const err = await res.json();
                alert("Login failed: " + err.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Could not log in.");
        }
    };

    const handleFinalSubmit = () => {
        console.log("Submitted Data:", formData);
        alert("🎉 Signup complete!");
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/login"
                    element={
                        <LoginPage
                            onLogin={handleLogin}
                            goToSignUp={(navigate) => navigate('/signup/step1')}
                            onGoogleSuccess={(navigate) => navigate('/dashboard')}
                        />
                    }
                />
                <Route
                    path="/signup/step1"
                    element={
                        <Step1
                            formData={formData}
                            setFormData={setFormData}
                        />
                    }
                />
                <Route
                    path="/signup/step2"
                    element={
                        <Step2
                            formData={formData}
                            setFormData={setFormData}
                        />
                    }
                />
                <Route
                    path="/signup/step3"
                    element={
                        <Step3
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleFinalSubmit}
                        />
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/planning" element={<Planning />} />
            </Routes>
        </Router>
    );
}

export default App;
