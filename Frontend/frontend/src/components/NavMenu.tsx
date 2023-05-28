import React from 'react';
import {Link} from "react-router-dom";
import LocalizedStrings from "react-localization";

const NavMenu = (props:{indexActive: number}) => {
    let strings = new LocalizedStrings({
        en:{
            myTeam:"My Team",
            about:"About App",
            createGame:"Create Game",
            players:"Players",
        },
        ru: {
            myTeam:"Моя команда",
            about:"О Приложении",
            createGame:"Створити Гру",
            players:"Гравці",
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);
    const handleEn = () => {
        console.log("en");
        strings.setLanguage('en')
        localStorage.setItem('language', 'en')
        window.location.reload();
    }

    const handleUa = () => {
        console.log("ru");
        strings.setLanguage('ru')
        localStorage.setItem('language', 'ru')
        window.location.reload();

    }

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
                    <Link to={'/players'} className='nav-link'>
                        <h2 className={`nav-link-text ${props.indexActive === 1 && 'active-page'}`}>{strings.players}</h2>
                    </Link>
                </div>
            </div>
            <div className="absolute-lang">
                <div onClick={handleEn}>En</div>
                <div onClick={handleUa}>Ua</div>
            </div>
        </div>
    );
};

export default NavMenu;