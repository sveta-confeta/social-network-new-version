import React, {useEffect} from "react";
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import axios from "axios";
import {changeFetchingAC, setUsersAC, userTotalCountAC} from "../../../reducer/contactReducer";
import {useDispatch, useSelector} from "react-redux";
import {setProfileAC} from "../../../reducer/postReducer";
import {AppRootStateType} from "../../../redux/redux-store";

export type PostType = {
    id: string
    message: string
    count: number
}

export type ProfilePropsType = {

}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}


