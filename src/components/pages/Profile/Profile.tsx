import React, {useEffect} from "react";
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useParams} from "react-router-dom";
import axios from "axios";
import {setProfileAC} from "../../../reducer/postReducer";
import {changeFetchingAC} from "../../../reducer/contactReducer";
import {useDispatch} from "react-redux";

export type PostType = {
    id: string
    message: string
    count: number
}


export const Profile = () => {
    const dispatch=useDispatch();
    const {userId} = useParams();


    const changeFetching=(value:boolean)=>{
        dispatch( changeFetchingAC(value));

    }

    useEffect(()=>{

        changeFetching(true);//true-когда пошел запорос срабатывает крутилка

        if(userId){
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response=>{
                changeFetching(false);
                dispatch(setProfileAC(response.data)); //этот путь к обьекту с данными мы увидели через дебагер
            });
        }else {
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/22634`).then(response=>{
                changeFetching(false);
                dispatch(setProfileAC(response.data)); //этот путь к обьекту с данными мы увидели через дебагер
            });
        }

    },[]);

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}


