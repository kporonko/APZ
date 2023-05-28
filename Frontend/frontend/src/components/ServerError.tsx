import React from 'react';
import LocalizedStrings from "react-localization";

const ServerError = () => {
    const strings = new LocalizedStrings({
        en:{
            error: "Loading...",
        },
        ru: {
            error: "Загрузка...",
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    return (
        <div>
            <h1 className={"error-server"}>{strings.error}</h1>
        </div>
    );
};

export default ServerError;