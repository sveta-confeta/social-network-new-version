import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostType} from "../Profile";


type MyPostsPropsType = {
    profilePosts: Array<PostType>
    addPost:(value:string)=>void
    removePost:(id:string)=>void
}

export const MyPosts = (props: MyPostsPropsType) => {
    let [value, setValue] = useState<string>('');

    let [error,setError]=useState(false)

    const onKeyPressHandler=(e:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key==='Enter'){
            onClickHandler();

        }

    }

    const onClickHandler = () => {
        if(value.trim()){
            props.addPost(value);
            setValue(' ')
        }else{
            setError(true)
        }

    }

    const onchangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
        setError(false)
    }


    const onClickClear=(id:string)=>{
        props.removePost(id)
    }
    return (
        <div>
            My posts:
            <div>
                <textarea className={error ? s.redBorder:'' } onChange={onchangeHandler} value={value} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>Add post</button>
                {error?<div className={s.red}>not corrected</div>: ""}
            </div>
            <div className={s.posts}>
                {props.profilePosts.map(m => {
                    return (
                        <div key={m.id} className={s.item}>
                            <Post id={m.id} count={m.count} message={m.message}/>
                            <button onClick={()=>onClickClear(m.id)}>x</button>
                            {/*//компонента с 1 постом*/}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

