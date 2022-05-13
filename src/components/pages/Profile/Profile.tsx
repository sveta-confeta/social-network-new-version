import React, {useEffect} from "react";
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useParams} from "react-router-dom";
import axios from "axios";
import {setProfileAC, usersThunkCreator} from "../../../reducer/postReducer";
import {changeFetchingAC} from "../../../reducer/contactReducer";
import {useDispatch} from "react-redux";

export type PostType = {
    id: string
    message: string
    count: number
}


export const Profile = () => {
    const dispatch=useDispatch();
    const {userId} = useParams(); //получение id юзера на которого мы кликнули


    useEffect(()=>{
        if(userId){
           dispatch(usersThunkCreator(userId))
        }else {
            dispatch(usersThunkCreator('22634')) //это мой id отрисовывается когда мы ни на кого не кликнули
        }},[]);

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}


