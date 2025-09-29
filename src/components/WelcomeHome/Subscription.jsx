import React from 'react'
import './Subscription.css';

const Subscription = () => {
    return (
        <>
            <a href="#" className="back-button"><i className="fas fa-chevron-left"></i></a>
            <div className="container-main">
                <h1 className="page-title">Discovery Settings</h1>

                <div className="subscription-card subscription-card-platinum">
                    <div className="sub-details">
                        <h5>Friendz Chat<span className="badge badge-platinum">Platinum</span></h5>
                        <small>Priority Likes, See who likes You, and more</small>
                    </div>
                    <div className="sub-icon">
                        <i className="fas fa-medal"></i>
                    </div>
                </div>
                <div className="subscription-card subscription-card-gold">
                    <div className="sub-details">
                        <h5>Friendz Chat<span className="badge badge-gold">Gold</span></h5>
                        <small>See Who Likes You & More!</small>
                    </div>
                    <div className="sub-icon">
                        <i className="fas fa-medal"></i>
                    </div>
                </div>
                <div className="subscription-card subscription-card-plus">
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
                    <div className="feature-box">
                        <div className="feature-icon-circle eye">
                            <i className="fas fa-eye"></i>
                        </div>
                        <h6>Go Incognito</h6>
                    </div>
                    <div className="feature-box">
                        <div className="feature-icon-circle plane">
                            <i className="fas fa-plane"></i>
                        </div>
                        <h6>Passport Mode</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;