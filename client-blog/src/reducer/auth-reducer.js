import {authAndRegisterUrl} from "../api/auth-register-api";
import {removeTokenUser, setTokenUser, TOKEN_USER} from "../api/api-сonst";
import {userApi} from "../api/user-api";

const initialState = {
    userProfile: {
        id : "",
        name: "",
        login: "",
        email: "",
        status: "",
    },
    blogProfile:[],
    errorMessage: [],
    authorization: false,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_INITIALIZATION' :
            return {
                ...state,
                userProfile: action.payload,
                errorMessage: [],
                authorization: true
            }
        case 'UPDATE_STATUS' : {
            return {
                ...state,
                userProfile: {...state.userProfile, status: action.payload},
                loading: false,
            }
        }
        case 'USER_LOGOUT' :
            return {
                ...state,
                userProfile: {
                    name: "",
                    login: "",
                    email: "",
                    status: ""
                },
                authorization: false
            }
        case 'ERROR_MESSAGE' : {
            return {
                ...state,
                userProfile: {...state.userProfile},
                errorMessage: [...action.payload]
            }
        }
        case 'ERROR_RESET':
            return {
                ...state,
                errorMessage: []
            }

        default :
            return state;
    }

}

export const actions = {
    indicationUser: (id, name, email, login, status) => ({
        type: 'USER_INITIALIZATION',
        payload: {id, name, email, login, status}
    }),
    pushErrorMessage: (message) => ({type: 'ERROR_MESSAGE', payload: message}),
    exitUser: () => ({type: 'USER_LOGOUT'}),
    errorReset: () => ({type: "ERROR_RESET"}),
    updateStatus: (status) => ({type: "UPDATE_STATUS", payload: status})
};

export const autUserRegister = (name, login, email, password) => (dispatch) => {
    authAndRegisterUrl.userRegistration(name, login, email, password)
        .then(data => {
            if (data.status === 404) {
                data.json().then(message => {
                    let error;
                    error = Object.entries(message);
                    dispatch(actions.pushErrorMessage(error))

                })
            } else if (data.status === 201) {
                data.json().then(data => {
                    let {id, name, email, login, token} = data;
                    setTokenUser(token);
                    dispatch(actions.indicationUser(id, name, email, login))
                })
            }
        });

}

export const initialization = () => (dispatch) => {
    setTokenUser();
    if (TOKEN_USER !== null && TOKEN_USER !== undefined && TOKEN_USER.length > 5) {
        authAndRegisterUrl.initialization(TOKEN_USER)
            .then(data => {
                if (data.status === 200) {
                    data.json().then(data => {
                        if (data !== null && data !== undefined) {
                            let {id, name, email, login, status} = data;
                            dispatch(actions.indicationUser(id, name, email, login, status))
                        }
                    });
                }
            });
    }
}
export const checkLoginDataThunk = (login, password) => (dispatch) => {
        authAndRegisterUrl.checkUserByLoginAndPassword(login, password)
            .then(data => {
                if (data.status === 200) {
                    data.json().then(data => {
                        let {id, name, email, login, token,status} = data;
                        setTokenUser(token);
                        dispatch(actions.indicationUser(id, name, email, login,status))
                    })
                } else {
                    data.json().then(data => {
                        dispatch(actions.pushErrorMessage(data.message))
                    })
                }
            })
}

export const pushNewUserStatus = (status) => (dispatch) => {
    let response = userApi.setStatus(status);
    response.then(resp => {
        if (resp.status === 200) {
            dispatch(actions.updateStatus(status))
        }
    })
}
export const userLogOut = () => (dispatch) => {
    removeTokenUser();
    dispatch(actions.exitUser())
}
export const errorRest = () => (dispatch) => {
    dispatch(actions.errorReset());
}



export default authReducer;