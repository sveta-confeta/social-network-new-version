import React from "react";
import s from './Friend.module.css';

export type FriendPropsType={
    id:number
    name_friend:string
    img_friend:string
}

export const Friend:React. FC<FriendPropsType> = (props) => {
    return (
        <div key={props.id} className={s.friend_wrapper}>
            <img className={s.img_friend} src={props.img_friend}/>
            <div className={s.friend}>{props.name_friend}</div>
        </div>
    )
}