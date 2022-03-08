import React  from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostType} from "../Profile";
import {AddTextareaMessage} from "../../AddTextareaMessage";


type MyPostsPropsType = {
    profilePosts: Array<PostType>
    addPost:(value:string)=>void
    removePost:(id:string)=>void
}

export const MyPosts = (props: MyPostsPropsType) => {
    const onClickClear=(id:string)=>{
        props.removePost(id)
    }
    const callback=(value:string)=>{
        props.addPost(value)
    }
    return (
        <div>
            My posts:
            <div>
                {/*текстэриа и кнопка по добавлению сообщений:*/}
                <AddTextareaMessage  callback={callback}/>

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

