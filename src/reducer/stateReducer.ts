import {StateType} from "../App";
import {v1} from "uuid";

type ActionType= addPostACType|removePostACType|addDialogMessageACType;
type addPostACType=ReturnType<typeof addPostAC>;
type removePostACType=ReturnType<typeof removePostAC>
type addDialogMessageACType=ReturnType<typeof addDialogMessageAC>

export const StateReducer=(state:StateType,action:ActionType)=>{
    switch (action.type){
        case 'ADD-POST' :{
            let newPost= {id: v1(), message: action.value, count: 20};
            return {...state,profilePost:[...state.profilePost,newPost]}
        }
        case "REMOVE-POST":{
            return {...state,profilePost:state.profilePost.filter(f=> f.id!==action.id)}
        }
        case "ADD-DIALOG-MESSAGE":{
            let newDialog={text: action.value, id: v1()};
            return  {...state, messagesItem:[...state.messagesItem,newDialog]}

        }
    }
}

export const addPostAC=(value:string)=>{
    return{
        type:'ADD-POST',
        value,
    } as const
};

export const removePostAC=(id:string)=>{
    return{
        type:'REMOVE-POST',
        id,
    }as const
}

export const addDialogMessageAC=(value:string)=>{
    return{
        type:'ADD-DIALOG-MESSAGE',
        value,
    } as const
}