import React, {useCallback} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {AddTextareaMessage} from "../AddTextareaMessage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {addDialogMessageAC} from "../../../reducer/dialogReducer";


export type DialogItemType = {
    name: string
    id: number
}

export type MessageItemType = {
    text: string
    id: string
}






export const Dialogs =React.memo(  () => {

    const dialogsItem=useSelector<AppRootStateType,Array<DialogItemType> >(state=>state.dialogsPage.dialogsItem)
    const messagesItem=useSelector<AppRootStateType, Array<MessageItemType>>(state=>state.dialogsPage.messagesItem)
    const dispatch=useDispatch();


    const DialogElement = dialogsItem.map(m => {
        return (
            <DialogItem id={m.id} name={m.name}/>
        )
    });
    const MessagesElement = messagesItem.map(m => {
        return (

            <Message text={m.text} id={m.id}/>
        )
    })

  const callback= useCallback((value:string)=>{
      dispatch(addDialogMessageAC(value))
  },[dispatch,addDialogMessageAC])

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
});