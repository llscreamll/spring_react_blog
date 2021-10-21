import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import MusicMenu from "./menu/music-menu";
import MenuPanel from "./menu/menu-panel";
import UserMenu from "./menu/user-menu";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        backgroundColor: "#3f51b5"
    },
    toolBar: {
        color: 'white',
        backgroundColor: "#3f51b5"
    }
}));

export default function Header() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="relative" className={classes.toolBar}>
                <Toolbar>
                    <Grid container
                          spacing={1}
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between">

                        <MusicMenu />
                        <MenuPanel />
                        <UserMenu />

                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}