import React from 'react';
import LocalizedStrings from 'react-localization';

const AbsoluteLoginText = () => {

    let strings = new LocalizedStrings({
        en:{
            text:"Best application for cybersportsmen state analysis",
            header: "Cybersportsmen State Analysis"
        },
        ru: {
            text:"Кращий додаток з аналізу стану кіберспортсменів під час гри",
            header: "Аналіз стану кіберспортсменів"
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    return (
        <div>
            <span className='main-header-login'>{strings.header}</span>
            <h2 className='text-header-login'>{strings.text}</h2>
        </div>
    );
};

export default AbsoluteLoginText;