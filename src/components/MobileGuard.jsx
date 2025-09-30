// import React from 'react';
// import mobileDev from '../components/Images/mobileDevice.png'

// const isMobile = () => {
//     return window.innerWidth <= 768;
// };

// const MobileGuard = ({ children }) => {
//     if (!isMobile()) {
//         return (
//             <div style={{
//                 height: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 padding: '20px'
//             }}>
//                 <h2>This application is only available on mobile devices.</h2>
//             </div>
//         );
//     }

//     return children;
// };

// export default MobileGuard;

import React from 'react';
import mobileDev from '../components/Images/mobileDevice.png'

const isMobile = () => {
    return window.innerWidth <= 768;
};

const MobileGuard = ({ children }) => {
    if (!isMobile()) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img
                    src={mobileDev}
                    alt="Mobile Device Only"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                />

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '10px'
                }}>
                    {/* <h2>This application is only available on mobile devices.</h2>
                    <p>Please switch to a smartphone or tablet to access this feature.</p> */}
                </div>
            </div>
        );
    }

    return children;
};

export default MobileGuard;