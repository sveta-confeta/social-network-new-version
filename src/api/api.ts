import axios from "axios";

const instance=axios.create({
    withCredentials: true,
    headers: {'API-KEY': '3e3b94e9-b862-418d-a3ca-7d02a6b4250a'},
    baseURL:`https://social-network.samuraijs.com/api/1.0/`   //базовый урл автоматически приклеивается к строке
})

export const getApiUsers = (actualPage: number, pageSize: number) => {
    return instance.get(`users?page=${actualPage}&count=${pageSize}` )
        .then(response => response.data)  //возращаем из респонса только дату.теперь наш респонс в компоненте явдляется датой
}
export const onPageChange = (page:number, pageSize: number) => {
    return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${pageSize}`)
        .then(response=> response.data)
}

export const followApi = (userID: string) => {
    return instance.post(`follow/${userID}`,

    ) //withCredentials в пост 3им параметром и ключ с сайта
        .then(response => response.data)  //возращаем из респонса только дату.теперь наш респонс в компоненте явдляется датой
}

export const unfollowApi = (userID: string) => {
    return instance.delete(`follow/${userID}`)//withCredentials в делит и гет  2ым параметром
        .then(response => response.data)  //возращаем из респонса только дату.теперь наш респонс в компоненте явдляется датой
}


export const loginApi={
    meAuthApi(){
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    postLogin(data:DataLoginType){   //положить на сайт мои данные ,создать мои данные.POST запро
        return instance.post<PostStatus>(`auth/login`, data)
    },

    deleteLogin(){
        return instance.delete<PostStatus>(`auth/login`)

    }
}




export const profileApi={
    getProfileUsers(userID: string){
        return instance.get(`profile/` + userID)
            .then(response => response.data)  //возращаем из респонса только дату.теперь наш респонс в компоненте явдляется датой
    },

    getStatus(userID: string){
        return instance.get<string>(`profile/status/` + userID)
    },

    updateStatus(status:string){
        return instance.put<UpdateProfileType>(`profile/status`,{status:status})
            .then(response => response.data)
    }

}

type UpdateProfileType={
    resultCode: number
    messages: string[],
    data: {}
}

export type DataLoginType={
    email:string,
    password:string,
    rememberMe:boolean,

}
export type PutStatus={
    resultCode: number,
    messages: string[],
    data:{},
}
export type PostStatus={
    resultCode: number,
    messages: string[],
    data:{userId:number},
}
