import React from 'react'
import './Subscription.css';

const Subscription = () => {
    return (
        <>
            <div>
                <span>
                    <a href="#" className="back-button">
                        <i className="fas fa-chevron-left"></i>
                    </a>
                </span>
                <span style={{ marginLeft: "75px", marginTop: "34px" }}>
                    <h1 className="page-title" style={{ fontSize: "26px", marginTop: "15px" }}>Discovery Settings</h1>
                </span>
            </div>

            <div className="container-main subscription">
                <div
                    className="subscription-card subscription-card-platinum"
                    style={{
                        background: 'linear-gradient(86.6deg, #F9F9F9 0.2%, #CFCCEB 99.49%)',
                    }}
                >
                    <div className="sub-details">
                        <h5>Friendz Chat<span className="badge badge-platinum">Platinum</span></h5>
                        <small>Priority Likes, See who likes You, and more</small>
                    </div>
                    <div className="sub-icon">
                        <i className="fas fa-medal"></i>
                    </div>
                </div>
                <div className="subscription-card subscription-card-gold w-100" style={{
                    background: 'linear-gradient(90deg, #DBC68F 0%, #FFFAF2 100%)',
                }}>
                    <div className="sub-details">
                        <h5>Friendz Chat<span className="badge badge-gold">Gold</span></h5>
                        <small>See Who Likes You & More!</small>
                    </div>
                    <div className="sub-icon">
                        <i className="fas fa-medal"></i>
                    </div>
                </div>
                <div className="subscription-card subscription-card-plus w-100" style={{
                    background: 'linear-gradient(90deg, #FFF0F0 0%, #DCE6FF 100%)',
                }}>
                    <div className="sub-details">
                        <h5>Friendz Chat<span className="badge badge-plus">Plus</span></h5>
                        <small>See Who Likes You & More!</small>
                    </div>
                    <div className="sub-icon">
                        <i className="fas fa-medal"></i>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-box">
                        <div className="feature-icon-circle star">
                            <i className="fas fa-star"></i>
                        </div>
                        <h6>Get Super Likes</h6>
                    </div>
                    <div className="feature-box">
                        <div className="feature-icon-circle bolt">
                            <i className="fas fa-bolt"></i>
                        </div>
                        <h6>Get Boosts</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;