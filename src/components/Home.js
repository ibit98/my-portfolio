import React from "react";
import ReactTypingEffect from 'react-typing-effect';
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import ReactCanvasNest from "react-canvas-nest";
import {NavLink} from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {typingText} from '../constants';
import {nestConfig} from '../constants';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme)=>({
    container:{
        backgroundSize: "cover",
        width:'100vw',
        height:"100vh",
    },
    canvasNest:{
        width:'100%',
        height:'100%',
        opacity:1,
        background: 'linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)'
    },
    wrapper:{
        paddingTop:'64px',
        display: "flex",
        height:'88vh',
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems:"center",
        justifyContent: "center"
    },
    heading:{
        fontFamily : 'Anaheim',
        fontWeight: "bolder",
        fontSize: 50,
        color: '#f46524',
    },
    cursor:{
        fontFamily: 'Poppins',
        fontWeight: "bolder" ,
        color: '#000000'
    },
    fab: {
        paddingTop: '62vh'
    },
}))

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}


function Home() {
    const classes=useStyles();
    return(
        <div className={classes.container}>
            <ReactCanvasNest className={classes.canvasNest} config={nestConfig} />
            <div className={classes.wrapper}>
                <ReactTypingEffect
                    className={classes.heading}
                    text={typingText}
                    eraseDelay={50}
                    typingDelay={50}
                    cursorClassName={classes.cursor}
                />
                <div className={classes.fab}>
                    <BootstrapTooltip title='About'>
                        <NavLink     to={'about'}>
                            <Fab
                                size="medium"
                                color="secondary"
                                aria-label="add"
                            >
                                <ArrowForwardIosRoundedIcon/>
                            </Fab>
                        </NavLink>
                    </BootstrapTooltip>
                </div>
            </div>
        </div>
    )
}

export default Home;