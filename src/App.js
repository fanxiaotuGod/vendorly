import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

function App() {
    const [screen, setScreen] = useState("login"); // "login", "signup-step1", "signup-step2", "signup-step3"
    const [formData, setFormData] = useState({});

    const goToStep = (step) => setScreen(step);

    const handleNextStep = () => {
        if (screen === "signup-step1") setScreen("signup-step2");
        else if (screen === "signup-step2") setScreen("signup-step3");
    };

    const handlePrevStep = () => {
        if (screen === "signup-step3") setScreen("signup-step2");
        else if (screen === "signup-step2") setScreen("signup-step1");
    };

    const handleFinalSubmit = () => {
        console.log("Submitted Data:", formData);
        alert("🎉 Signup complete!");
        setScreen("login"); // Optionally return to login after signup
    };

    const handleLogin = (credentials) => {
        console.log("Login Attempt:", credentials);
        alert("✅ Logged in!");
        // TODO: Authenticate with backend
    };

    return (
        <>
            {screen === "login" && (
                <LoginPage
                    onLogin={handleLogin}
                    goToSignUp={() => setScreen("signup-step1")}
                />
            )}

            {screen === "signup-step1" && (
                <Step1
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={handleNextStep}
                    prevStep={() => setScreen("login")} // 👈 Go back to login
                />
            )}


            {screen === "signup-step2" && (
                <Step2
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={handleNextStep}
                    prevStep={handlePrevStep}
                />
            )}

            {screen === "signup-step3" && (
                <Step3
                    formData={formData}
                    setFormData={setFormData}
                    prevStep={handlePrevStep}
                    onSubmit={handleFinalSubmit}
                />
            )}
        </>
    );
}

export default App;
