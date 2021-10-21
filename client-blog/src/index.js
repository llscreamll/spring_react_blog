import React from 'react';
import ReactDom from 'react-dom';
import App from "./component/app/App";
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import ErrorBoundry from "./component/error/error-boundry";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from "./reducer/auth-reducer";
import blogReducer from "./reducer/blog-reducer";
import profileReducer from "./reducer/profile-reducer";
import thunk from "redux-thunk";
import userReducer from "./reducer/user-reducer";
import showUserReducer from "./reducer/item-user-reducer";

let rootReducer = combineReducers({
    authReducer: authReducer,
    blogReducer: blogReducer,
    profileReducer: profileReducer,
    peopleReducer: userReducer,
    showUserReducer : showUserReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <App/>
            </Router>
        </ErrorBoundry>
    </Provider>
    ,
    document.getElementById('root'));