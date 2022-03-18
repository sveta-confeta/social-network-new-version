import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Profile/MyPosts/MyPosts.module.css";
import {Button, TextField} from "@mui/material";

type AddTextareaMessagePropsType={
    callback:(value:string)=>void;
}


export const AddTextareaMessage = (props:AddTextareaMessagePropsType) => {

    let [value, setValue] = useState<string>('');

    let [error,setError]=useState(false);

    const onKeyPressHandler=(e:KeyboardEvent<HTMLDivElement>)=>{
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
        <div className={s.wrapperTextarea}>
            {/*<textarea className={error ? s.redBorder:'' } onChange={onchangeHandler} value={value} onKeyPress={onKeyPressHandler}/>*/}
            <TextField id="standard-basic"  multiline
                       maxRows={4} label="add message" size={'small'} color={"success"} error={error} variant="outlined" className={error ? s.redBorder:'' } onChange={onchangeHandler} value={value} onKeyPress={onKeyPressHandler} />
            {/*<button onClick={onClickHandler}>Add post</button>*/}
            <Button variant="contained" color="success" >Отправить</Button>
            {error?<div className={s.red}>not corrected</div>: ""}
        </div>
    );
};

