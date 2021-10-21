
import {updateLikeCountUtils} from "./utils";
import {blogApi} from "../api/blog-api";
import {userApi} from "../api/user-api";


const initialState = {
    blog: [{
        id: "",
        title: "",
        text: "",
        date: "",
        image: "",
        likeCount: 0,
        likeUser: [],
        user: {id: "", name: ""}
    }],
    elements: 0,
    page: 0,
    imagePresent: {name: "", file: ""},
    iAmOnThePage: 1,
    loading: true,
    loadingLikeButton: false,
    infoMessage: "",

}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_ALL_BLOG':
            if (state.elements !== action.payload.elements) {
                return {
                    ...state,
                    blog: [...action.payload.blog],
                    elements: action.payload["count_element"],
                    page: action.payload["total_page"],
                    loading: false,
                }
            } else {
                return state;
            }
        case "PRESENTATIONS_IMAGE":
            return {
                ...state,
                imagePresent: {
                    name: action.payload.name,
                    file: action.payload.file
                }
            }
        case "ADD_LOADED_ITEMS": {
            return {
                ...state,
                blog: [...state.blog, ...action.payload.blogAndUserResponseDTOList],
                iAmOnThePage: state.iAmOnThePage + 1,
                loading: false
            }

        }
        case "TOGGLE_LOADING" : {
            return {
                ...state,
                loading: action.payload
            }
        }
        case "INFO_MESSAGE" : {
            return {
                ...state,
                infoMessage: action.payload
            }
        }
        case "UPDATE_LIKE": {
            return {
                ...state,
                blog: updateLikeCountUtils(action.payload.id, action.payload.userLogin, state.blog),
                loadingLikeButton: false,
            }
        }
        default :
            return state;
    }

}

export const actions = {
    pushAllBlog: (data) => ({type: 'FIND_ALL_BLOG', payload: data}),
    presentationImage: (files) => ({type: 'PRESENTATIONS_IMAGE', payload: files}),
    addLoadedItems: (data) => ({type: "ADD_LOADED_ITEMS", payload: data}),
    toggleLoading: (load) => ({type: "TOGGLE_LOADING", payload: load}),
    pushInfoMessage: (message) => ({type: "INFO_MESSAGE", payload: message}),
    updateLike: (id, userLogin) => ({type: "UPDATE_LIKE", payload: {id, userLogin}}),

};

export const presentationImageThunk = (files) => (dispatch) =>{
        dispatch(actions.presentationImage(files));
}

export const findAllBlog = () => (dispatch) => {
    let data = blogApi.findAllBlog();
    data.then(data => {
        console.log(data)
        if(data.status === 200){
            return data.json();
        }
    }).then(data => {
        console.log(data)
            dispatch(actions.pushAllBlog(data))
    })
}
export const givePresentationImage = (files) => (dispatch) => {
    const data = userApi.checkPresentationImage(files)
    data.then(data => {
        dispatch(actions.presentationImage(data))
    })
}

export const loadNewItemOutServer = (page = 1) => (dispatch) => {
    const response = blogApi.loadNewItemOutServerApi(page)
    response.then(data => {
        dispatch(actions.addLoadedItems(data));
    })
}
export const itemLoading = (load = true) => (dispatch) => {
    dispatch(actions.toggleLoading(load));
}
export const checkNewBlog = (countBlog) => (dispatch) => {

    let response = blogApi.checkNewBlogToServer(countBlog);
    response.then(data => {
        if (data.status === 200) {
            dispatch(actions.pushInfoMessage("У вас актуальные данные! =)"))
        } else if (data.status === 202) {
            data.json().then(data => {
                dispatch(actions.pushAllBlog(data))
            })
        }
    })
}

export const addLikeFromPostToServer = (id, userLogin) => (dispatch) => {
    let response = blogApi.addLikeApi(id);
    response.then(data => {
        if (data.status === 200) {
            dispatch(actions.updateLike(id, userLogin));
        }
    })
}

export default blogReducer;