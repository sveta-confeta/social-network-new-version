import {Dispatch} from "redux";
import {headerAuthThunkCreator} from "./authReducer";





export type AuthType = {
  error:string | null,
    initialized:boolean,
}


let initialState = {
  error:"error" || null,
    initialized:false,

}


export const appReducer = (state: AuthType = initialState, action: ActionType): AuthType => { //приходит не весь стейт, а только часть данных нужных этому редьюсеру
    //теперь у нас под именем state-  _state.profilePage
    switch (action.type) {

        case 'ERROR-API':{
            return {...state, error:action.value}
        }
        case 'INITIALIZED':{
            return {...state, initialized:action.value}
        }
        default:
            return state;

    }
}

type ActionType =ReturnType<typeof errorApiAC> | ReturnType<typeof initializedAC>;



export const errorApiAC = (value:string|null) =>
    ({type: 'ERROR-API', value} as const);

export const initializedAC = (value:boolean) =>
    ({type: 'INITIALIZED', value} as const);








