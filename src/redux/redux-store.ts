import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogReducer} from "../reducer/dialogReducer";
import {postReducer} from "../reducer/postReducer";
import {contactsReducer} from "../reducer/contactReducer";
import {authReducer} from "../reducer/authReducer";
import thunkMiddleware from 'redux-thunk'


let rootReducer=combineReducers({//сюда поместим все редьюсеры
    profilePage:postReducer,
    dialogsPage:dialogReducer,
    contactsPage:contactsReducer,
    auth:authReducer,
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export let store=createStore(rootReducer,applyMiddleware(thunkMiddleware));

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;