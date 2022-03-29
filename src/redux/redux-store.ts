import {combineReducers, createStore} from "redux";
import {dialogReducer} from "../reducer/dialogReducer";
import {postReducer} from "../reducer/postReducer";
import {contactsReducer} from "../reducer/contactReducer";


let rootReducer=combineReducers({//сюда поместим все редьюсеры
    profilePage:postReducer,
    dialogsPage:dialogReducer,
    contactsPage:contactsReducer,
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export let store=createStore(rootReducer);

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;