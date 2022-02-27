import React, {useState} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {PostType, Profile} from "./components/pages/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import { Dialogs} from "./components/pages/Dialogs/Dialogs";
import {News} from "./components/pages/News/News";
import {Music} from "./components/pages/Music/Music";
import {Helping} from "./components/pages/Helping/Helping";
import {v1} from "uuid";


function App() {
    let[profilePosts,setprofilePosts]=useState<Array<PostType>>(  [
        {id: v1(), message: 'Hi, how are you?', count: 20},
        {id: v1(), message: 'What are you doing on Saturday?', count: 3},
        {id: v1(), message: 'By-by', count: 6},
    ])

    const addPost=(value:string)=>{
        let newPost= {id: v1(), message: value, count: 20};
        setprofilePosts([...profilePosts,newPost]);
    }
    const removePost=(id:string)=>{
        setprofilePosts(profilePosts.filter(f=> f.id!==id));
    }

    let dialogsItem= [
            {name: 'Dimych', id: 1},
            {name: 'Agafon', id: 2},
            {name: 'Mitrofan', id: 3},
            {name: 'Fedot', id: 4},
        ]
    let  messagesItem=[
            {text: 'Hi!!!', id: v1()},
            {text: 'Have you done motorcycle repairs?', id: v1()},
            {text: 'We are flying to Odessa tomorrow!', id: v1()},
        ]
    let friendsData=[

        {
            id: 1,
            name_friend: 'Diogen Motogonych',
            img_friend: 'https://i.pinimg.com/236x/b3/01/e6/b301e6ea3e8b0632c158010d38d21a60.jpg'

        },
        {
            id: 2,
            name_friend: 'Eldar Speed',
            img_friend: 'https://i.pinimg.com/236x/74/48/ba/7448ba2658e5bbfc4ed29a1460da922f.jpg'
        },
        {
            id: 3,
            name_friend: 'Masha NeVasha',
            img_friend: 'https://i.pinimg.com/236x/01/fb/3a/01fb3a6472c506046457517b2f2d9a4a--cafe-racer-girl-biker-chick.jpg'
        },

    ];

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar  friendsData={friendsData}/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/' element={<Profile profilePosts={profilePosts} addPost={addPost} removePost={removePost}/>}/>
                    <Route path='/dialogs/*' element={<Dialogs  dialogsItem={dialogsItem} messagesItem={messagesItem}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/helping' element={<Helping/>}/>
                    <Route path='/helping' element={<Helping/>}/>
                    {/*<Route path='*' element={<NotFoundPage/>}/> -если не найдены страницы можно оформить и отобразить эту компоненту*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
