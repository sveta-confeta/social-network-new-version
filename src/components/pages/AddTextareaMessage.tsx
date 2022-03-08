import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Profile/MyPosts/MyPosts.module.css";

type AddTextareaMessagePropsType={
    callback:(value:string)=>void;
}


export const AddTextareaMessage = (props:AddTextareaMessagePropsType) => {

    let [value, setValue] = useState<string>('');

    let [error,setError]=useState(false);

    const onKeyPressHandler=(e:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key==='Enter'){
            onClickHandler();

        }

    }
    const onClickHandler = () => {
        if(value.trim()){
            props.callback(value);
            setValue(' ')
        }else{
            setError(true)
        }

    }

    const onchangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
        setError(false)
    }
    return (
        <div>
            <textarea className={error ? s.redBorder:'' } onChange={onchangeHandler} value={value} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>Add post</button>
            {error?<div className={s.red}>not corrected</div>: ""}
        </div>
    );
};

