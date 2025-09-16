import React from 'react'
import './Home.css';

const Home = () => {
    return (
        <>
            <div className="container-main">
                <h1 className="page-title">Welcome to Friendz chat</h1>
                <p className="page-subtitle">Please follow these house rules</p>

                <div className="rule-card">
                    <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
                    <div className="rule-content">
                        <h5>Be Respectful</h5>
                        <p>Make sure your photos, age, and bio are accurate to who you are.</p>
                    </div>
                </div>

                <div className="rule-card">
                    <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
                    <div className="rule-content">
                        <h5>Stay safe</h5>
                        <p>Don't be too quick to give out personal information. <a href="">Date Safely</a></p>
                    </div>
                </div>

                <div className="rule-card">
                    <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
                    <div className="rule-content">
                        <h5>Play it cool</h5>
                        <p>Respect others and treat them as you would like to be treated.</p>
                    </div>
                </div>

                <div className="rule-card">
                    <span className="rule-icon"><i className="bi bi-check-circle-fill"></i></span>
                    <div className="rule-content">
                        <h5>Be proactive</h5>
                        <p>Always report bad behavior.</p>
                    </div>
                </div>
            </div>

            <div className="d-grid fixed-bottom-container">
                <a href="" className="btn btn-continue">Continue</a>
            </div>
        </>
    );
};

export default Home;