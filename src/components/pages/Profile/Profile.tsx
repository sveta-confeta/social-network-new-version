import React from "react";
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type PostType = {
    id: string
    message: string
    count: number
}

export type ProfilePropsType = {
    profilePosts:Array<PostType>
    addPost:(value:string)=>void
    removePost:(id:string)=>void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts profilePosts={props.profilePosts} addPost={props.addPost} removePost={props.removePost}/>
        </div>
    )
}


