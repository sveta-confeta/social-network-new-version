import s from "./Post.module.css";
import React from "react";

export type PostPropsType = {
    id: string
    count: number
    message: string
}

export const Post = (props: PostPropsType) => {
    return (
        <>

            <img src="https://sun9-68.userapi.com/impf/c852232/v852232837/f1aa8/8_xC31SsqjM.jpg?size=130x90&quality=96&sign=2428f699cafdcc1af88a92aaa22e7acb&c_uniq_tag=IoujIUMaqNIUJS5zAd6Ac7eq226oXJy9mfBHVHZ69X4&type=album"/>
            {props.message}
            <div>
                <span className={s.count}>{props.count}</span><span>like</span>
            </div>
        </>
    )
}

