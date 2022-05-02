
import {v1} from "uuid";
import {PostType} from "../components/pages/Profile/Profile";


type ActionType= addPostACType|removePostACType| setProfileACType;
type addPostACType=ReturnType<typeof addPostAC>;
type removePostACType=ReturnType<typeof removePostAC>;
type setProfileACType=ReturnType<typeof setProfileAC>

type PostsType={
    posts:Array<PostType>,
    users:ProfileUserType | null,
}

export type ProfileUserType={
    "aboutMe": string
    "contacts": {
        "facebook": string
        "website": null,
        "vk":string
        "twitter":string
        "instagram":string
        "youtube": null,
        "github": string
        "mainLink": null
    },
    "lookingForAJob": boolean
    "lookingForAJobDescription":string
    "fullName": string
    "userId":number
    "photos": {
        "small": string,
        "large": string
    }
}

const initialState={
    posts:[
    {id: v1(), message: 'Hi, how are you?', count: 20},
    {id: v1(), message: 'What are you doing on Saturday?', count: 3},
    {id: v1(), message: 'By-by', count: 6},],
    users:null,
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
        case 'SET-PROFILE-USERS':{
            return {...state,users:action.users}
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

export const setProfileAC = (users:ProfileUserType) => {
    return {
        type: 'SET-PROFILE-USERS',
        users,
    } as const
}

