import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import { Navbar} from "./components/Navbar/Navbar";
import { Profile} from "./components/pages/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/pages/Dialogs/Dialogs";
import {News} from "./components/pages/News/News";
import {Music} from "./components/pages/Music/Music";
import {Helping} from "./components/pages/Helping/Helping";
import {v1} from "uuid";
import {Contact} from "./components/pages/Contacts/Contact";

export type FriendItemType={
    id: string
    name_friend: string
    img_friend:string

}


function App() {

    let friendsData:Array<FriendItemType>=[
        {
            id: v1(),
            name_friend: 'Diogen Motogonych',
            img_friend: 'https://i.pinimg.com/236x/b3/01/e6/b301e6ea3e8b0632c158010d38d21a60.jpg'

        },
        {
            id: v1(),
            name_friend: 'Eldar Speed',
            img_friend: 'https://i.pinimg.com/236x/74/48/ba/7448ba2658e5bbfc4ed29a1460da922f.jpg'
        },
        {
            id: v1(),
            name_friend: 'Masha NeVasha',
            img_friend: 'https://i.pinimg.com/236x/01/fb/3a/01fb3a6472c506046457517b2f2d9a4a--cafe-racer-girl-biker-chick.jpg'
        },

    ]

    const addPost = (value: string) => {
        // let newPost= {id: v1(), message: value, count: 20};
        // setState({...state,profilePost:[...state.profilePost,newPost]});
        dispatchState(addPostAC(value))
    }
    const removePost = (id: string) => {
        // setState({...state,profilePost:state.profilePost.filter(f=> f.id!==id)});
        dispatchState(removePostAC(id))
    }
    const addDialogMessage = (value: string) => {
        // let newDialog={text: value, id: v1()};
        // setState({...state, messagesItem:[...state.messagesItem,newDialog]});
        dispatchState(addDialogMessageAC(value));
    }


    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friendsData={state.friendsData}/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/' element={<Profile profilePosts={state.profilePost} addPost={addPost}
                                                      removePost={removePost}/>}/>
                    <Route path='/dialogs/*'
                           element={<Dialogs dialogsItem={state.dialogsItem} messagesItem={state.messagesItem}
                                             addDialogMessage={addDialogMessage}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/helping' element={<Helping/>}/>
                    <Route path='/contacts' element={<Contact/>}/>
                    {/*<Route path='*' element={<NotFoundPage/>}/> -если не найдены страницы можно оформить и отобразить эту компоненту*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
