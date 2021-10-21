
import {updateLikeCountUtils} from "./utils";
import {blogApi} from "../api/blog-api";
import {userApi} from "../api/user-api";

const initialState = {
    blogProfile: [{
        id: "",
        title: "",
        text: "",
        date: "",
        image: "",
    }],
    loading: true,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_BLOG' :
            return {
                ...state,
                blogProfile: [...state.blogProfile, {...action.payload}],
                loading: false,
            }
        case 'LOADING_USER_BLOG' :
            return {
                ...state,
                blogProfile: [...action.payload],
                loading: false
            }
        case 'TOGGLE_LOADING' :
            return {
                ...state,
                loading: action.payload
            }
        case 'DELETE_BLOG' :
            return {
                ...state,
                blogProfile: [...state.blogProfile.filter(el => el.id !== action.payload)]
            }
        case 'ADD_LIKE_TO_BLOG' : {
            return {
                ...state,
                blogProfile: updateLikeCountUtils(action.payload.id, action.payload.login, state.blogProfile)
            }
        }

        default :
            return state;
    }
}

export const actions = {
    addNewBlog: (blog) => ({type: 'ADD_NEW_BLOG', payload: blog}),
    loadingUserBlog: (data) => ({type: 'LOADING_USER_BLOG', payload: data}),
    toggleLoading: (load = true) => ({type: 'TOGGLE_LOADING', payload: load}),
    deleteBlog: (id) => ({type: 'DELETE_BLOG', payload: id}),
    likeToUserBlog: (id, login) => ({type: 'ADD_LIKE_TO_BLOG', payload: {id, login}})

};

export const sendToServerNewPost = (title, text, file) => (dispatch) => {
    const data = blogApi.savePost(title, text, file)
    data.then(data => {
        if (data.status === 201) {
            console.log(data)
            return data.json()
        }
    }).then(newBlog => {
        dispatch(actions.addNewBlog(newBlog))
    })
}

export const getUserBlog = () => (dispatch) => {
    const result = blogApi.loadProfileBlog();

    result.then(data => {
        if (data.status === 200) {
            data.json().then(data => {
                console.log(data)
                dispatch(actions.loadingUserBlog(data));
            })
        }
    })
}

export const toggleLoading = (load) => (dispatch) => {
    dispatch(actions.toggleLoading(load))
}

export const deleteBlog = (id) => (dispatch) => {
    let response = blogApi.deleteBlog(id);
    console.log(id)
    response.then(data => {
        if (data.status === 200) {
            dispatch(actions.deleteBlog(id));
        }
    })
}
export const addLikeToMyBlog = (id, login) => (dispatch) => {
    dispatch(actions.likeToUserBlog(id, login));
}

export default profileReducer;