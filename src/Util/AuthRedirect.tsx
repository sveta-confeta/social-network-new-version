import React, {FC, ReactNode} from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../redux/redux-store";


type PropsType = {
    children: ReactNode
}  //для 18 реакта типизируем children

export const AuthRedirect: FC<PropsType> = ({children}) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    return <>{!isAuth ? <Navigate to={`/login`}/> : children}</>
};

