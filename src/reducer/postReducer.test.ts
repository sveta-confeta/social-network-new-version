import {addPostAC, postReducer} from "./postReducer";
import {v1} from "uuid";


test('new post should be added',()=>{
    //tested case "add post"
    const state = {
        posts: [
            {id: v1(), message: 'Hi, how are you?', count: 20},
            {id: v1(), message: 'What are you doing on Saturday?', count: 3},
            {id: v1(), message: 'By-by', count: 6},],
        users: null,
        status: '',
    }
    let action=addPostAC('react=developer')
    let newState=postReducer(state,action);

    expect(newState.posts.length).toBe(4)

    });