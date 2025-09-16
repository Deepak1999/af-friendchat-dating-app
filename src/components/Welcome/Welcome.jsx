import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/signup');
    };

    return (
        <div className="welcome-content">
            <div className="logo-container">
                <div className="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 0C461.7 0 512 40.33 512 96V320C512 375.7 461.7 416 416 416H160L0 512V96C0 40.33 40.33 0 96 0H416z" />
                    </svg>
                </div>
                <div className="logo-text">
                    <div className="orange-brand">
                        orange<sup style={{ fontSize: "0.6em", verticalAlign: "super" }}>TM</sup>
                    </div>
                    <div className="friendz-chat">Friendz Chat</div>
                </div>
            </div>

            <div className="bottom-button">
                <button onClick={handleContinue}>Continue</button>
            </div>

        </div>
    );
};

export default Welcome;