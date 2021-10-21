import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import {connect} from "react-redux";
import {givePresentationImage, presentationImageThunk} from "../../reducer/blog-reducer";
import './add-new-item-to-blog.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            marginTop: '2%',
        },
    },
    rootImage: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',

    },
    button: {
        margin: theme.spacing(1),
    },
    divStyle: {
        display: 'flex',
        paddingTop: '2%',
        justifyContent: 'center',
    },
    imageStyle: {
        maxWidth: '40%',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
    inputStyle: {
        paddingTop: '2%'
    },

}));
const AddNewItemToBlog = ({pushUserBlog, image, givePresentationImage, presentationImageThunk}) => {
    const classes = useStyles();


    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [file, setFile] = useState("");


    let giveImage = (e) => {
        file = e.target.files;
        if (file.length !== 0 && (file[0].name.endsWith("jpg") || file[0].name.endsWith("png") || file[0].name.endsWith("gif"))) {
            setFile(file[0]);
            givePresentationImage(e.target.files);
        }
    }
    const sendNewPost = (e) => {
        e.preventDefault();
        pushUserBlog(title, text, file);
        presentationImageThunk(image = {name: "", file: ""})
        setText("");
        setTitle("");
        setFile("");
    }
    const checkBlogValue = (e) => {

        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case "title": {
                setTitle(e.target.value);
                break;
            }
            case "text": {
                setText(e.target.value);
                break;
            }
        }
    }
    let showImage = image.name !== "" ? <div className={classes.divStyle}>
        <img className={classes.imageStyle} src={`data:image/jpeg;base64,${image.file}`} alt=""/>
    </div> : "";


    return (
        <form className={classes.root} noValidate autoComplete="off" onChange={checkBlogValue}>
            <Grid container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center">
                <TextField
                    id="standard-multiline-flexible"
                    label="Title"
                    name="title"

                    multiline
                    maxRows={4}
                    value={title}
                />
                {showImage}
                <div className={classes.rootImage}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file"
                           onChange={giveImage}/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                </div>
                <TextField
                    id="outlined-textarea"
                    label="Text"
                    multiline
                    variant="outlined"
                    name="text"
                    maxRows={20}
                    value={text}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    onClick={sendNewPost}>
                    send
                </Button>
            </Grid>

        </form>
    )
}

let mapDispatchToProps = (state) => {
    return {image: state.blogReducer.imagePresent}
}

export default connect(mapDispatchToProps, {givePresentationImage, presentationImageThunk})(AddNewItemToBlog);