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

    return (
        <div>
            {strings.loading}
        </div>
    );
};

export default Loader;