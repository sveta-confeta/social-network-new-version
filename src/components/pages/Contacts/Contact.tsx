import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {
    actualPageAC, changeFetchingAC,
    ContactsType,
    followAC, getUsersThunkCreator, onPageChangeThunkCreator,
    setUsersAC,
    unFollowAC,
    userTotalCountAC
} from "../../../reducer/contactReducer";
import s from './Contact.module.css'
import userPfoto from './../../../images/User-PNG-Icon.png'
import {Preloader} from "../../../Util/Preloader";
import {NavLink} from "react-router-dom";
import {followApi, getApiUsers, onPageChange, unfollowApi} from "../../../api/api";
import {
    followButtonFalseDisabledAC,
    followButtonTrueDisabledAC
} from "../../../reducer/authReducer";

export const Contact = React.memo(() => {
    const contacts = useSelector<AppRootStateType, Array<ContactsType>>(state => state.contactsPage.contacts);
    const pageSize = useSelector<AppRootStateType, number>(state => state.contactsPage.pageSize);
    const userTotalCount = useSelector<AppRootStateType, number>(state => state.contactsPage.totalUserCount);
    const actualPage = useSelector<AppRootStateType, number>(state => state.contactsPage.actualPage);
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.contactsPage.isFetching);
    const followButtonAction=useSelector<AppRootStateType,string[] >(state => state.auth.followButtonAction)

    const dispatch = useDispatch();

    useEffect(() => {
        // if(contacts.length===0){  //если контактов нет на странице, тогда...
        dispatch(getUsersThunkCreator(actualPage, pageSize)); //get запрос юзеров
    }, []);

    const unfollowHandler = useCallback((userID: string) => {
        dispatch(followButtonTrueDisabledAC(userID)) //устанавливаем на кнопку disabled
        unfollowApi(userID).then(data => { //delete запрс
            if(data.resultCode===0){
                dispatch(unFollowAC(userID));
            }
            dispatch(followButtonFalseDisabledAC(userID)) //убираем disabled c кнопки по id
        })

    }, [dispatch, unFollowAC]);

    const followHandler = useCallback((userID: string) => {
        dispatch(followButtonTrueDisabledAC(userID)) //устанавливаем на кнопку disabled
        followApi(userID).then(data => {// пост запрос
            if(data.resultCode===0){
                dispatch(followAC(userID))
            }
            dispatch(followButtonFalseDisabledAC(userID)) //убираем disabled c кнопки по id
        })
    }, [dispatch, followAC]);

    let pagesCount = Math.ceil(userTotalCount / pageSize); //считаем количество страниц .делим всех юзеров на колич.юзеров на своей странице
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 20) {
            pages.push(i);  //чтоб было 20 страниц пока
        }

    }
    const changeActualPage = (page: number) => {
        dispatch(onPageChangeThunkCreator(page, pageSize)); // get запрос юзеров на страницу

    };

    return <div>
        {isFetching ? <Preloader/> : null}
        <ul className={s.ul}>
            {/*как узнать какая страница true(s.pagе класс выделяет нажатую страницу): добавить в initialState значение текущей страницы: actualPage*/}
            {pages.map((m, i) => <li key={i} onClick={() => changeActualPage(m)}
                                     className={actualPage === m ? s.page : ''}>{m}</li>)}
        </ul>
        {
            contacts.map(m => <div className={s.bodyContacts} key={m.id}>
                    <div className={s.icon}>
                        {/*если фото пришло с сервера-не null-то его опубликуй. в инном случае опубликуй аватарку(userPhoto)*/}
                        <NavLink to={'/profile/' + m.id}>
                            <img className={s.ava} src={m.photos.small !== null ? m.photos.small : userPfoto}/></NavLink>
                        <br/>

                        {m.followed ?
                            <button disabled={followButtonAction.includes(m.id)} onClick={() =>{
                                unfollowHandler(m.id)}}>Unfollow</button> :
                            <button disabled={followButtonAction.includes(m.id)} onClick={() => followHandler(m.id)}>Follow</button>}

                        {/*//если followed -тру, тогда пусть будет кнопка которая сменит его состояние на фалсе:*/}
                        {/*//  <button onClick={()=>unfollowHandler(m.id)}, в инном случае покажи кнопку followHandler(m.id)}*/}
                    </div>

                    <div className={s.info}>
                        <div className={s.infoText}>
                            <div className={s.nameUser}>{m.name}</div>
                            <p className={s.status}>{m.status}</p>
                        </div>

                        <div className={s.country}>{'m.location.coutntry'}</div>
                        <div className={s.city}>{'m.location.city'}</div>

                    </div>

                </div>
            )}
    </div>


});

