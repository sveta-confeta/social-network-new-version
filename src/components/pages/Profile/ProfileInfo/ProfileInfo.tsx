import React from "react";
import s from './ProfileInfo.module.css';
import { useSelector} from "react-redux";
import {AppRootStateType} from "../../../../redux/redux-store";
import {ProfileUserType, } from "../../../../reducer/postReducer";


import logo from './../../../../images/User-PNG-Icon.png'
import {Preloader} from "../../../../Util/Preloader";
import {ProfileStatus} from "./ProfileStatus";


const ProfileInfo = () => {
    // let isFetching = useSelector<AppRootStateType, boolean>(state => state.contactsPage.isFetching);
    const users=useSelector<AppRootStateType,ProfileUserType | null>(state => state.profilePage.users);

    if (!users) {
        return <Preloader/>  //если нет профайла то крутилка ПРОВЕРКА на NULL
    }//потом разметка ниже
    return (

        <div>
            <img className={s.main_img} src={"https://pbs.twimg.com/profile_banners/2862249501/1415359067/1500x500" }
                 width="950" height="250"/>
            <div className={s.description_block}>
                <div className={s.person}>
                    <img className={s.logo}
                         src={users.photos.small !== null ? users.photos.small : logo}/>
                    <div className={s.name}>{users.fullName}</div>
                </div>
                <ProfileStatus status={'i love  front'}/>
                <div className={s.me}><span>About me:</span> {users.aboutMe}</div>
                <div className={s.contacts}>Contacts:</div>
                <ul className={s.contactsList}>
                    <li ><span>facebook:</span><a>{users.contacts.facebook}</a></li>
                    <li><span>website:</span><a>{users.contacts.website}</a></li>
                    <li><span>vk:</span><a>{users.contacts.vk}</a></li>
                    <li><span>githab:</span><a>{users.contacts.github}</a></li>
                    <li><span>twitter:</span><a>{users.contacts.twitter}</a></li>
                    <li><span>instagram:</span><a>{users.contacts.instagram}</a></li>
                    <li><span>youtube:</span><a>{users.contacts.youtube}</a></li>
                    <li><span>mainLink:</span><a>{users.contacts.mainLink}</a></li>
                </ul>

            </div>
            <div className={s.work} >Status:{users.lookingForAJobDescription}</div>


        </div>
    )
}

export default ProfileInfo;