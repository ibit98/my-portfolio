import React from "react";
import ReactTypingEffect from 'react-typing-effect';
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import ReactCanvasNest from "react-canvas-nest";
import {NavLink} from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const useStyles = makeStyles((theme)=>({
    container:{
        backgroundSize: "cover",
        width:'100vw',
        height:"100vh",
    },
    canvasNest:{
        width:'100%',
        height:'100%',
        opacity:1
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

const config ={
    count: 80,
    pointR: 3,
    pointColor:'64,196,255',
    dist: 100,
    lineColor:'238,255,65',
    lineWidth:4,
    follow: true,
    mouseDist: 20000
}

const items = ['I am Indranil Bit.', 'Competitive Coder.','Web Developer.','Data Enthusiastic.'];

function Home() {
    const classes=useStyles();

    return(
        <div className={classes.container}>
            <ReactCanvasNest className={classes.canvasNest} config={config} />
            <div className={classes.wrapper}>
                <ReactTypingEffect
                    className={classes.heading}
                    text={items}
                    eraseDelay={50}
                    typingDelay={50}
                    cursorClassName={classes.cursor}
                />
                <div className={classes.fab}>
                    <NavLink     to={'about'}>
                        <Fab
                            size="medium"
                            color="secondary"
                            aria-label="add"
                        >
                            <ArrowForwardIosRoundedIcon/>
                        </Fab>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home;