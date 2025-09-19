import React, { useState } from 'react';
import './Mobile.css';
import { useNavigate } from 'react-router-dom';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';
import { toast, ToastContainer } from 'react-toastify';

const Mobile = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');

    const handleContinue = () => {
        navigate('/signup');
    };

    const handleOtpContinue = async () => {
        if (!mobileNumber || mobileNumber.length !== 10) {
            toast.warning("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            const response = await fetch(`${ApiBaseUrl}/auth-manager/api/auth/v1/pin-generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobileNumber })
            });

            const data = await response.json();

            if (data?.statusDescription?.statusCode === 200) {
                localStorage.setItem('transactionId', data.transactionId);
                localStorage.setItem('mobileNumber', data.mobileNumber); // optional

                navigate('/m-otp');
            } else {
                toast.warning(data?.statusDescription?.statusMessage || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            toast.error('Error sending OTP:', error);
        }
    };

    return (
        <div className="container-main">
            <div className="back-button">
                <i className="bi bi-chevron-left" onClick={handleContinue}></i>
            </div>
            <h4 className="page-title">Can we get your number</h4>
            <div className="phone-input-group">
                <div className="country-code-dropdown">
                    <span className="country-flag">🇮🇳</span>
                    <span className="country-code">(+91)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" className="bi bi-chevron-down ms-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <input
                    type="number"
                    className="phone-input"
                    placeholder="XXXXXXXXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>

            <p className="info-text">
                We'll text you a code to verify you're really you.<br />
                Message and data rates may apply. <a href="#">What happens if your number changes?</a>
            </p>

            <div className="d-grid">
                <button className="btn btn-continue" onClick={handleOtpContinue}>Get OTP</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Mobile;