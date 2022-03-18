import s from "./Post.module.css";
import React from "react";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type PostPropsType = {
    id: string
    count: number
    message: string
    removePost:(id:string)=>void
}

export const Post = (props: PostPropsType) => {
    const onClickClear=(id:string)=>{
        props.removePost(id)
    }
    return (
        <>

            <img src="https://sun9-68.userapi.com/impf/c852232/v852232837/f1aa8/8_xC31SsqjM.jpg?size=130x90&quality=96&sign=2428f699cafdcc1af88a92aaa22e7acb&c_uniq_tag=IoujIUMaqNIUJS5zAd6Ac7eq226oXJy9mfBHVHZ69X4&type=album"/>
            {props.message}
            <div>
                <span className={s.count}>{props.count}</span><span>like</span>
                <IconButton
                    onClick={()=>onClickClear(props.id)}
                    aria-label="delete">
                    <Delete />
                </IconButton>
            </div>
        </>
    )
}

