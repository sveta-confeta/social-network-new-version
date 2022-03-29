
import {v1} from "uuid";
import {PostType} from "../components/pages/Profile/Profile";
import {Simulate} from "react-dom/test-utils";
import stalled = Simulate.stalled;

type ActionType= addPostACType|removePostACType;
type addPostACType=ReturnType<typeof addPostAC>;
type removePostACType=ReturnType<typeof removePostAC>

type PostsType={
    posts:Array<PostType>
}

const initialState={
    posts:[
    {id: v1(), message: 'Hi, how are you?', count: 20},
    {id: v1(), message: 'What are you doing on Saturday?', count: 3},
    {id: v1(), message: 'By-by', count: 6},]
}

export const postReducer=(state:PostsType=initialState, action:ActionType):PostsType=>{
    switch (action.type){
        case 'ADD-POST' :{
            let newPost= {id: v1(), message: action.value, count: 20};
            return {...state,posts:[...state.posts,newPost]}
        }
        case "REMOVE-POST":{
            return {...state,posts:state.posts.filter(f=> f.id!==action.id)}
        }
        default:
            return state;
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

