import React, {useEffect} from 'react';
import Header from "../header/header-page";
import {connect, useDispatch} from "react-redux";
import {initialization} from "../../reducer/auth-reducer";
import {makeStyles} from "@material-ui/core/styles";
import Body from "../body/body-page";


const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: "scroll",
    }
}));

const App = () => {

    let classes = useStyles();
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialization());
    }, [dispatch])

    return (
        <div className={classes.root}>
            <Header />
            <Body />
            {/*<Footer />*/}
        </div>
    );
}
export default App;
