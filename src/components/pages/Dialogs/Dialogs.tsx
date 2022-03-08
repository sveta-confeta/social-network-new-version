import React from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {AddTextareaMessage} from "../AddTextareaMessage";


export type DialogItemType = {
    name: string
    id: number
}

export type MessageItemType = {
    text: string
    id: string
}



export type DialogsPropsType = {
    dialogsItem:Array<DialogItemType>
    messagesItem:Array<MessageItemType>
    addDialogMessage:(value:string)=>void

}


export const Dialogs = (props: DialogsPropsType) => {


    const DialogElement = props.dialogsItem.map(m => {
        return (
            <DialogItem id={m.id} name={m.name}/>
        )
    });
    const MessagesElement = props.messagesItem.map(m => {
        return (

            <Message text={m.text} id={m.id}/>
        )
    })

  const callback=(value:string)=>{
      props.addDialogMessage(value)
  }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>   {/*name*/}
                {DialogElement}
            </div>

            <div className={s.messages}>     {/*message*/}
                {MessagesElement}
                <AddTextareaMessage callback={callback}/>
            </div>


        </div>
    )
}