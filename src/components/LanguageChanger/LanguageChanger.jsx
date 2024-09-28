// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageChanger = () => {
//     const { t, i18n } = useTranslation();
//     const [selectedLanguage, setSelectedLanguage] = useState('bn');

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//         localStorage.setItem('language', lng);
//         setSelectedLanguage(lng);
//     };

//     useEffect(() => {
//         const savedLanguage = localStorage.getItem('language') || 'bn';
//         i18n.changeLanguage(savedLanguage);
//         setSelectedLanguage(savedLanguage);
//     }, [i18n]);

//     return (
//         <div className="flex items-center border-2 rounded-full md:mx-2 border-success tooltip tooltip-bottom" data-tip={t('changeLanguage')} >
//             <button
//                 onClick={() => changeLanguage('en')}
//                 className={`btn btn-xs ${selectedLanguage === 'en' ? 'btn-success text-white' : 'btn-ghost'}`}
//             >
//                 <span className="lg:hidden">En</span><span className="hidden lg:block">English</span>
//             </button>
//             <button
//                 onClick={() => changeLanguage('bn')}
//                 className={`btn btn-xs ${selectedLanguage === 'bn' ? 'btn-success text-white' : 'btn-ghost'}`}
//             >
//                 <span className="lg:hidden">বাং</span><span className="hidden lg:block">বাংলা</span>
//             </button>
//         </div>
//     );
// };

// export default LanguageChanger;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageChanger = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('bn');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setSelectedLanguage(lng);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'bn';
        i18n.changeLanguage(savedLanguage);
        setSelectedLanguage(savedLanguage);
    }, [i18n]);

    return (
        <div className="flex items-center justify-center tooltip tooltip-bottom" data-tip={t('changeLanguage')}>
            <label className="swap swap-indeterminate">
                <input
                    type="checkbox"
                    checked={selectedLanguage === 'en'}
                    onChange={() => changeLanguage(selectedLanguage === 'en' ? 'bn' : 'en')}
                />
                {/* English */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 55.2 38.4"
                    className="w-8 h-8 fill-current lg:w-9 lg:h-9 swap-on"
                    style={{ enableBackground: 'new 0 0 55.2 38.4' }}
                    xmlSpace="preserve"><style type="text/css">{`.st0{fill:#B22234;} .st1{fill:#FFFFFF;} .st2{fill:#3C3B6E;}`}</style><g><path className="st0" d="M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z" /><path className="st1" d="M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z" /><path className="st2" d="M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z" /></g>
                </svg>
                {/* Bangla */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="w-8 h-8 fill-current lg:w-9 lg:h-9 swap-off"
                    viewBox="0 0 512 356.18"><g fillRule="nonzero"><path fill="#006A4E" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" /><path fill="#F42A41" d="M345.047 178.09c0-65.572-53.157-118.729-118.729-118.729-65.573 0-118.729 53.157-118.729 118.729s53.156 118.729 118.729 118.729c65.572 0 118.729-53.157 118.729-118.729z" /></g>
                </svg>
            </label>
        </div >
    );
};

export default LanguageChanger;
