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
        <div className="flex items-center border-2 rounded-full md:mx-2 border-success tooltip tooltip-bottom" data-tip={t('changeLanguage')} >
            <button
                onClick={() => changeLanguage('en')}
                className={`btn btn-xs ${selectedLanguage === 'en' ? 'btn-success text-white' : 'btn-ghost'}`}
            >
                <span className="lg:hidden">En</span><span className="hidden lg:block">English</span>
            </button>
            <button
                onClick={() => changeLanguage('bn')}
                className={`btn btn-xs ${selectedLanguage === 'bn' ? 'btn-success text-white' : 'btn-ghost'}`}
            >
                <span className="lg:hidden">বাং</span><span className="hidden lg:block">বাংলা</span>
            </button>
        </div>
    );
};

export default LanguageChanger;
