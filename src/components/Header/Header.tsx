import React from "react";
import s from './Header.module.css';
import picture from './../../images/logo.png'


export const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.logo} src={picture} width="100" height="auto"/>
            <span className={s.text}> MOTO-FRIENDS </span>
        </header>
    )
}