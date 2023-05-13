import React from 'react';
import LocalizedStrings from "react-localization";

const NoPlayers = () => {

    let strings = new LocalizedStrings({
        en:{
            noPlayers:"No players",
        },
        ru: {
            noPlayers:"Немає гравців",
        }
    });

    return (
        <div className={"no-players"}>
            {strings.noPlayers}
        </div>
    );
};

export default NoPlayers;