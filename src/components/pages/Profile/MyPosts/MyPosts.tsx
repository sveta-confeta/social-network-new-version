import React, {useCallback} from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostType} from "../Profile";
import {AddTextareaMessage} from "../../AddTextareaMessage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../redux/redux-store";
import {addPostAC} from "../../../../reducer/postReducer";



export const MyPosts = React.memo(() =>{

    const posts=useSelector<AppRootStateType, Array<PostType>>(state=>state.profilePage.posts)
    const dispatch=useDispatch();

    const callback=useCallback((value:string)=>{
        dispatch(addPostAC(value));
    },[dispatch,addPostAC]);
    return (
        <div>
            My posts:
            <div>
                {/*текстэриа и кнопка по добавлению сообщений:*/}
                <AddTextareaMessage  callback={callback}/>

            </div>
            <div className={s.posts}>
                {posts.map(m => {
                    return (
                        <div key={m.id} className={s.item}>
                            <Post id={m.id} count={m.count} message={m.message}/>
                            {/*<button onClick={()=>onClickClear(m.id)}>x</button>*/}
                            {/*//компонента с 1 постом*/}

                        </div>
                    )
                })}

            </div>
        </div>
    )
});

