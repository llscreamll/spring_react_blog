import React from "react";
import Grid from "@material-ui/core/Grid";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {Link, withRouter} from "react-router-dom";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {makeStyles} from "@material-ui/core/styles";
import PeopleIcon from '@material-ui/icons/People';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        backgroundColor: "#3f51b5"
    },
    buttonAction: {
        fontSize: 30,
        color: 'white'
    },
    activeLink: {
        color: "gold"
    },
}));


const MenuPanel = ({location}) => {
    const classes = useStyles();

    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let path = {
        blog: "/blog",
        profile: "/profile",
        favorite: "/favorite",
        user: "/user"
    }

    return (
        <Grid item lg={6} xs={"auto"}>


            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>

                <BottomNavigationAction style={{color: "white"}}
                                        label="Профиль"
                                        value="профиль"
                                        component={Link}
                                        to={path.profile}
                                        icon={<AccountBoxIcon
                                            className={`${classes.buttonAction} ${location.pathname === path.profile ? classes.activeLink : ""}`}/>}/>
                <BottomNavigationAction style={{color: "white"}}
                                        component={Link}
                                        to={path.blog}
                                        label="Посты"
                                        value="посты"
                                        icon={<LocalLibraryIcon
                                            className={`${classes.buttonAction} ${location.pathname === path.blog ? classes.activeLink : ""}`}/>}
                />

                <BottomNavigationAction style={{color: "white"}}
                                        label="Лучшие"
                                        value="лучшие"
                                        component={Link}
                                        to={path.favorite}
                                        icon={<FavoriteIcon
                                            className={`${classes.buttonAction} ${location.pathname === path.favorite ? classes.activeLink : ""}`}/>}/>
                <BottomNavigationAction style={{color: "white"}}
                                        label="Люди"
                                        value="люди"
                                        component={Link}
                                        to={path.user}
                                        icon={<PeopleIcon
                                            className={`${classes.buttonAction} ${location.pathname === path.user ? classes.activeLink : ""}`}/>}/>



            </BottomNavigation>


        </Grid>
    )
}

export default withRouter(MenuPanel);