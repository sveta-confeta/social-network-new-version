import axios from "axios";

const instance=axios.create({
    withCredentials: true,
    headers: {'API-KEY': '06ccb261-83c8-42d1-935e-fdc7e7fd8b48'},
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

export const profileApi = (userID: string) => {
    return instance.get(`profile/` + userID)
        .then(response => response.data)  //возращаем из респонса только дату.теперь наш респонс в компоненте явдляется датой
}