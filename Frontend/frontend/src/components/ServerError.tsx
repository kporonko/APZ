import React from 'react';
import LocalizedStrings from "react-localization";

const ServerError = () => {
    const strings = new LocalizedStrings({
        en:{
            error: "Server error",
        },
        ru: {
            error: "Помилка сервера",
        }
    })

    return (
        <div>
            <h1 className={"error-server"}>{strings.error}</h1>
        </div>
    );
};

export default ServerError;