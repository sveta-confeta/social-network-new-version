import React from "react";
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    id: number
}

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    return (
         <div className={s.dialog}> {/*это в dialogs компонента с одним именем и его id*/}
             <NavLink to={"/dialogs/" + props.id}  className={({isActive}) => isActive ? s.active : s.item}>  {/*Обернута в NavLink чтоб создавалась отдельная ссылка по клику на имя*/}
                {props.name}
            </NavLink>
        </div>
    )
}



