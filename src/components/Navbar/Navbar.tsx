import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Friends} from "./Friends/Friends";
import {FriendItemType} from "../../App";



type NavbarPropsType={
    friendsData:Array<FriendItemType>
}

export const Navbar = (props:NavbarPropsType) => {

    return (
        <div className={s.navbar}>
            <nav className={s.nav}>
                <div className={s.item}><NavLink to ='/profile/me' className={({isActive}) => isActive ? s.active : s.item}>Profile</NavLink></div>
                {/*<div className={s.item}><NavLink to ='/' className={({isActive}) => isActive ? s.active : s.item}>Profile</NavLink></div>*/}
                <div className={s.item}><NavLink to='/dialogs' className={({isActive}) => isActive ? s.active : s.item}  >Messages</NavLink></div>
                <div className={s.item}><NavLink to='/news' className={({isActive}) => isActive ? s.active : s.item}>News</NavLink></div>
                <div className={s.item}><NavLink to='/music' className={({isActive})=> isActive ? s.active : s.item} >Music</NavLink></div>
                <div className={s.item}><NavLink to='/helping' className={({isActive})=> isActive ? s.active : s.item}>Helping</NavLink></div>
                <div className={`${s.item} ${s.contacts}`}><NavLink to='/contacts' className={({isActive})=> isActive ? s.active : s.item}>Contacts</NavLink></div>
            </nav>
            
            <Friends friendData={props.friendsData}/>

        </div>
    )
}