import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {
    actualPageAC,
    ContactsType,
    followAC,
    setUsersAC,
    unFollowAC,
    userTotalCountAC
} from "../../../reducer/contactReducer";
import s from './Contact.module.css'
import axios from "axios";
import userPfoto from './../../../images/User-PNG-Icon.png'

export const Contact =React.memo( () => {
    const contacts = useSelector<AppRootStateType, Array<ContactsType>>(state => state.contactsPage.contacts);
    const pageSize=useSelector<AppRootStateType, number>(state => state.contactsPage.pageSize);
    const userTotalCount=useSelector<AppRootStateType, number>(state => state.contactsPage.totalUserCount);
    const actualPage=useSelector<AppRootStateType, number>(state => state.contactsPage.actualPage);

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

    useEffect(()=>{
        // if(contacts.length===0){  //если контактов нет на странице, тогда...
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${actualPage}&count=${pageSize}`).then(response=>{
            debugger //дебагером можем увидеть то что приходит в response .данные в data.
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
    <ul className={s.ul}>
        {/*как узнать какая страница true(s.pagе класс выделяет нажатую страницу): добавить в initialState значение текущей страницы: actualPage*/}
        {pages.map((m,i)=> <li key={i} onClick={()=>changeActualPage(m)} className={actualPage===m ? s.page : ''}>{m}</li>)}
    </ul>
        {
            contacts.map(m => <div className={s.bodyContacts} key={m.id}>
                    <div className={s.icon}>
                        {/*если фото пришло с сервера-не null-то его опубликуй. в инном случае опубликуй аватарку(userPhoto)*/}
                        <img className={s.ava} src={m.photos.small !== null ? m.photos.small : userPfoto}/> <br/>
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

