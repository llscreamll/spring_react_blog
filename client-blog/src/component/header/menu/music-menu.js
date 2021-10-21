import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import {VolumeDown, VolumeUp} from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    rootMus: {
        width: 200,
    },
    slider: {
        color: "white",
    },
    buttonPlay: {
        color: "white",
        fontSize: "45px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        left: "170px",
        color: "red",
        // backgroundColor:"red",
        borderRadius: "15px"

    },
}));

const MusicMenu = () => {
    const classes = useStyles();
    let [play, setPlay] = useState(false);
    let [musicValue, setMusicValues] = useState(100);
    const [audio, setAudio] = useState(null);
    let [pathMusic, setPathMusic] = useState("https://radiorecord.hostingradio.ru/summerparty96.aacp")
    const handleChange = (event) => {
        let newMusic = event.target.value;
        if (newMusic === "pause") {
            audio.pause();
            setPlay(false);
        } else {
            setPathMusic(newMusic);
            if (play) {
                audio.pause();
                setTimeout(() => {
                    audio.play();
                }, 50);
            }
        }

    };

    useEffect(() => {
        setAudio(document.querySelector("#audioMusic"))
    }, []);


    if (play) {
        if (audio !== undefined && audio !== null) {
            audio.play();
        }
    } else {
        if (audio !== undefined && audio !== null) {
            audio.pause();
        }
    }

    const handleMusicChanges = (event, newValue) => {
        setMusicValues(newValue);
        audio.volume = musicValue / 100;
    };

    return (
        <Grid
            item lg={3}
            xs={"auto"}>
            <audio id="audioMusic" src={pathMusic}
                   style={{
                       width: "200px",
                       height: "20px",
                       position: "absolute",
                       left: "-200px"
                   }}/>

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Hidden smDown>
                    {!play ?
                        <Button onClick={() => setPlay(audio !== null)}>
                            <PlayCircleFilledOutlinedIcon className={classes.buttonPlay}>
                            </PlayCircleFilledOutlinedIcon>
                        </Button>
                        :
                        <>
                            <Grid item xs={2}>
                                <Button onClick={() => setPlay(false)}>
                                    <PauseCircleFilledIcon className={classes.buttonPlay}>
                                    </PauseCircleFilledIcon>
                                </Button>
                            </Grid>

                            <Grid item xs={1}>
                                <div className={classes.rootMus}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <VolumeDown/>
                                        </Grid>
                                        <Grid item xs>
                                            <Slider
                                                className={classes.slider}
                                                value={musicValue}
                                                onChange={handleMusicChanges}
                                                aria-labelledby="continuous-slider"/>
                                        </Grid>
                                        <Grid item>
                                            <VolumeUp/>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                        </>
                    }

                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple" style={{color: "white"}}>Radio</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                            style={{color: "black"}}
                        >
                            <option aria-label="None" value="pause"/>
                            <option value="https://radiorecord.hostingradio.ru/rr_main96.aacp">Record</option>
                            <option value="https://radiorecord.hostingradio.ru/summerparty96.aacp">Summer Dance</option>
                            <option value="https://radiorecord.hostingradio.ru/organic96.aacp">Organic</option>
                            <option value="https://radiorecord.hostingradio.ru/ambient96.aacp">Ambient</option>
                            <option value="https://radiorecord.hostingradio.ru/chillhouse96.aacp">Chill House</option>
                            <option value="https://radiorecord.hostingradio.ru/lofi96.aacp">Lo-Fi</option>
                            <option value="https://radiorecord.hostingradio.ru/dreampop96.aacp">Dream-Pop</option>
                            <option value="https://radiorecord.hostingradio.ru/sd9096.aacp">Дискотека 90-Х</option>
                            <option value="https://radiorecord.hostingradio.ru/rv96.aacp">Руки Вверх!</option>
                            <option value="https://radiorecord.hostingradio.ru/rock96.aacp">Rock!</option>
                            <option value="https://radiorecord.hostingradio.ru/cadillac96.aacp">60's Dance</option>
                        </Select>
                    </FormControl>

                </Hidden>


            </Grid>


        </Grid>
    )
}

export default MusicMenu;