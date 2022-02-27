import React from "react";
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <img className={s.main_img} src="https://pbs.twimg.com/profile_banners/2862249501/1415359067/1500x500"
                 width="950" height="250"/>
            <div className={s.description_block}>
                ava+description
            </div>

        </div>
    )
}

export default ProfileInfo;