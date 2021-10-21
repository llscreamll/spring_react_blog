import React, {useEffect, useMemo, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {makeStyles} from "@material-ui/core/styles";
import {
    addLikeToMyBlog,
    deleteBlog,
    getUserBlog,
    sendToServerNewPost,
    toggleLoading
} from "../../reducer/profile-reducer";
import Loading from "../loading/loading-page";
import BlogItem from "../blog-page/blog-item";
import AddNewItemToBlog from "../add-new-item-to-blog/add-new-item-to-blog";
import {addLikeFromPostToServer} from "../../reducer/blog-reducer";
import TextField from "@material-ui/core/TextField";
import {pushNewUserStatus} from "../../reducer/auth-reducer";
import Button from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    iconStyle: {
        fontSize: "200px",
        color: "#3f51b5",
    },
    gridStyle: {
        textAlign: "end",
    },
    lentaStyle: {
        marginTop: "40px",
        textAlign: "center",
    },
    buttonStatus: {
        position: "relation",
        top: "15px",
        right: "5px",
    }
})

const ProfilePage = ({
                         blogs: {blogProfile, loading},
                         user: {userProfile: {email, login, name, status}, authorization},
                         getUserBlog, sendToServerNewPost, toggleLoading, deleteBlog, addLikeFromPostToServer, pushNewUserStatus, addLikeToMyBlog,}) => {
    const classes = useStyles();
    let [userStatus, setUserStatus] = useState(status);
    let [statusButton, setStatusButton] = useState(false);


    useEffect(() => {
        if(authorization){
            getUserBlog();
        }
    }, [blogProfile.length])


    const createShowElements = (blog) => {
        return blog;
    }

    const generateBlogs = useMemo(() => {
        return createShowElements(blogProfile)
    }, [blogProfile]);

    const pushUserBlog = (title, text, file) => {
        if (title.length > 0 && text.length > 0 && file.length !== 0) {
            toggleLoading(true)
            sendToServerNewPost(title, text, file);
        }
    }
    const removeBlog = (id) => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("ваш пост будет удален!");
        if (result) {
            deleteBlog(id);
        }
    }
    const checkNewStatus = (e) => {
        setUserStatus(e.target.value);
        setStatusButton(true);
    }

    const setNewUserStatus = () => {
        let newStatus = userStatus;
        if (newStatus !== null && newStatus.trim() !== "" && status !== newStatus) {
            pushNewUserStatus(newStatus);
            setStatusButton(false);
        }
    }
    const addLike = (id) => {
        addLikeFromPostToServer(id, login);
        addLikeToMyBlog(id, login);

    }

    if (!authorization) {
        return <Redirect to="login"/>
    }
    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              xl={12}
        >

            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} className={classes.gridStyle}>
                    <AssignmentIndIcon className={classes.iconStyle}>profile</AssignmentIndIcon>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant={"h4"}>Имя: {name}</Typography>
                    <Typography variant={"h4"}> Логин : {login}</Typography>
                    <Typography variant={"h4"}>Почта : {email}</Typography>
                    <TextField id="standard-basic" label="Status"
                               onChange={checkNewStatus}
                               value={userStatus !== "" ? userStatus : ""}
                    />
                    {statusButton ? <Button className={classes.buttonStatus}
                                            onClick={setNewUserStatus}><CheckIcon>ok</CheckIcon></Button> : ""}

                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography className={classes.lentaStyle} variant={"h4"}>Что нового:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <AddNewItemToBlog  pushUserBlog={pushUserBlog} />
                </Grid>
                {loading ? <Loading/> : generateBlogs.map(el => <Grid item xs={10} md={9} key={el.id}><BlogItem
                    data={el} myPost={true} addLike={addLike} userLogin={login} removeBlog={removeBlog}/></Grid>)}
            </Grid>


        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.profileReducer,
        user: state.authReducer,
    };
}
export default connect(mapStateToProps, {
    getUserBlog,
    sendToServerNewPost,
    toggleLoading,
    deleteBlog,
    addLikeFromPostToServer,
    pushNewUserStatus,
    addLikeToMyBlog
})(ProfilePage);