import React, {useState} from 'react';

type ProfileStatusType={
    status:string
}


 export const ProfileStatus =(props:ProfileStatusType)=>{
    const [editMode,setEditMode]=useState(false);


   const activeEditMode=()=>{
        setEditMode(true)}

     const deactiveEditMode=()=>{
         setEditMode(false)}

        return (
            <div>{ editMode
                ?  <input  onBlur={deactiveEditMode} autoFocus value={props.status}/>
                :  <span onDoubleClick={activeEditMode}>{props.status}</span>

            }
            </div>
        );


};
