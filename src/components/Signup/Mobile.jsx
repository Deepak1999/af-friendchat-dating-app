import React from 'react'
import './Mobile.css';

const Mobile = () => {
    return (
        <div className="container-main">
            <h4 className="page-title">Can we get your number</h4>

            <div className="phone-input-group">
                <div className="country-code-dropdown">
                    <span className="country-flag">🇮🇳</span>
                    <span className="country-code">(+91)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" className="bi bi-chevron-down ms-2" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <input type="tel" className="phone-input" placeholder="331 623 8413" />
            </div>

            <p className="info-text">
                We'll text you a code to verify you're really you.<br />
                Message and data rates may apply. <a href="">What happens if your number changes?</a>
            </p>

            <div className="d-grid">
                <button className="btn btn-continue">Continue</button>
            </div>
        </div>
    );
};

export default Mobile;