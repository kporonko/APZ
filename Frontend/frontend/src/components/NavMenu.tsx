import React from 'react';
import {Link} from "react-router-dom";
import LocalizedStrings from "react-localization";

const NavMenu = (props:{indexActive: number}) => {
    let strings = new LocalizedStrings({
        en:{
            myTeam:"My Team",
            about:"About App",
            createGame:"Create Game",
        },
        ru: {
            myTeam:"Моя команда",
            about:"О Приложении",
            createGame:"Створити Гру",
        }
    });

    return (
        <div className="nav-wrapper">
            <Link to={'/team'} className='icon'>
                <img className='nav-icon' src={require('../assets/images.jpg')} alt=""/>
            </Link>

            <div style={{display:'flex', gap: '150px'}}>
                <div className='nav-element'>
                    <Link to={'/team'} className='nav-link'>
                        <h2 className={`nav-link-text ${props.indexActive === 0 && 'active-page'}`}>{strings.myTeam}</h2>
                    </Link>
                </div>
                <div className='nav-element'>
                    <h2
                        // onClick={() => {openmodal}}
                        className={`nav-link-text ${props.indexActive === 1 && 'active-page'}`}
                    >
                        {strings.createGame}
                    </h2>
                </div>
            </div>

        </div>
    );
};

export default NavMenu;