import React, {useEffect} from "react";
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import axios from "axios";
import {changeFetchingAC, setUsersAC, userTotalCountAC} from "../../../reducer/contactReducer";
import {useDispatch} from "react-redux";

export type PostType = {
    id: string
    message: string
    count: number
}

export type ProfilePropsType = {

}

export const Profile = (props: ProfilePropsType) => {
    const dispatch=useDispatch();

    const changeFetching=(value:boolean)=>{
        dispatch( changeFetchingAC(value));
    }

    useEffect(()=>{
        // if(contacts.length===0){  //если контактов нет на странице, тогда...
        changeFetching(true);//true-когда пошел запорос срабатывает крутилка
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response=>{
            changeFetching(false);//запрос пришел-крутилка отключилась
            //debugger //дебагером можем увидеть то что приходит в response .данные в data.
            dispatch(setProfileAC(response.data.items)); //этот путь к обьекту с данными мы увидели через дебагер
            dispatch(userTotalCountAC(response.data.totalCount));
        });
        // }
    },[]);
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}


