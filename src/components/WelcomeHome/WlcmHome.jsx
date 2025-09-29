import React, { useState } from 'react';
import wlcmDash from '../Images/message_dash.png'
import './WlcmHome.css';

const users = [
    {
        id: 1,
        name: 'Mudasir',
        age: 29,
        interests: ['Gym', 'Cars', 'Singing'],
        img: 'https://img.freepik.com/free-vector/hand-drawn-transport-truck-delivery-man_23-2149145974.jpg?semt=ais_incoming&w=740&q=80',
        status: 'Active',
        lookingFor: '🤝 New friends',
        verified: true,
    },
    {
        id: 2,
        name: 'Ayesha',
        age: 25,
        interests: ['Travel', 'Books', 'Music'],
        img: 'https://img.freepik.com/premium-vector/big-truck-transports-wood-from-sawmill-flat-vector-illustration_124715-1651.jpg?ga=GA1.1.234554163.1758561986&semt=ais_hybrid&w=740&q=80',
        status: 'Online',
        lookingFor: '💬 Deep talks',
        verified: false,
    },
    {
        id: 3,
        name: 'Ali',
        age: 27,
        interests: ['Gaming', 'Movies', 'Tech'],
        img: 'https://img.freepik.com/free-vector/gradient-transport-truck_23-2149150714.jpg?semt=ais_incoming&w=740&q=80',
        status: 'Offline',
        lookingFor: '👨‍💻 Tech friends',
        verified: true,
    },
];

const WlcmHome = () => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    const user = users[currentUserIndex];

    const handleAction = (action) => {
        let newIndex;
        if (action === 'redo') {
            newIndex = (currentUserIndex - 1 + users.length) % users.length;
        } else {
            // For like, reject, superlike, boost: move to next user
            newIndex = (currentUserIndex + 1) % users.length;
        }
        setCurrentUserIndex(newIndex);
    };

    return (
        <>
            <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
                <div className="flex items-center">
                    <div className="logo-container mb-0">
                        <div className="logo-icon">
                            <img src={wlcmDash} className='img-fluid'></img>
                        </div>
                        <div className="logo-text">
                            <div className="orange-brand">
                                orange<sup style={{ fontSize: "10px", verticalAlign: "super" }}>TM</sup>
                            </div>
                            <div className="friendz-chat">Friendz Chat</div>
                        </div>
                    </div>
                </div>

                <div className="p-2 rounded-xl text-xl icon_right">
                    <i className="fas fa-sliders-h"></i>
                </div>
            </header>

            <main className="flex-grow w-full max-w-lg mx-auto p-4">
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-300" style={{ height: "calc(100vh - 350px)" }}>
                    <div className="absolute inset-0">
                        <img
                            src={user.img}
                            alt={user.name}
                            className="w-full h-full object-cover brightness-[0.75]"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/800x1200/555/FFF?text=Image+Not+Found';
                            }}
                        />
                    </div>

                    <div className="absolute top-0 left-0 p-4 z-10 flex space-x-2" style={{ fontSize: "26px" }}>
                        {user.interests.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-white text-xs font-semibold rounded-full backdrop-blur-sm"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div
                        className="absolute bottom-0 inset-x-0 text-white p-5 pt-10 z-10 ps-2"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent)',
                        }}
                    >
                        <div
                            className="inline-flex items-center space-x-1 mb-2 px-3 py-1 rounded-full text-sm font-semibold"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                        >
                            <span className="w-2 h-2 rounded-full bg-active-green"></span>
                            <span>{user.status}</span>
                        </div>

                        <div className="flex items-center text-4xl font-bold mb-1">
                            <span>
                                {user.name}, {user.age}
                            </span>
                            {user.verified && (
                                <i className="fas fa-check-circle ml-2 text-3xl text-verified-blue"></i>
                            )}
                        </div>

                        <div className="text-lg opacity-90" style={{ fontSize: "15px" }}>Looking: {user.lookingFor}</div>
                    </div>
                </div>

                <div className="flex justify-center mt-3 space-x-2">
                    {users.map((_, idx) => {
                        const isActive = idx === currentUserIndex;
                        const backgroundColor = isActive ? '#ff6600' : '#ccc';
                        const opacity = isActive ? 1 : 0.6;
                        return (
                            <div
                                key={idx}
                                className="w-2 h-2 rounded-full transition-colors"
                                style={{ backgroundColor, opacity }}
                            />
                        );
                    })}
                </div>
            </main >

            < div className="flex justify-around items-center w-full max-w-lg mx-auto p-4 pt-1" >
                <button
                    id="btn-redo"
                    className="action-btn w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-xl text-gray-400 hover:scale-105 transition active:scale-95"
                    onClick={() => handleAction('redo')}
                >
                    <i className="fas fa-redo-alt"></i>
                </button>

                <button
                    id="btn-reject"
                    className="action-btn w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-xl text-red-500 hover:scale-105 transition active:scale-95"
                    onClick={() => handleAction('reject')}
                >
                    <i className="fas fa-times"></i>
                </button>

                <button
                    id="btn-like"
                    className="action-btn w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center text-3xl hover:scale-105 transition active:scale-95 bg-orange"
                    style={{ boxShadow: '0 5px 15px rgba(255, 102, 0, 0.4)' }}
                    onClick={() => handleAction('like')}
                >
                    <i className="fas fa-heart"></i>
                </button>

                <button
                    id="btn-superlike"
                    className="action-btn w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-xl text-blue-500 hover:scale-105 transition active:scale-95"
                    onClick={() => handleAction('superlike')}
                >
                    <i className="fas fa-star"></i>
                </button>

                <button
                    id="btn-boost"
                    className="action-btn w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-xl text-purple-500 hover:scale-105 transition active:scale-95"
                    onClick={() => handleAction('boost')}
                >
                    <i className="fas fa-bolt"></i>
                </button>
            </div >

            < nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-20 shadow-inner" >
                <div className="nav-item flex flex-col items-center cursor-pointer transition-colors text-orange text-2xl">
                    <i className="fas fa-folder"></i>
                </div>
                <div className="nav-item flex flex-col items-center cursor-pointer transition-colors text-nav-inactive text-2xl">
                    <i className="fas fa-search"></i>
                </div>
                <div className="nav-item flex flex-col items-center cursor-pointer transition-colors text-nav-inactive text-2xl">
                    <i className="fas fa-star"></i>
                </div>
                <div className="nav-item flex flex-col items-center cursor-pointer transition-colors text-nav-inactive text-2xl">
                    <i className="fas fa-comment-dots"></i>
                </div>
                <div className="nav-item flex flex-col items-center cursor-pointer transition-colors text-nav-inactive text-2xl">
                    <i className="fas fa-user-alt"></i>
                </div>
            </nav >
        </>
    );
};

export default WlcmHome;