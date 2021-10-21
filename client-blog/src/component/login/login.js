import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {connect, useDispatch} from "react-redux";
import {checkLoginDataThunk, errorRest} from "../../reducer/auth-reducer";
import {Redirect} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({auth, errors}) => {
        const classes = useStyles();

        let dispatch = useDispatch();
        let [redirect, setRedirect] = useState(false);
        let [login, setLogin] = useState("");
        let [password, setPassword] = useState("");

        let checkLoginData = (e) => {
            e.preventDefault();
            let promise = dispatch(checkLoginDataThunk(login, password));
            if (promise) {
                return <Redirect to="/"/>
            }
        }

        useEffect(() => {
            return () => {
                dispatch(errorRest());
            }
        }, [dispatch])

        let inputCheck = (e) => {
            switch (e.target.name) {
                case 'login': {
                    setLogin(e.target.value)
                    break;
                }
                case "password" : {
                    setPassword(e.target.value)
                    break;
                }
                default : {
                }
            }
        }
        if (redirect) {
            return <Redirect to="/register"/>
        }
        if (auth) {
            return <Redirect to="/profile"/>
        }

        let errorMessage = errors.length > 0 ? <Alert variant={"filled"} severity="info">{errors.join("")}</Alert> : "";

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onChange={inputCheck}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Login"
                                name="login"
                                autoComplete="login"
                                autoFocus
                                value={login}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={checkLoginData}
                            >
                                Войти
                            </Button>
                            {errorMessage}
                            <Grid container>
                            </Grid>
                        </form>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => {
                                setRedirect(true)
                            }}
                        >
                            Регистрация
                        </Button>
                    </div>
                </Grid>
            </Grid>
        );
    }
;

let mapStateToProps = (state) => {
    return {
        auth: state.authReducer.authorization,
        errors: state.authReducer.errorMessage
    }
}
export default connect(mapStateToProps)(Login);
