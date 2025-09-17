import React, { useState } from 'react'
import './Email.css';
import { useNavigate } from 'react-router-dom';

const Email = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleContinue = () => {
        navigate('/signup');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // TODO: Add actual signup logic
        alert('Signed up successfully with Email: ' + formData.email);
    };

    return (
        <div className="signup-container">
            <div className="back-button">
                <i className="bi bi-chevron-left" onClick={handleContinue}></i>
            </div>
            <h1 className="signup-title">Sign up</h1>
            <p className="signup-subtitle">Create your account using email</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email ID</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-signup">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Email;