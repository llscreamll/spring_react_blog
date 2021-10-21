import {userApi} from "../api/user-api";
import {updateLikeCountUtils} from "./utils";


const initialState = {
    user: {
        id: "",
        email: "",
        name: "",
        status: "",
    },
    blogs: [],
    loading: true,
}

const showUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_USER" : {
            return {
                ...state,
                user: action.payload.user,
                blogs: action.payload.blog,
                loading: false
            }
        }
        case "UPDATE_LIKE_COUNT": {
            return {
                ...state,
                blogs: updateLikeCountUtils(action.payload.id,action.payload.userLogin,state.blogs)
            }
        }
        case "TOGGLE_LOADING": {
            return {
                ...state,
                loading: action.payload,
            }
        }
        default :
            return state;
    }
}

export const actions = {
    showUserById: (data) => ({type: 'SHOW_USER', payload: data}),
    updateLikeCount: (id, userLogin) => ({type: 'UPDATE_LIKE_COUNT', payload: {id, userLogin}}),
    toggleLoading: (loading) => ({type: 'TOGGLE_LOADING', payload: loading })
};

export const getUserById = (id) => (dispatch) => {
    const data = userApi.getUserById(id);
    console.log("userById")
    data.then(data => {
        if (data.status === 200) {
            data.json().then(data => {
                console.log(data)
           dispatch(actions.showUserById(data));
            })
        }
    })
}
export const updateLikeCount = (id, userLogin) => (dispatch) => {
    dispatch(actions.updateLikeCount(id, userLogin));
}


export default showUserReducer;