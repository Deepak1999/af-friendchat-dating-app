import React, { useState, useRef } from 'react';
import './Otp.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleBackContinue = () => {
        navigate('/login-mobile');
    };

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        alert('OTP Resent!');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const handleContinue = async () => {
        const fullOtp = otp.join('');

        if (fullOtp.length !== 4) {
            toast.warning("Please enter the 4-digit OTP.");
            return;
        }

        const transactionId = localStorage.getItem('transactionId');

        if (!transactionId) {
            toast.warning("Transaction ID missing. Please try again.");
            return;
        }

        try {
            const response = await fetch(`${ApiBaseUrl}/auth-manager/api/auth/v1/pin-verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: fullOtp,
                    transactionId: transactionId
                }),
            });

            const data = await response.json();

            if (data?.statusDescription?.statusCode === 200) {
                localStorage.setItem('jwtRefreshToken', data.userDetails.userTokenDetails.jwtRefreshToken);
                localStorage.setItem('jwtToken', data.userDetails.userTokenDetails.jwtToken);
                localStorage.setItem('source', data.userDetails.userTokenDetails.source);
                toast.success(data?.statusDescription?.statusMessage || "OTP Verified!");
                navigate('/home');
            } else {
                toast.warning(data?.statusDescription?.statusMessage || "Invalid OTP");
            }

        } catch (error) {
            toast.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className='container' style={{ height: "100vh" }}>
            <div className="container-main otp">
                <div className="back-button">
                    <i className="bi bi-chevron-left" onClick={handleBackContinue}></i>
                </div>
                <h3 className="page-title otp">Enter your code</h3>

                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            className="otp-input"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => inputRefs.current[index] = el}
                        />
                    ))}
                </div>

                <div className="resend-link">
                    <p>Didn't get anything? No worries, let's try again.</p>
                    <a href="#" onClick={handleResend}>Resend</a>
                </div>

            </div>
            <div className="d-grid email_signup">
                <button
                    className="btn btn-continue mobile"
                    disabled={otp.some(d => d === '')}
                    onClick={handleContinue}
                >
                    Verify OTP & Continue
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Otp;