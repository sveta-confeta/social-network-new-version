import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {ContactsType, followAC, setUsersAC, unFollowAC} from "../../../reducer/contactReducer";
import s from './Contact.module.css'
import axios from "axios";
import userPfoto from './../../../images/User-PNG-Icon.png'

export const Contact =React.memo( () => {
    const contacts = useSelector<AppRootStateType, Array<ContactsType>>(state => state.contactsPage.contacts);
    const dispatch=useDispatch();

    const unfollowHandler=useCallback((userID:string)=>{
        dispatch(unFollowAC(userID))
    },[ dispatch,unFollowAC]);

    const followHandler=useCallback((userID:string)=>{
        dispatch(followAC(userID))
    },[ dispatch,followAC])
    if(contacts.length===0){  //если контактов нет на странице, тогда...
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response=>{
            debugger //дебагером можем увидеть то что приходит в response .данные в data.
            dispatch(setUsersAC(response.data.items)); //этот путь к обьекту с данными мы увидели через дебагер
        });
    }

    return  <div>
        {
            contacts.map(m => <div className={s.bodyContacts} key={m.id}>
                    <div className={s.icon}>
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

