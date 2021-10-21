import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import {useDispatch, useSelector} from "react-redux";
import authReducer, {userLogOut} from "../../../reducer/auth-reducer";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    linkStyle: {
        color: 'white',
        textDecoration: 'none'
    },

}));
const UserMenu = () =>{
    const classes = useStyles();

    let auth = useSelector(state => state.authReducer.authorization)
    let dispatch = useDispatch();
    let userName = useSelector(state => state.authReducer.userProfile.name)

    let logOut = () => {
        dispatch(userLogOut())
    }

    let link = !auth ? <>
            <Button color="inherit"><Link className={classes.linkStyle} to="/login"> Войти</Link></Button>
            <Button color="inherit"><Link className={classes.linkStyle} to="/register"> Регистрация</Link></Button>
        </>
        :
        <>
            <Button color="secondary" onClick={logOut}> выйти</Button>
        </>
    let user = auth ? <>
        <Typography variant={"h6"}>{userName}</Typography>
    </> : "";

    return (
        <Grid lg={3} item xs={"auto"}>
            <Hidden xsDown>
                {user}
                {link}
            </Hidden>
        </Grid>
    )
}

export default UserMenu;