import {userApi} from "../api/user-api";


const initialState = {
    peoples: [{
        id: "",
        email: "",
        name: "",
        status: "",
    }],
    loading: true,
    peopleShow: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_PEOPLE" : {
            return {
                ...state,
                peoples: [...action.payload],
                loading: false
            }
        }
        case "TOGGLE_LOADING" : {
            return {
                ...state,
                loading: action.payload.loading,
                peopleShow: action.payload.shows
            }
        }
        default :
            return state;
    }
}

export const actions = {
    getAllPeople: (users) => ({type: 'GET_ALL_PEOPLE', payload: users}),
    toggleLoading: (loading,shows) => ({type: 'TOGGLE_LOADING', payload: {loading,shows}}),
};

export const getAllUsers = () => (dispatch) => {
    const data = userApi.getAllPeoples();
    data.then(data => {
        if (data.status === 200) {
            data.json().then(data => {
                console.log(data)
                dispatch(actions.getAllPeople(data))
            })
        }
    })
}
export const toggleLoadingPeopleReducer = (loading,show = true) => (dispatch) => {
    dispatch(actions.toggleLoading(loading,show));
}

export default userReducer;