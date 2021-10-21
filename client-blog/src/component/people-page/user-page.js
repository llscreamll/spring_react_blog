import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAllUsers, toggleLoadingPeopleReducer} from "../../reducer/user-reducer";
import UserItem from "./user-item";
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Redirect} from "react-router-dom";
import Loading from "../loading/loading-page";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "center",
    },
}));

const UserPage = ({getAllUsers, peoples, loading,auth}) => {


    const [userId, setUserId] = useState("");
    const classes = useStyles();
    useEffect(() => {
        if (auth) {
            getAllUsers();
        }
    }, [auth])

    const showUserById = (id) => {
        setUserId(id);
    }
if(!auth){
    return <Redirect to="/login"/>
}
    if (userId !== "") {
        return <Redirect to={`/user/${userId}`}/>
    }
    if (loading) {
        return <Loading/>
    }
    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.root}
        >
            {peoples.map(el => <Grid item sm={6} lg={3} key={el.id}><UserItem peoples={el}
                                                                              showUserById={showUserById}/></Grid>)}
        </Grid>
    )
}
let mapStateToProps = (state) => {
    return {
        peoples: state.peopleReducer.peoples,
        loading: state.peopleReducer.loading,
        peopleShow: state.peopleReducer.peopleShow,
        auth: state.authReducer.authorization
    }
};


export default connect(mapStateToProps, {getAllUsers, toggleLoadingPeopleReducer})(UserPage);