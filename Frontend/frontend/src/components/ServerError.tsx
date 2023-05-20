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

    return (
        <div>
            <h1 className={"error-server"}>{strings.error}</h1>
        </div>
    );
};

export default ServerError;