import React, { useEffect, useState } from 'react';
import './Home.css';
import { toast, ToastContainer } from 'react-toastify';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBackContinue = () => {
        navigate('/login-mobile');
    };

    const fetchRules = async () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            toast('No access token found.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${ApiBaseUrl}/auth-manager/api/utility/v1/rules`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data?.statusDescription?.statusCode === 200) {
                setRules(data.fcRulesList || []);
            } else {
                toast.warning(data?.statusDescription?.statusMessage || 'Failed to fetch rules.');
            }
        } catch (err) {
            toast.error('Error fetching rules:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const handleContinue = (e) => {
        navigate('/profile');
    };

    return (
        <>
            <div className='container'>
                <div className="container-main mobile">
                    <div className="back-button">
                        <i className="bi bi-chevron-left" onClick={handleBackContinue}></i>
                    </div>

                    <div className='sign_content home'>
                        <h1 className="page-title">Welcome to Friendz chat</h1>
                        <p className="page-subtitle home">Please follow these house rules</p>

                        {loading && <p>Loading rules...</p>}
                        <div className='' style={{
                            overflowY: "auto",
                            maxHeight: "56vh"
                        }}>
                            {!loading && rules.map((rule) => (
                                <div key={rule.id} className="rule-card">
                                    <span className="rule-icon">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                    <div className="rule-content">
                                        <h5>{rule.heading}</h5>
                                        <p>{rule.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="d-grid fixed-bottom-container email_signup">
                    <a href="#" className="btn btn-continue mobile" style={{padding: "10px 0px"}}  onClick={handleContinue}>Continue</a>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

export default Home;