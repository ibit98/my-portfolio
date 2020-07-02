import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {cards} from '../constants';
import Slide from "@material-ui/core/Slide";
import {NavLink} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Tooltip from "@material-ui/core/Tooltip";

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
        width:'100%',
        maxWidth:'100vw',
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        padding: '5vmin',
        justifyContent: "center",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingBottom:'0vw',
    },
    carousal:{
        width:'50%',
        height: '20%',
        justifyContent: "center",
        alignSelf: "center",
        paddingBottom: '2rem'
    },
    title:{
        fontFamily : 'Poppins',
        color: '#512da8',
        fontWeight: "bold"
    },
    fab: {
        width:'30vw',
        display: "flex",
        flexDirection: "row",
        alignSelf: "center" ,
        justifyContent: "space-between",
        padding: '.5rem'
    },
    root:{
        backgroundColor: "lightblue",
        overflow: "hidden",
        width: '100%',
        height: '100%',
        boxSizing: "border-box",
        cursor: "url('./assets/cursor.png') 39 39, auto",

    },
    rootDiv:{
        position: "absolute",
        width: '100vw',
        willChange: 'transform',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    rootDivDiv:{
        backgroundColor: "white",
        backgroundSize: '85%',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: '25vmax',
        maxWidth: '250px',
        height: '40vmax',
        maxHeight: '400px',
        willChange: "transform",
        borderRadius: '10px',
        boxShadow: "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)"
    }
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


function Skills() {
    const classes = useStyles();
    const [index, setIndex]=useState(0);
    //const [check,setCheck]=useState(true);
    const trans = () => {
        setIndex(prevState => (prevState+1)%cards.length)
    }

    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.carousal}>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                        <Typography variant={'h5'} className={classes.title}>
                            {cards[cards.length- index-1]["name"]}
                        </Typography>
                    </Slide>
                </div>
                <div className={classes.root}>
                    <Deck changeIndex={trans} />
                </div>
            </div>
            <div className={classes.fab}>
                <div>
                    <BootstrapTooltip title='About'>
                        <NavLink to={'/about'}>
                            <Fab
                                size="medium"
                                color="secondary"
                                aria-label="add"
                            >
                                <ArrowBackIosRoundedIcon/>
                            </Fab>
                        </NavLink>
                    </BootstrapTooltip>
                </div>
                <div>
                    <BootstrapTooltip title='Projects'>
                        <NavLink to={'/projects'}>
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

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck(prop) {
    const classes=useStyles();
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        if (!down && trigger){
            prop.changeIndex()
        }
        set(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)||prop.changeIndex(0)), 600)
    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={classes.rootDiv} key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div className={classes.rootDivDiv} {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]["url"]})` }} />
        </animated.div>
    ))
}


export default Skills;
