import React, { useEffect, useState } from 'react';
import './Profile.css';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';
import { toast } from 'react-toastify';

const Profile = () => {

    const [partnerOptions, setPartnerOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [interestOptions, setInterestOptions] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        showGender: false,
        interest: '',
        lookingFor: [],
        interests: [],
    });

    const fetchPartnerOptions = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            toast.warning('Access token not found.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${ApiBaseUrl}/auth-manager/api/utility/v1/partner-looking`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data?.statusDescription?.statusCode === 200) {
                setPartnerOptions(data.partnerInterestDetails || []);
            } else {
                toast.warning(data?.statusDescription?.statusMessage || 'Failed to fetch options.');
            }
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchInterests = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await fetch(`${ApiBaseUrl}/auth-manager/api/utility/v1/interests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (data?.statusDescription?.statusCode === 200) {
                setInterestOptions(data.partnerInterestDetails || []);
            }
        } catch (err) {
            console.error('Failed to fetch interests', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartnerOptions();
        fetchInterests();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSingleSelect = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleMultiSelect = (field, value) => {
        setFormData((prev) => {
            const selected = new Set(prev[field] || []);
            if (selected.has(value)) {
                selected.delete(value);
            } else {
                selected.add(value);
            }
            return { ...prev, [field]: Array.from(selected) };
        });
    };

    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Form submitted successfully!');
    };

    return (
        <div className="onboarding-container">
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <h1 className="title">What's your name?</h1>
                    <p className="subtitle">This is how it'll appear on your profile. Can't change it later.</p>
                    <input
                        type="text"
                        className="input"
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="section">
                    <h1 className="title">Your b-day?</h1>
                    <p className="subtitle">Your profile shows your age, not your birthdate.</p>
                    <div className="date-group">
                        <input
                            type="number"
                            className="input"
                            placeholder="Day"
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            className="input"
                            placeholder="Month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            className="input"
                            placeholder="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="section">
                    <h1 className="title">What's your gender?</h1>
                    {['Woman', 'Man', 'Other'].map((option) => (
                        <div
                            key={option}
                            className={`option ${formData.gender === option ? 'selected' : ''}`}
                            onClick={() => handleSingleSelect('gender', option)}
                        >
                            {option}
                        </div>
                    ))}
                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            id="showGender"
                            name="showGender"
                            checked={formData.showGender}
                            onChange={handleChange}
                        />
                        <label htmlFor="showGender">Show my gender on my profile</label>
                    </div>
                </div>

                <div className="section">
                    <h1 className="title">Who are you interested in seeing?</h1>
                    {['Men', 'Women', 'Everyone'].map((option) => (
                        <div
                            key={option}
                            className={`option ${formData.interest === option ? 'selected' : ''}`}
                            onClick={() => handleSingleSelect('interest', option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h1 className="title">Who are you looking for?</h1>
                    <p className="subtitle">All good if it changes. There's something for everyone.</p>

                    {loading && <p>Loading options...</p>}

                    <div className="row">
                        {!loading &&
                            partnerOptions.map((option) => {
                                const cleanText = option.text.trim();

                                return (
                                    <div
                                        key={option.id}
                                        className={`option ${formData.lookingFor.includes(cleanText) ? 'selected' : ''}`}
                                        onClick={() => handleMultiSelect('lookingFor', cleanText)}
                                    >
                                        <img
                                            src={option.iconUrl}
                                            alt={cleanText}
                                            className="option-icon"
                                            style={{ width: 24, height: 24, marginRight: 8 }}
                                        />
                                        {cleanText}
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="section">
                    <h1 className="title">Who are you into?</h1>
                    <p className="subtitle">You like what you like. Now, let everyone know.</p>

                    {loading && <p>Loading options...</p>}

                    {!loading &&
                        chunkArray(interestOptions, 2).map((row, rowIndex) => (
                            <div className="row two-columns" key={rowIndex}>
                                {row.map((option) => {
                                    const cleanText = option.text.trim();

                                    return (
                                        <div
                                            key={option.id}
                                            className={`option ${formData.interests.includes(cleanText) ? 'selected' : ''}`}
                                            onClick={() => handleMultiSelect('interests', cleanText)}
                                        >
                                            <img
                                                src={option.iconUrl}
                                                alt={cleanText}
                                                className="option-icon"
                                                style={{ width: 24, height: 24, marginRight: 8 }}
                                            />
                                            {cleanText}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                </div>

                <h1 class="page-title">Add your recent pics</h1>
                <p class="page-subtitle">Upload 2 photos to start. Add 4 or more to make your profile stand out.</p>
                <div class="photo-grid">
                    <div class="photo-box">
                        <img src="https://images.unsplash.com/photo-1549416568-154c1562b781?q=80&w=1974&auto=format&fit=crop" alt="User uploaded photo" />
                        <span class="remove-icon-box">&times;</span>
                    </div>

                    <div class="photo-box">
                        <img src="https://images.unsplash.com/photo-1549416568-154c1562b781?q=80&w=1974&auto=format&fit=crop" alt="User uploaded photo" />
                        <span class="remove-icon-box">&times;</span>
                    </div>

                    <div class="photo-box">
                        <div class="photo-overlay">
                            <i class="far fa-image add-icon-main"></i>
                        </div>
                        <div class="add-icon-box">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>

                    <div class="photo-box">
                        <div class="photo-overlay">
                            <i class="far fa-image add-icon-main"></i>
                        </div>
                        <div class="add-icon-box">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>

                    <div class="photo-box">
                        <div class="photo-overlay">
                            <i class="far fa-image add-icon-main"></i>
                        </div>
                        <div class="add-icon-box">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>

                    <div class="photo-box">
                        <div class="photo-overlay">
                            <i class="far fa-image add-icon-main"></i>
                        </div>
                        <div class="add-icon-box">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                </div>

                <div class="container-main">
                    {/* <div class="location-graphic">
                        <img src="https://i.ibb.co/L50Hk2H/location-pin.png" alt="Location Pin" class="main-pin" />
                        <img src="https://images.unsplash.com/photo-1549416568-154c1562b781?q=80&w=1974&auto=format&fit=crop" alt="User 1" class="user-avatar avatar-1" />
                        <img src="https://images.unsplash.com/photo-1549416568-154c1562b781?q=80&w=1974&auto=format&fit=crop" alt="User 2" class="user-avatar avatar-2" />
                        <img src="https://images.unsplash.com/photo-1549416568-154c1562b781?q=80&w=1974&auto=format&fit=crop" alt="User 3" class="user-avatar avatar-3" />                        <div class="dotted-circle">

                        </div>
                    </div> */}
                    <h1 class="page-title">So, are you from around here?</h1>
                    <p class="page-subtitle">Set your location to see who's in your neighborhood or beyond. You won't be able to match with people otherwise.</p>

                </div>
                <div class="d-grid w-90 px-3" style={{ maxWidth: '450px' }}>
                    <button class="btn btn-allow">Allow</button>
                    <a href="#" class="learn-more-link">Learn more</a>
                </div>

                <button type="submit" className="btn-next">Update Profile & Continue</button>

            </form>
        </div>
    );
};

export default Profile;