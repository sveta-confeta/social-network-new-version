
import {v1} from "uuid";
import {DialogItemType, MessageItemType} from "../components/pages/Dialogs/Dialogs";

type DialogsPage={
    dialogsItem:Array<DialogItemType>
    messagesItem:Array<MessageItemType>
}

type ActionType=addDialogMessageACType;
type addDialogMessageACType=ReturnType<typeof addDialogMessageAC>


const initialState={ dialogsItem: [
    {name: 'Dimych', id: 1},
    {name: 'Agafon', id: 2},
    {name: 'Mitrofan', id: 3},
    {name: 'Fedot', id: 4},
],
    messagesItem:[
    {text: 'Hi!!!', id: v1()},
    {text: 'Have you done motorcycle repairs?', id: v1()},
    {text: 'We are flying to Odessa tomorrow!', id: v1()},
]}

export const dialogReducer=(state:DialogsPage=initialState,action:ActionType):DialogsPage=>{
    switch (action.type){

        case "ADD-DIALOG-MESSAGE":{
            let newDialog={text: action.value, id: v1()};
            return  {...state, messagesItem:[...state.messagesItem,newDialog]}

        }
    }
}


export const addDialogMessageAC=(value:string)=>{
    return{
        type:'ADD-DIALOG-MESSAGE',
        value,
    } as const
}