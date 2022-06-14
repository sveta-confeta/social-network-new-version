import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogReducer} from "../reducer/dialogReducer";
import {postReducer} from "../reducer/postReducer";
import {contactsReducer} from "../reducer/contactReducer";
import {authReducer} from "../reducer/authReducer";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../reducer/appReducer";


let rootReducer=combineReducers({//сюда поместим все редьюсеры
    profilePage:postReducer,
    dialogsPage:dialogReducer,
    contactsPage:contactsReducer,
    auth:authReducer,
    app:appReducer,
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export let store=createStore(rootReducer,applyMiddleware(thunkMiddleware));
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;