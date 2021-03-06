import {Dispatch} from "redux";
import {followApi, getApiUsers, onPageChange, unfollowApi} from "../api/api";
import {followButtonFalseDisabledAC, followButtonTrueDisabledAC} from "./authReducer";


type followACType = ReturnType<typeof followAC>;
type unFollowACType = ReturnType<typeof unFollowAC>;
type setUsersACType= ReturnType<typeof setUsersAC>
type actualPageACType=ReturnType<typeof actualPageAC>
type userTotalCountACType=ReturnType<typeof userTotalCountAC>
export type changeFetchingACType=ReturnType<typeof changeFetchingAC>

type ActionType = followACType | unFollowACType  | setUsersACType | actualPageACType | userTotalCountACType|changeFetchingACType;


export type ContactsType = {
    id: string
    photos: {
        small: undefined|string,
        large: undefined|string,
    }
    followed: boolean
    name: string
    status: string
    location: { city: string, coutntry: string }
}

export type ContactsStateType = {
    contacts: Array<ContactsType>,
    pageSize:number,
    totalUserCount:number,
    actualPage:number,
    isFetching:boolean,
}

const initialState:ContactsStateType={
    contacts:[ //данные будут браться с сервера, изначально массив пустой
        //{
   //          id: v1(),
   //          fotoIcon:'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
   //          followed: true,
   //          fullName: 'Dmitry',
   //          status: 'I am boss',
   //          location: {city: 'Tbilisi', coutntry: 'Gorgia'}
   //      },
   //      {
   //          id: v1(),
   //          fotoIcon:'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
   //          followed: true,
   //          fullName: 'Sveta',
   //          status: 'I am junior',
   //          location: {city: 'Minsk', coutntry: 'Belarus'}
   //      },
   //      {
   //          id: v1(),
   //          fotoIcon:'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
   //          followed: true,
   //          fullName: 'Olga',
   //          status: 'I am fine',
   //          location: {city: 'Varshava', coutntry: 'Polska'}
   //      },
   //      {
   //          id: v1(),
   //          fotoIcon:'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
   //          followed: false,
   //          fullName: 'Natasha',
   //          status: 'Shit happens',
   //          location: {city: 'Moskow', coutntry: 'Rasha'}
   //      }
    ],
    pageSize:5,
    totalUserCount:40,
    actualPage:1,
    isFetching:false, //крутилка


}

export const contactsReducer=(state:ContactsStateType=initialState,action:ActionType):ContactsStateType=>{
    switch (action.type) {
        case 'FOLLOW': {
            return {...state,contacts:state.contacts.map(m=> m.id===action.userID ? {...m,followed:true} : m)} //меняет с false на true
        }
        case 'UN-FOLLOW':{
            return {...state,contacts:state.contacts.map(m=> m.id===action.userID  ?{...m,followed:false} : m)}//меняет с  true на false
        }
        case 'SET-USERS':{
            return {...state,contacts: action.users} //добавляем юзеров в пустой массив, добавляем к уже существующим(склеиваем два массива)
        }
        case  'ACTUAL-PAGE':{
            return {...state,actualPage:action.page}
        }
        case 'USER-TOTAL-COUNT':{
            return {...state,totalUserCount:action.page}
        }

        case 'CHANGE-FETCHING':{
            return {...state,isFetching:action.value}
        }
        default:
            return  state;
    }
}

export const followAC = (userID: string) => {  //чтоб определить какого юзера надо follow -мы должны из вне получить id нажатого юзера
    return {
        type: 'FOLLOW',
        userID,
    } as const
}

export const unFollowAC = (userID: string) => { //чтоб определить какого юзера надо unfollow -мы должны из вне получить id нажатого юзера
    return {
        type: 'UN-FOLLOW',
        userID,
    } as const
}
// // c cервера будем брать юзеров и добавлять в обьект=стейт:
export const setUsersAC = (users:Array<ContactsType>) => {
    return {
        type: 'SET-USERS',
        users,
    } as const
}
//делаем страницы кликабельными:
export const actualPageAC = (page:number) => {
    return {
        type: 'ACTUAL-PAGE',
        page,
    } as const
}

export const userTotalCountAC=(page:number) => {
    return {
        type: 'USER-TOTAL-COUNT',
        page,
    } as const
}

export const changeFetchingAC=(value:boolean) => {
    return {
        type: 'CHANGE-FETCHING',
        value,
    } as const
}

//Thunk-creator:

export const getUsersThunkCreator=(actualPage: number, pageSize: number)=>(dispatch:Dispatch)=>{
    dispatch( changeFetchingAC(true));//true-когда пошел запорос срабатывает крутилка
    getApiUsers(actualPage, pageSize).then(data=> { //get запрос
        dispatch(changeFetchingAC(false));//запрос пришел-крутилка отключилась
        //debugger //дебагером можем увидеть то что приходит в response .данные в data.
        dispatch(setUsersAC(data.items)); //этот путь к обьекту с данными мы увидели через дебагер
        dispatch(userTotalCountAC(data.totalCount));
    });
}
export const onPageChangeThunkCreator=(page: number, pageSize: number)=>(dispatch:Dispatch)=>{
    dispatch(actualPageAC(page));
    dispatch( changeFetchingAC(true));//true-когда пошел запорос срабатывает крутилка
    onPageChange(page,pageSize).then(data=> { //get запрос
        dispatch(changeFetchingAC(false));//запрос пришел-крутилка отключилась
        dispatch(setUsersAC(data.items)); //этот путь к обьекту с данными мы увидели через дебагер

    });
}

export const unfollowHandlerThunkCreator=(userID:string)=>(dispatch:Dispatch)=>{
    dispatch(followButtonTrueDisabledAC(userID)) //устанавливаем на кнопку disabled
    unfollowApi(userID).then(data=> { //get запрос
        if(data.resultCode===0){
            dispatch(unFollowAC(userID));
        }
        dispatch(followButtonFalseDisabledAC(userID)) //убираем disabled c кнопки по id
    })
}

export const followHandlerThunkCreator=(userID:string)=>(dispatch:Dispatch)=>{
    dispatch(followButtonTrueDisabledAC(userID)) //устанавливаем на кнопку disabled
    followApi(userID).then(data=> { //get запрос
        if(data.resultCode===0){
            dispatch(followAC(userID));
        }
        dispatch(followButtonFalseDisabledAC(userID)) //убираем disabled c кнопки по id
    })
}