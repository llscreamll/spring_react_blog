import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserById, updateLikeCount} from "../../reducer/item-user-reducer";
import Loading from "../loading/loading-page";
import {Grid} from "@material-ui/core";
import BlogItem from "../blog-page/blog-item";
import {addLikeFromPostToServer} from "../../reducer/blog-reducer";

const ProfilePeoplePage = ({match, user, blog, getUserById, loading, addLikeFromPostToServer, authUser, updateLikeCount}) => {
    let param = Number(match.params.id);

    useEffect(() => {
            getUserById(param)
    }, [])

    const addLike = (id) => {
        addLikeFromPostToServer(id, authUser);
        updateLikeCount(id, authUser);
    }
    console.log(loading)
    console.log(user.name + " user")
    console.log(blog + " blog")
    if (loading) {
        return <Loading/>
    }



    return (
        <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.status}</div>

            {blog.length >= 1 ? blog.map(el => <Grid item xs={10} md={9} key={el.id}><BlogItem
                data={el} myPost={false} userLogin={authUser} addLike={addLike}/></Grid>) : <div>no blogs</div>}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.showUserReducer.user,
        blog: state.showUserReducer.blogs,
        loading: state.showUserReducer.loading,
        authUser: state.authReducer.userProfile.login,
    }
}

export default connect(mapStateToProps, {getUserById, addLikeFromPostToServer, updateLikeCount})(ProfilePeoplePage);