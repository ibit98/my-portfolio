import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring';
import Typography from "@material-ui/core/Typography";
import FadeIn from "react-fade-in";
import {NavLink} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const useStyles = makeStyles((theme)=>({
    container:{
        width:'100%',
        minHeight: "90vh",
        paddingTop:'10vh',
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: 'linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)'
    },
    wrapper:{
        display: "flex",
        overflow: "visible",
        flexDirection: "row",
        padding: '5vmin',
        justifyContent: "center",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingBottom:'0vw',
    },
    profile:{
        minWidth:'350px',
        minHeight: '350px',
    },
    description:{
        textAlign: "center",
        padding:'4vw',
        maxWidth: '40rem',
    },
    text:{
        fontFamily:'Lato',
        fontWeight: 20
    },
    heading:{
        fontFamily : 'Raleway',
        fontWeight: "bold",
        fontSize: 50,
        color: '#f46524',
    },
    fab: {
        width:'30vw',
        display: "flex",
        flexDirection: "row",
        alignSelf: "center" ,
        justifyContent: "space-between",
        padding: '.5rem'
    },
}))

function About() {
    const classes=useStyles();
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 150, friction: 5 } }))
    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    <animated.div
                        className="card"
                        onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
                        onMouseLeave={() => set({xys: [0, 0, 1]})}
                        style={{transform: props.xys.interpolate(trans)}}
                    />
                </div>
                <FadeIn
                    delay={500}
                    transitionDuration={800}
                    className={classes.description}
                >
                    <Typography
                        align='left'
                        variant='h3'
                        className={classes.heading}
                    >
                        About Me
                    </Typography>
                    <Typography
                        align='left'
                        variant='body1'
                        className={classes.text}
                    >
                        Hello there! I am Indranil Bit and I am a Computer Science student
                        currently pursuing my Bachelor of Technology (B.Tech) degree from
                        Indian Institute of Engineering Science and Technology, Shibpur
                        (IIEST, Shibpur), West Bengal and will be graduating in the year 2021 (Expected).

                    </Typography>
                    <Typography>

                    </Typography>
                    <Typography
                        align='left'
                        variant='body1'
                        className={classes.text}
                    >
                        Apart from that, I have a keen interest in Data Structures & Algorithms and
                        also love Problem Solving.
                        I enjoy building Web Application and Web Services in the various cloud computing
                        platform. Also Have worked with React, NodeJs, JavaScript, CSS, HTML5, PHP, MongoDB, MySQL, UI/UX design
                        and many other tools to create aesthetically pleasing, responsive and functional websites.
                    </Typography>
                    <Typography
                        align='left'
                        variant='body1'
                        className={classes.text}
                    >
                        Reach me at <a href={'mailto:iam@ibit98.tech'}>iam@ibit.tech</a>
                    </Typography>
                </FadeIn>
            </div>
            <div className={classes.fab}>
                <div>
                    <NavLink to={'/'}>
                        <Fab
                            size="medium"
                            color="secondary"
                            aria-label="add"
                        >
                            <ArrowBackIosRoundedIcon/>
                        </Fab>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/skills'}>
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

export default About;