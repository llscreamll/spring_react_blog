import React, {useEffect, useMemo, useState} from 'react';
import {Grid} from "@material-ui/core";
import {connect, useDispatch,} from "react-redux";
import BlogItem from "./blog-item";
import {
    actions,
    addLikeFromPostToServer,
    checkNewBlog,
    findAllBlog,
    loadNewItemOutServer
} from "../../reducer/blog-reducer";
import Loading from "../loading/loading-page";
import UpdateIcon from '@material-ui/icons/Update';
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {makeStyles} from "@material-ui/core/styles";
import {Alert} from "@material-ui/lab";
import {toggleLoading} from "../../reducer/profile-reducer";


const useStyles = makeStyles(theme => ({
    animatedItem: {
        marginTop: "30px",
        width: "40px",
        height: "40px",
        animation: `$myEffect 2000ms ${theme.transitions.duration.shortest}`
    },
    "@keyframes myEffect": {
        "0%": {
            opacity: 1,
            transform: "translateY(0%)"
        },
        "25%": {
            opacity: 1,
            transform: "translateY(-50%)"
        },
        "50%": {
            opacity: 1,
            transform: "translateY(-50%)"
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)"
        }
    },
    animatedRotate: {
        marginTop: "10px",
        width: "30px",
        height: "30px",
    },

    animatedItemRotate: {
        marginTop: "10px",
        width: "30px",
        height: "30px",
        animation: `$rotate 2000ms ${theme.transitions.duration.shortest}`
    },
    "@keyframes rotate": {
        "0%": {
            transform: "rotate(-360deg)"
        },
        "100%": {
            transform: "rotate(-0deg)"
        }
    },
    alertMessage: {
        position: "absolute",
        animation: `$infoMessage 3300ms ${theme.transitions.duration.shorter}`

    },
    "@keyframes infoMessage": {
        "0%": {
            top: "4%",
            left: "50%"
        },
        "25%": {
            top: "15%",
            left: "50%"
        },
        "50%": {
            top: "15%",
            left: "50%"
        },
        "75%": {
            top: "15%",
            left: "50%"
        },
        "100%": {
            top: "4%",
            left: "50%"
        }

    },
}));


const BlogPage = ({blogs: {blog, loading, page, iAmOnThePage, elements, infoMessage},
                      auth, userLogin, findAllBlog, loadNewItemOutServer, checkNewBlog, addLikeFromPostToServer}) => {
    const classes = useStyles();
    let interval;
    let [styleLoad, setStyleLoad] = useState(false);
    let dispatch = useDispatch();

    const clearIntervalAndMessage = () => {
        setStyleLoad(false);
        dispatch(actions.pushInfoMessage(""));
    }

    function createShowElements(blog) {
        return blog;
    }

    const generateBlogs = useMemo(() => {
        return createShowElements(blog)
    }, [blog]);


    useEffect(() => {
        if (blog.length === 1) {
            findAllBlog();
        } else if (blog.length > 1) {
            dispatch(toggleLoading(false));
        }

        return (() => {
            clearTimeout(interval);
            clearIntervalAndMessage();
        })

    }, [blog.length])


    const updateBlog = () => {
        setStyleLoad(true);
        checkNewBlog(elements);
        interval = setTimeout(() => {
            clearIntervalAndMessage();

        }, 3300)
    }
    const loadNewItems = () => {

        if (iAmOnThePage <= page) {
            loadNewItemOutServer(iAmOnThePage);
        }
    }
    const addLike = (id) => {
        addLikeFromPostToServer(id, userLogin);
    }


    if (loading) {
        return <Loading/>
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.startStyle}>
            <Button onClick={updateBlog}><UpdateIcon
                className={styleLoad ?
                    classes.animatedItemRotate :
                    classes.animatedRotate}>load</UpdateIcon>
            </Button>
            {infoMessage !== "" ?
                <Alert className={classes.alertMessage} severity="success"><strong>{infoMessage}</strong></Alert> : ""}
            {generateBlogs.map(el => <Grid item xs={10} md={9} key={el.id}><BlogItem data={el} userLogin={userLogin}
                                                                                     myPost={false} auth={auth} addLike={addLike}/></Grid>)}
            {iAmOnThePage >= page ? "" :
                <Button disabled={loading} onClick={loadNewItems}> <ArrowDownwardIcon className={classes.animatedItem}>load
                    new item</ArrowDownwardIcon></Button>}
        </Grid>
    );
}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogReducer,
        userId: state.authReducer.userProfile.id,
        auth: state.authReducer.authorization,
        userLogin: state.authReducer.userProfile.login
    };
}


export default connect(mapStateToProps, {
    loadNewItemOutServer,
    findAllBlog,
    checkNewBlog,
    toggleLoading,
    addLikeFromPostToServer
})(BlogPage);