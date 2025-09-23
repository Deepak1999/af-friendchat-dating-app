import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import wlcmDash from '../Images/message_dash.png'

const Welcome = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/signup');
    };

    return (
        <div className='container first'>
            <div className="welcome-content">
                <div className="logo-container">
                    <div className="logo-icon">
                        {/* <svg xmlns={wlcmDash} viewBox="0 0 512 512">
                            <path d="{wlcmDash}" />
                        </svg> */}
                        <img src={wlcmDash} className='img-fluid'></img>
                    </div>
                    <div className="logo-text">
                        <div className="orange-brand">
                            orange<sup style={{ fontSize: "10px", verticalAlign: "super" }}>TM</sup>
                        </div>
                        <div className="friendz-chat">Friendz Chat</div>
                    </div>
                </div>

                <div className="bottom-button">
                    <button onClick={handleContinue}>Continue</button>
                </div>

            </div>
        </div>
    );
};

export default Welcome;