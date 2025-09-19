// import React from 'react'
// import './Home.css';

// const Home = () => {
//     return (
//         <>
//             <div className="container-main">
//                 <h1 className="page-title">Welcome to Friendz chat</h1>
//                 <p className="page-subtitle">Please follow these house rules</p>

//                 <div className="rule-card">
//                     <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
//                     <div className="rule-content">
//                         <h5>Be Respectful</h5>
//                         <p>Make sure your photos, age, and bio are accurate to who you are.</p>
//                     </div>
//                 </div>

//                 <div className="rule-card">
//                     <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
//                     <div className="rule-content">
//                         <h5>Stay safe</h5>
//                         <p>Don't be too quick to give out personal information. <a href="">Date Safely</a></p>
//                     </div>
//                 </div>

//                 <div className="rule-card">
//                     <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
//                     <div className="rule-content">
//                         <h5>Play it cool</h5>
//                         <p>Respect others and treat them as you would like to be treated.</p>
//                     </div>
//                 </div>

//                 <div className="rule-card">
//                     <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
//                     <div className="rule-content">
//                         <h5>Be proactive</h5>
//                         <p>Always report bad behavior.</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="d-grid fixed-bottom-container">
//                 <a href="" className="btn btn-continue">Continue</a>
//             </div>
//         </>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import './Home.css';
import { toast, ToastContainer } from 'react-toastify';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            <div className="container-main">
                <h1 className="page-title">Welcome to Friendz chat</h1>
                <p className="page-subtitle">Please follow these house rules</p>

                {loading && <p>Loading rules...</p>}

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

            <div className="d-grid fixed-bottom-container">
                <a href="#" className="btn btn-continue" onClick={handleContinue}>Continue</a>
            </div>

            <ToastContainer />
        </>
    );
};

export default Home;