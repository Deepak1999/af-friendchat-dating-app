import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = 'white';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handlePhoneClick = () => {
        navigate('/login-mobile');
    };

    const handleEmailClick = () => {
        navigate('/login-email');
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Signup</h1>
            <p className="signup-subtitle">
                Sign up with your email, phone, or social account to get started.
            </p>

            <div className="d-grid mb-3">
                <button onClick={handlePhoneClick} className="btn btn-orange">Use phone number</button>
            </div>
            <div className="d-grid mb-3">
                <button onClick={handleEmailClick} className="btn btn-outline-orange">Continue with email</button>
            </div>

            {/* <div className="or-divider">or sign up with</div>

            <div className="social-login-buttons">
                <div className="social-icon-wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png" alt="Facebook" className="social-icon" />
                </div>
                <div className="social-icon-wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="Google" className="social-icon" />
                </div>
                <div className="social-icon-wrapper">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1000px-Apple_logo_black.svg.png" alt="Apple" className="social-icon" />
                </div>
            </div> */}

            <div className="footer-link">
                Already have an account? <Link to="/login">Log In</Link>
            </div>

        </div>
    );
};

export default Signup;