import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {autUserRegister, errorRest} from "../../reducer/auth-reducer";
import {Redirect} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    error: {
        color: 'red',
        textAlign: 'center'
    }
}));

const RegisterPage = ({auth, errors,autUserRegister,errorRest}) => {

    const classes = useStyles();

    useEffect(() => {
        return () => {
            errorRest();
        }
    }, [])


    let [disabled, setDisabled] = useState(false);

    let [name, setName] = useState({
        value: "",
        error: true,
        message: ""
    });
    let [email, setEmail] = useState({
        value: "",
        error: true,
        message: ""
    });
    let [password, setPassword] = useState({
        value: "",
        error: true,
        message: ""
    });

    let [login, setLogin] = useState({
        value: "",
        error: true,
        message: ""
    });

    const pushRegisterData = (e) => {
        e.preventDefault();
        setDisabled(true);
        autUserRegister(name.value, login.value, email.value, password.value);
        // autUserRegister("Test", "Test", "test@email.ru", "testtest");
    }

    if (auth) {
        return <Redirect to="/profile"/>
    }
    const testDataRegister = (e) => {
        switch (e.target.name) {
            case "name": {
                let userName = e.target.value;
                if (userName.length <= 2 || userName.length >= 10) {
                    setName({
                        value: userName,
                        error: true,
                        message: "Имя должно быть от 3 до 20 символов"

                    })
                    setDisabled(true);
                } else {
                    setName({
                        error: false,
                        message: "",
                        value: userName
                    })
                    if (login.error || email.error || password.error) {
                        setDisabled(true);
                    } else {
                        setDisabled(false);
                    }
                }
                break;
            }
            case "login": {
                let userLogin = e.target.value;
                if (userLogin.length <= 2 || userLogin.length >= 10) {
                    setLogin({
                        value:userLogin,
                        error: true,
                        message: "Login должен быть от 3 до 10 символов"
                    })
                    setDisabled(true);
                } else {
                    setLogin({
                        error: false,
                        message: "",
                        value: userLogin
                    })
                    if (name.error || email.error || password.error) {
                        setDisabled(true);
                    } else {
                        setDisabled(false);
                    }
                }
                break;
            }
            case "password": {
                let userPassword = e.target.value;
                if (userPassword.length <= 5 || userPassword.length >= 50) {
                    setPassword({
                        value: userPassword,
                        error: true,
                        message: "Пароль должен быть от 5 до 50 символов"
                    })
                    setDisabled(true);
                } else {
                    setPassword({
                        error: false,
                        message: "",
                        value: userPassword
                    })
                    if (name.error || login.error || email.error) {
                        setDisabled(true);
                    } else {
                        setDisabled(false);
                    }
                }
                break;
            }
            case "email": {
                let userEmail = e.target.value;
                let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                let valid = reg.test(userEmail);

                if (userEmail.length <= 5 || userEmail.length >= 50 || !valid) {
                    setEmail({
                        value: userEmail,
                        error: true,
                        message: "Не валидный Email"
                    })
                    setDisabled(true);
                } else {
                    setEmail({
                        error: false,
                        message: "",
                        value: userEmail
                    })
                    if (name.error || login.error || password.error) {
                        setDisabled(true);
                    } else {
                        setDisabled(false);
                    }
                }
                break;
            }
            default: {
            }
        }
    }
    let errorMessage = errors.length > 0 ? errors.map(el => {
        return (
            <Alert key={el} variant={"filled"} severity="info">{el}</Alert>
        )
    }) : "";
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистация
                </Typography>
                <form className={classes.form} onChange={testDataRegister}>
                    <TextField
                        error={name.error}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name.value}
                    />
                    {name.message}
                    <TextField
                        error={login.error}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        value={login.value}
                    />
                    {login.message}
                    <TextField
                        error={email.error}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email.value}
                    />
                    {email.message}
                    <TextField
                        error={password.error}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password.value}
                    />
                    {password.message}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={disabled}
                        onClick={pushRegisterData}
                    >
                        Отправить
                    </Button>
                    {errorMessage}
                </form>
            </div>
        </Container>
    );
}

let mapStateToProps = (state) => {
    return {
        auth: state.authReducer.authorization,
        errors: state.authReducer.errorMessage
    };
}

export default connect(mapStateToProps, {autUserRegister,errorRest},)(RegisterPage);