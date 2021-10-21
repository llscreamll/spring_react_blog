import React from 'react'
import {NavLink, withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles((theme) => ({
    nav: {
        top: "0px",
        position: "sticky",
        padding: "20px",
        marginLeft: "25px",
        textAlign: "start",
    },
    block: {
        width: "200px",
        height: "100%",
        background: "#3f51b5",
        boxShadow: "1px 1px 5px 2px rgb(0, 1, 14)",
    },
    item: {
        color: "white",
        textDecoration: "none",
        fontSize: "20px",
        transition: "0.3s all",
        fontFamily: "Comic Sans MS",

    },
    friendsOption: {
        marginTop: "100px",
        padding: "10px",
        display: "flex",
    },
    itemBlock: {
        marginTop: "10px"
    },
    activeLink: {
        color: "gold"
    },
    iconStyle: {
        marginLeft: "-40px",
        top: "10px",
        fontSize: "35px",
        right: "5px",
        position: "relative"
    }
}));
let path = {
    profile: "/profile",
    blog: "/blog",
    favorite: "/favorite",
    user: "/user"
}
const NavBar = ({location}) => {
    const classes = useStyles();
    return (
        <div className={classes.block}>
            <Grid className={classes.nav}
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start">
                <nav>
                    <div>
                        <Button className={classes.itemBlock}
                                variant="outlined" color="primary"
                        >
                            <NavLink className={classes.item} to={path.profile} exact
                                     activeClassName={location.pathname === path.profile ? classes.activeLink : ""}>
                                <AccountBoxIcon className={classes.iconStyle}>profile</AccountBoxIcon>
                                Профиль
                            </NavLink>
                        </Button>

                        <Button className={classes.itemBlock}
                                variant="outlined" color="primary"
                        >
                            <NavLink className={classes.item} to={path.blog} exact
                                     activeClassName={location.pathname === path.blog ? classes.activeLink : ""}>
                                <LocalLibraryIcon className={classes.iconStyle}>bool</LocalLibraryIcon>
                                Посты
                            </NavLink>
                        </Button>
                        <Button className={classes.itemBlock}
                                variant="outlined" color="primary"
                        >
                            <NavLink className={classes.item} to={path.favorite} exact
                                     activeClassName={location.pathname === path.favorite ? classes.activeLink : ""}>
                                <FavoriteIcon className={classes.iconStyle}>bool</FavoriteIcon>
                                лучшие
                            </NavLink>
                        </Button>
                        <Button className={classes.itemBlock}
                                variant="outlined" color="primary"
                        >
                            <NavLink className={classes.item} to={path.user} exact
                                     activeClassName={location.pathname === path.user ? classes.activeLink : ""}>
                                <PeopleIcon className={classes.iconStyle}>bool</PeopleIcon>
                                Люди
                            </NavLink>
                        </Button>
                    </div>

                </nav>
            </Grid>
        </div>
    )
}

export default withRouter(NavBar);