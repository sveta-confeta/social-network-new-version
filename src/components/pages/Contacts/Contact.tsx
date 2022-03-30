import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {ContactsType, followAC, setUsersAC, unFollowAC} from "../../../reducer/contactReducer";
import s from './Contact.module.css'
import {v1} from "uuid";

export const Contact = () => {
    const contacts = useSelector<AppRootStateType, Array<ContactsType>>(state => state.contactsPage.contacts);
    const dispatch=useDispatch();

    const unfollowHandler=(userID:string)=>{
        dispatch(unFollowAC(userID))
    }

    const followHandler=(userID:string)=>{
        dispatch(followAC(userID))
    }
    if(contacts.length===0) {
        dispatch(setUsersAC([
            {
                id: v1(),
                fotoIcon: 'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
                followed: true,
                fullName: 'Dmitry',
                status: 'I am boss',
                location: {city: 'Tbilisi', coutntry: 'Gorgia'}
            },
            {
                id: v1(),
                fotoIcon: 'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
                followed: true,
                fullName: 'Sveta',
                status: 'I am junior',
                location: {city: 'Minsk', coutntry: 'Belarus'}
            },
            {
                id: v1(),
                fotoIcon: 'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
                followed: true,
                fullName: 'Olga',
                status: 'I am fine',
                location: {city: 'Varshava', coutntry: 'Polska'}
            },
            {
                id: v1(),
                fotoIcon: 'https://sun9-1.userapi.com/c855724/v855724535/15854/dHNLGjoiM_0.jpg',
                followed: false,
                fullName: 'Natasha',
                status: 'Shit happens',
                location: {city: 'Moskow', coutntry: 'Rasha'}
            }
        ]))
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


            };

