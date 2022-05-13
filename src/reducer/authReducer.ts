import {changeFetchingAC} from "./contactReducer";
import {Dispatch} from "redux";
import {headerMeAuthApi} from "../api/api";


let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,// не залогинены. не совпадают id email login
    followButtonAction: []//это свойство отвечает за то что кнопка во время запросв disabled.изначально false
//в [] айдишка того пользователя которого мы folow/unfolow
}


type AuthType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isFetching: boolean,
    isAuth: boolean,
    followButtonAction: string[],
}


type ActionType =
    setUserDataACType
    | changeFetchingACType
    | followButtonFalseDisabledACType
    | followButtonTrueDisabledACType;

type setUserDataACType = ReturnType<typeof setUserDataAC>
type changeFetchingACType = ReturnType<typeof changeFetchingAC>
type followButtonTrueDisabledACType = ReturnType<typeof followButtonTrueDisabledAC>
type followButtonFalseDisabledACType = ReturnType<typeof followButtonFalseDisabledAC>


export const authReducer = (state: AuthType = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {...state, ...action.data, isAuth: true}
        }
        case 'CHANGE-FETCHING': {
            return {...state, isFetching: action.value}
        }
        case 'FOLLOW-BUTTON-ACTION-PENDING': {
            return {...state, followButtonAction: [...state.followButtonAction, action.userID]}
        }
        case 'FOLLOW-BUTTON-ACTION-FALSE': {
            return {...state, followButtonAction: state.followButtonAction.filter(id => id !== action.userID)}
        }
        default:
            return state;
    }
}

export const setUserDataAC = (id: number,
                              login: string,
                              email: string,) => {
    return {
        type: 'SET-USER-DATA',
        data: {
            id,
            login,
            email,
        },
    } as const
}
export const followButtonTrueDisabledAC = (userID: string) => {
    return {
        type: 'FOLLOW-BUTTON-ACTION-PENDING',
        userID
    } as const
}

export const followButtonFalseDisabledAC = (userID: string) => {
    return {
        type: 'FOLLOW-BUTTON-ACTION-FALSE',
        userID
    } as const
}

export const headerAuthMeThunkCreator=() => (dispatch: Dispatch) => {
    dispatch(changeFetchingAC(true));
    headerMeAuthApi()
        .then(data => {
            dispatch(changeFetchingAC(false));
            if (data.resultCode === 0) {
                let {id, login, email} = data.data //деструктуризация
                dispatch(setUserDataAC(id, login, email))
            }
        })
}