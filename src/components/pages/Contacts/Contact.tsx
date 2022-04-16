import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {
    actualPageAC, changeFetchingAC,
    ContactsType,
    followAC,
    setUsersAC,
    unFollowAC,
    userTotalCountAC
} from "../../../reducer/contactReducer";
import s from './Contact.module.css'
import axios from "axios";
import userPfoto from './../../../images/User-PNG-Icon.png'
import {Preloader} from "../../../Util/Preloader";
import {NavLink} from "react-router-dom";

export const Contact =React.memo( () => {
    const contacts = useSelector<AppRootStateType, Array<ContactsType>>(state => state.contactsPage.contacts);
    const pageSize=useSelector<AppRootStateType, number>(state => state.contactsPage.pageSize);
    const userTotalCount=useSelector<AppRootStateType, number>(state => state.contactsPage.totalUserCount);
    const actualPage=useSelector<AppRootStateType, number>(state => state.contactsPage.actualPage);
    const isFetching=useSelector<AppRootStateType, boolean>(state => state.contactsPage.isFetching);

    const dispatch=useDispatch();

    const unfollowHandler=useCallback((userID:string)=>{
        dispatch(unFollowAC(userID))
    },[ dispatch,unFollowAC]);

    const followHandler=useCallback((userID:string)=>{
        dispatch(followAC(userID))
    },[ dispatch,followAC])

    let pagesCount=Math.ceil(userTotalCount/pageSize); //считаем количество страниц
    let pages=[];
    for(let i=1;i<=pagesCount;i++){
        if(i<=20){
            pages.push(i);
        }

    }

    const changeFetching=(value:boolean)=>{
        dispatch( changeFetchingAC(value));
    }

    useEffect(()=>{
        // if(contacts.length===0){  //если контактов нет на странице, тогда...
             changeFetching(true);//true-когда пошел запорос срабатывает крутилка
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${actualPage}&count=${pageSize}`).then(response=>{
            changeFetching(false);//запрос пришел-крутилка отключилась
            //debugger //дебагером можем увидеть то что приходит в response .данные в data.
            dispatch(setUsersAC(response.data.items)); //этот путь к обьекту с данными мы увидели через дебагер
            dispatch(userTotalCountAC(response.data.totalCount));
        });
        // }
    },[]);





       const  changeActualPage=(page:number)=>{
            dispatch(actualPageAC(page));
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${pageSize}`).then(response=>{
                //debugger //дебагером можем увидеть то что приходит в response .данные в data.
                dispatch(setUsersAC(response.data.items)); //этот путь к обьекту с данными мы увидели через дебагер
            });
        };

       return  <div>
           {isFetching ? <Preloader/> : null}
    <ul className={s.ul}>
        {/*как узнать какая страница true(s.pagе класс выделяет нажатую страницу): добавить в initialState значение текущей страницы: actualPage*/}
        {pages.map((m,i)=> <li key={i} onClick={()=>changeActualPage(m)} className={actualPage===m ? s.page : ''}>{m}</li>)}
    </ul>
        {
            contacts.map(m => <div className={s.bodyContacts} key={m.id}>
                    <div className={s.icon}>
                        {/*если фото пришло с сервера-не null-то его опубликуй. в инном случае опубликуй аватарку(userPhoto)*/}
                        <NavLink to={'/profile/' + m.id}>
                        <img className={s.ava} src={m.photos.small !== null ? m.photos.small : userPfoto}/></NavLink> <br/>
                        {m.followed ? <button onClick={()=>unfollowHandler(m.id)}>Unfolow</button>: <button onClick={()=>followHandler(m.id)}>Follow</button> }
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

