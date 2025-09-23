import React from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/');
    };

    return (
        <div className='container' style={{ height: "100vh" }}>
            <div className="login-container login">
                <div className="back-button">
                    <i className="bi bi-chevron-left" onClick={handleContinue}></i>
                </div>
                <div className='sign_content login'>
                    <h1 className="login-title login">Log in</h1>
                    <h3 className="login-subtitle login">Sign in using your email to continue us</h3>
                    <form>
                        <div className="mb-4">
                            <label for="email" className="form-label">Your email</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <a href="" className="forgot-password-link login">Forgot Password?</a>

                        <div className="d-grid email_signup">
                            <button type="submit" className="btn btn-login login">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;