import {changeFetchingAC} from "./contactReducer";


let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth:false,// не залогинены. не совпадают id email login
}


type AuthType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isFetching: boolean,
    isAuth:boolean,
}

type ActionType = setUserDataACType | changeFetchingACType;
type setUserDataACType = ReturnType<typeof setUserDataAC>
type changeFetchingACType=ReturnType<typeof changeFetchingAC>


export const authReducer = (state: AuthType = initialState, action: ActionType): AuthType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {...state,...action.data,isAuth:true}
            }
        case 'CHANGE-FETCHING':{
            return {...state,isFetching:action.value}
        }


        default:
            return state;
        }}

            export const setUserDataAC = (id: number,
                                          login: string,
                                          email: string,) => {
                return {
                    type: 'SET-USER-DATA',
                    data:{
                        id,
                        login,
                        email,},
                } as const
            }