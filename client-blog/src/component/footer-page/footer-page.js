import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        top:"0px"
    },
    footer: {
        textAlign:"center",
        width:"100%",
        bottom:"0px",
        height:"32px",
        position:"absolute",
        backgroundColor: "grey",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Grid>
                <Typography variant="body1">Maxim</Typography>
            </Grid>
        </div>
    );
}