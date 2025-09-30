import React, { useEffect, useState } from 'react';
import './Profile.css';
import ApiBaseUrl from '../Api_base_Url/ApiBaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
        mobileNumber: '',
        gender: '',
        showGender: false,
        interest: '',
        interests: [],
        lookingFor: [],
        userImages: [],
        location: null
    });

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/home');
    };

    const getLocationName = async (latitude, longitude) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            return data.display_name;
        } catch (err) {
            console.error("Reverse geocoding failed", err);
            return '';
        }
    };

    const handleAllowLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationName = await getLocationName(latitude, longitude);

                    setFormData((prev) => ({
                        ...prev,
                        location: locationName
                    }));

                    toast.success('Location access granted.');
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    toast.error('Location access denied or unavailable.');
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const getInterestIds = (selectedTexts) => {
        return interestOptions
            .filter(opt => selectedTexts.includes(opt.text.trim()))
            .map(opt => opt.id);
    };

    const getLookingIds = (selectedTexts) => {
        return partnerOptions
            .filter(opt => selectedTexts.includes(opt.text.trim()))
            .map(opt => opt.id);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            userImages: [...prev.userImages, ...files].slice(0, 6),
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            userImages: prev.userImages.filter((_, idx) => idx !== indexToRemove),
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        const mobileNumber = localStorage.getItem('mobileNumber');

        if (!token || !mobileNumber) {
            toast.error('Token or mobile number missing');
            return;
        }

        const form = new FormData();

        if (formData.location) {
            form.append('location', formData.location);
        }

        form.append('firstName', formData.firstName);
        form.append('lastName', formData.lastName);
        form.append('mobileNumber', mobileNumber);
        form.append(
            'dob',
            `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`
        );
        form.append('gender', formData.gender);
        form.append('interestedGender', formData.interest);

        const interestIds = getInterestIds(formData.interests);
        const lookingIds = getLookingIds(formData.lookingFor);

        form.append('interestIds', interestIds.join(','));
        form.append('lookingIds', lookingIds.join(','));

        formData.userImages.forEach((imageFile) => {
            form.append('userImages', imageFile);
        });

        try {
            const response = await fetch(`${ApiBaseUrl}/auth-manager/api/user/v1/save-user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });

            const result = await response.json();

            if (!response.ok) {
                toast.warning(result?.statusDescription?.statusMessage || 'Failed to update profile.');
            } else {
                toast.success(result?.statusDescription?.statusMessage || 'Profile updated successfully!');
                localStorage.setItem('userId', result?.userData?.id?.toString());
                navigate('/wlcm-home');
            }
        } catch (err) {
            toast.error('Something went wrong while updating the profile.');
        }
    };

    return (
        <div className='container'>
            <div className="onboarding-container">
                <div className="back-button">
                    <i className="bi bi-chevron-left" onClick={handleContinue}></i>
                </div>
                <div className='onboarding-container-1'>
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

                        {/* <div className="section">
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
                        </div> */}

                        <div className="section">
                            <h1 className="title">Your b-day?</h1>
                            <p className="subtitle">Your profile shows your age, not your birthdate.</p>
                            <div className="date-group">

                                {/* Day Dropdown */}
                                <select
                                    className="input"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Day</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>

                                {/* Month Dropdown */}
                                <select
                                    className="input"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Month</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>

                                {/* Year Dropdown */}
                                <select
                                    className="input"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 100 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>

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
                            <div className="form-check mt-3 ms-0 ps-0 mb-3" style={{ textAlign: "start" }}>
                                <input
                                    className='me-2'
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

                            <div className="row two-columns">
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

                        <h1 className="page-title home">Add your recent pics</h1>
                        <p className="page-subtitle home">Upload 2 photos to start. Add 4 or more to make your profile stand out.</p>
                        <div className="photo-grid mt-3">
                            {formData.userImages.map((file, index) => (
                                <div key={index} className="photo-box">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="User uploaded"
                                    />
                                    <span className="remove-icon-box" onClick={() => handleRemoveImage(index)}>&times;</span>
                                </div>
                            ))}

                            {formData.userImages.length < 6 &&
                                Array.from({ length: 6 - formData.userImages.length }).map((_, idx) => (
                                    <div className="photo-box" key={`add-${idx}`} onClick={() => document.getElementById('imageUploadInput').click()}>
                                        <div className="photo-overlay">
                                            <i className="far fa-image add-icon-main"></i>
                                        </div>
                                        <div className="add-icon-box">
                                            <i className="fas fa-plus"></i>
                                        </div>
                                    </div>
                                ))
                            }

                            <input
                                type="file"
                                id="imageUploadInput"
                                style={{ display: 'none' }}
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div className="container-main two">
                            <h1 className="page-title you">So, are you from around here?</h1>
                            <p className="page-subtitle set">Set your location to see who's in your neighborhood or beyond. You won't be able to match with people otherwise.</p>
                        </div>
                        {/* <div className="d-grid w-100 px-3">
                            <button className="btn btn-allow profile mx-auto">Allow</button>
                            <a href="#" className="learn-more-link mx-auto">Learn more</a>
                        </div> */}
                        <div className="d-grid w-100 px-3">
                            <button
                                type="button"
                                className="btn btn-allow profile mx-auto"
                                onClick={handleAllowLocation}
                            >
                                Allow
                            </button>
                            <a href="#" className="learn-more-link mx-auto">Learn more</a>
                        </div>
                        <div className="d-grid w-100 px-3">
                            <button type="submit" className="btn btn-profile mx-auto">Update Profile & Continue</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;