import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        minWidth: "485px",
        marginTop: "30px",
    },
    top: {
        fontSize: 25,
        fontFamily: "cursive",
        marginBottom: "10px"
    },
    time: {
        fontFamily: "cursive",
        fontSize: 16,
        textAlign: "end",
    },
    cardActions: {
        marginTop: "100px",
    },
    buttonStileLike: {
        color: "red",
        fontSize: 30,
    },
    buttonStileDisLike: {
        color: "#C0C0C0",
        fontSize: 30,
    }
});


const BlogItem = ({data: {title, text, user = "", date, image, id, likeCount = 0, likeUser = []}, userLogin, myPost = false, removeBlog, addLike,auth=true}) => {


    let time = date.split(" ");

    const addLikeToPost = () => {
        addLike(id);
    }
    const checkDelete = () => {
        removeBlog(id)
    }

    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">

                        <Grid item>
                            <Typography className={classes.top} variant={"h5"}>{title} </Typography>
                        </Grid>

                        <Grid item>
                            <Typography className={classes.top} variant={"body1"}>
                                {user.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <img style={{width: "100%"}} src={`data:image/jpeg;base64,${image}`} alt=""/>
                            <Typography className={classes.time} variant={"h5"}>{time[0]}</Typography>
                            <Typography className={classes.time} variant={"h5"}>{time[1]}</Typography>
                        </Grid>

                        <Typography variant={"subtitle1"} component={"p"}>
                            {text}
                        </Typography>
                        <Grid item>
                            <Button className={classes.cardActions} color={"primary"} size="small">Читать
                                больше</Button>
                        </Grid>


                    </Grid>
                </CardContent>
            </Card>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button disabled={!auth} onClick={addLikeToPost}><FavoriteSharpIcon
                    className={likeUser.indexOf(userLogin) === -1 ? classes.buttonStileDisLike : classes.buttonStileLike}
                    values="10"/>{likeCount}</Button>
                {myPost ? <Button onClick={checkDelete}><DeleteIcon
                    className={classes.buttonStileLike}>удалить</DeleteIcon></Button> : ""}
            </Grid>
            <Grid>
                <h2>Коментарии</h2>
                <input type="text"/>
            </Grid>
        </>
    )
}

export default BlogItem;