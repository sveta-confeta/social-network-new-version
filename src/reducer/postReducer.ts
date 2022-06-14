import {v1} from "uuid";
import {PostType} from "../components/pages/Profile/Profile";
import {Dispatch} from "redux";
import {profileApi} from "../api/api";
import {changeFetchingAC, changeFetchingACType} from "./contactReducer";


type ActionType = addPostACType | removePostACType | setProfileACType | changeFetchingACType | setProfileStatusACType;
type addPostACType = ReturnType<typeof addPostAC>;
type removePostACType = ReturnType<typeof removePostAC>;
type setProfileACType = ReturnType<typeof setProfileAC>
type setProfileStatusACType=ReturnType<typeof setProfileStatusAC>

type PostsType = {
    posts: Array<PostType>,
    users: ProfileUserType | null,
    status:string,
}

export type ProfileUserType = {
    "aboutMe": string
    "contacts": {
        "facebook": string
        "website": null,
        "vk": string
        "twitter": string
        "instagram": string
        "youtube": null,
        "github": string
        "mainLink": null
    },
    "lookingForAJob": boolean
    "lookingForAJobDescription": string
    "fullName": string
    "userId": number
    "photos": {
        "small": string,
        "large": string
    }
}

const initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', count: 20},
        {id: v1(), message: 'What are you doing on Saturday?', count: 3},
        {id: v1(), message: 'By-by', count: 6},],
    users: null,
    status: '',
}

export const postReducer = (state: PostsType = initialState, action: ActionType): PostsType => {
    switch (action.type) {
        case 'ADD-POST' : {
            let newPost = {id: v1(), message: action.value, count: 20};
            return {...state, posts: [...state.posts, newPost]}
        }
        case "REMOVE-POST": {
            return {...state, posts: state.posts.filter(f => f.id !== action.id)}
        }
        case 'SET-PROFILE-USERS': {
            return {...state, users: action.users}
        }
        case 'SET-PROFILE-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
}

export const addPostAC = (value: string) => {
    return {
        type: 'ADD-POST',
        value,
    } as const
};

export const removePostAC = (id: string) => {
    return {
        type: 'REMOVE-POST',
        id,
    } as const
}

export const setProfileAC = (users: ProfileUserType) => {
    return {
        type: 'SET-PROFILE-USERS',
        users,
    } as const
}
export const setProfileStatusAC = (status: string) => {
    return {
        type: 'SET-PROFILE-STATUS',
        status,
    } as const
}

export const usersThunkCreator = (userID: string) => (dispatch: Dispatch) => {
    dispatch(changeFetchingAC(true));//true-когда пошел запорос срабатывает крутилка
    profileApi.getProfileUsers(userID)
        .then(data => {
            dispatch(changeFetchingAC(false));
            dispatch(setProfileAC(data)); //этот путь к обьекту с данными мы увидели через дебагер
        });

}
export const getStatusThunkCreator = (userID: string) => (dispatch: Dispatch) => {
    dispatch(changeFetchingAC(true));//true-когда пошел запорос срабатывает крутилка
    profileApi.getStatus(userID)
        .then(res => {
            debugger
            dispatch(changeFetchingAC(false));
            dispatch(setProfileStatusAC(res.data)); //этот путь к обьекту с данными мы увидели через дебагер
        });

}
export const updateStatusThunkCreator = (status: string) => (dispatch: Dispatch) => {
    dispatch(changeFetchingAC(true));//true-когда пошел запорос срабатывает крутилка
    profileApi.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                debugger
                dispatch(changeFetchingAC(false));
                dispatch(setProfileStatusAC(status));  //если запрос без ошибок-сетаем тот статус  в ас который получили в параметрах
            }
        });

}
