import React from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="back-button">
                <i className="bi bi-chevron-left" onClick={handleContinue}></i>
            </div>
            <h1 className="login-title">Log in</h1>
            <h3 className="login-subtitle">Sign in using your email to continue us</h3>
            <form>
                <div className="mb-4">
                    <label for="email" className="form-label">Your email</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required />
                </div>
                <a href="" className="forgot-password-link">Forgot Password?</a>

                <div className="d-grid">
                    <button type="submit" className="btn btn-login">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;