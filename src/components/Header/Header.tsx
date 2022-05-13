import React, {useEffect} from "react";
import s from './Header.module.css';
import picture from './../../images/logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {headerAuthMeThunkCreator} from "../../reducer/authReducer";


export const Header = () => {
    const login=useSelector<AppRootStateType,string|null>(state => state.auth.login) //достаем имя которое будет на сайте в хэдере
    const isAuth=useSelector<AppRootStateType,boolean>(state => state.auth.isAuth)
    const dispatch=useDispatch();

    useEffect(() => {
      dispatch(headerAuthMeThunkCreator())
    }, []);

    // const changeFetching = (value: boolean) => {
    //     dispatch(changeFetchingAC(value)); //крутилка
    // }
    return (
        <header className={s.header}>
            <div className={s.logoWrapper}>
                <img className={s.logo} src={picture} width="100" height="auto"/>
                <span className={s.text}> MOTO-FRIENDS </span>
            </div>
            <div className={s.loginWrapper}>
                {isAuth ? <div className={s.loginName}> {login}</div>
                    : <NavLink  className={s.login} to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}