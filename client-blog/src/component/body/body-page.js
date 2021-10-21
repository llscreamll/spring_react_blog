import React from "react";
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import NavBar from "../nav-bar/nav-bar";
import {Route, Switch} from "react-router-dom";
import ProfilePage from "../my-profile/my-profile";
import BlogPage from "../blog-page/blog-page";
import RegisterPage from "../register/register-page";
import Login from "../login/login";
import {makeStyles} from "@material-ui/core/styles";
import Favorite from "../favorite-page/favorite-page";
import PeoplePage from "../people-page/user-page";
import ProfilePeoplePage from "../profile-people-page/profile-people-page";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh'
    }
}));

const Body = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            irection="row"
            className={classes.root}>
            <Hidden smDown>
                <Grid item xs={1} md={2}>
                    <NavBar/>
                </Grid>
            </Hidden>

            <Grid item sm={12} xs={11} md={10}>
                <Switch>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/blog" component={BlogPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/favorite" component={Favorite}/>
                    <Route exact path="/user/:id" component={ProfilePeoplePage}/>
                    <Route path="/user/" component={PeoplePage}/>
                </Switch>
            </Grid>

        </Grid>
    )
}

export default Body;