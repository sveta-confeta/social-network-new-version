
import {v1} from "uuid";



type followACType = ReturnType<typeof followAC>;
type unFollowACType = ReturnType<typeof unFollowAC>;
type setUsersACType= ReturnType<typeof setUsersAC>

type ActionType = followACType | unFollowACType  | setUsersACType;


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
    contacts: Array<ContactsType>
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
    ]

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
            return {...state,contacts: [...state.contacts, ...action.users]} //добавляем юзеров в пустой массив, добавляем к уже существующим(склеиваем два массива)
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