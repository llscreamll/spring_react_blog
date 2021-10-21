import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import defaultIMG from "../../img/defaultIMG.png";


const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        marginTop:"40px",
        position:"relative",
        left:"50px",
    },
});

const UserItem = ({peoples,showUserById}) => {
    const classes = useStyles();

   const getUserById = () =>{
       showUserById(peoples.id)
   }

    return (
        <Card className={classes.root} onClick={getUserById}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={peoples.img === undefined ? defaultIMG : ""}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {peoples.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {peoples.status !== "" ? peoples.status : "no status"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}



export default UserItem;