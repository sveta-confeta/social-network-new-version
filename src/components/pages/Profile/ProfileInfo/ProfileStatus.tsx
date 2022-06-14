import React, {ChangeEvent, useState} from 'react';
import {updateStatusThunkCreator} from "../../../../reducer/postReducer";
import {useDispatch} from "react-redux";

type ProfileStatusType={
    status:string
}


 export const ProfileStatus =(props:ProfileStatusType)=>{
    const dispatch=useDispatch();
    const [editMode,setEditMode]=useState<boolean>(false);
     const [value,setValue]=useState<string>(props.status);

const inputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
    setValue(event.currentTarget.value)
}


   const activeEditMode=()=>{
        setEditMode(true)}

     const deactiveEditMode=()=>{
         dispatch(updateStatusThunkCreator(value))
         setEditMode(false)

     }


        return (
            <div>{ editMode
                ?  <input  onChange={inputHandler} onBlur={deactiveEditMode} autoFocus value={value}/>
                :  <span onDoubleClick={activeEditMode}>{!props.status? 'add status': props.status}</span>

            }
            </div>
        );


};
