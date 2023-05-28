import React from 'react';
import LocalizedStrings from "react-localization";

const Loader = () => {
    let strings = new LocalizedStrings({
        en:{
            loading:"Loading...",
        },
        ru: {
            loading:"Загрузка...",
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    return (
        <div>
            {strings.loading}
        </div>
    );
};

export default Loader;