import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import { useTransition, useSpring, useChain, config } from 'react-spring'
import { Container, Item } from './styles'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from '@material-ui/icons/Close';
import projectIcon from '../assets/project.svg';
import certificateIcon from '../assets/certificate.svg'
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import {certificate} from '../constants';

// const cert = certificate.json();

const gitAPI_KEY= 'c068ee1fd2f15c88ca8a6460d1976e51f2521a5e';

const useStyles = makeStyles((theme)=>({
    container:{
        width:'100%',
        maxWidth:'100vw',
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
        maxWidth: '100vw',
        flexDirection: "row",
        padding: '5vmin',
        justifyContent: "center",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingBottom:'0vw',
    },
    card:{
      width:'100%',
      height:'5rem',
    },

    text:{
        fontFamily:'Lato',
        fontWeight: 20
    },
    heading:{
        fontFamily : 'Source Sans Pro',
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: '#f46524',
    },
    description:{
        fontFamily : 'Source Sans Pro',
        overflow: "hidden",
        lineClamp: '1',
        maxLines: '2',
        textOverflow: "ellipsis",
        color: '#4fc3f7',
        fontSize: "smaller",
    },
    button:{
        textDecoration: "none",
        color: '#1976d2',
        fontFamily: 'Source Sans Pro',
        '&:hover': {
            color: '#f46548',
        }
    },
    fab: {
        width:'30vw',
        display: "flex",
        flexDirection: "row",
        alignSelf: "center" ,
        justifyContent: "space-between",
        padding: '.5rem',
        paddingBottom:'5vh'
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

function Projects() {
    const [open, set] = useState(false);
    const [open2,set2]=useState(false);
    const [data,setData]=useState([]);
    const classes=useStyles();
    useEffect(()=>{
        fetch('https://api.github.com/user/repos',{
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+ 'bXlfY2xpZW50X2lkOmMwNjhlZTFmZDJmMTVjODhjYThhNjQ2MGQxOTc2ZTUxZjI1MjFhNWU='
            })
        })
            .then(res => res.json())
            .then(res => {
                setData(res);
                console.log(res);
            })
    },[])
    const springRef = useRef();
    const { size, opacity, ...rest } = useSpring({
        ref: springRef,
        config: config.stiff,
        from: { size: '20vw', background: '#0091ea' },
        to: { size: open ? '80vw' : '20vw', background: open ? '#c5e1a5' : '#7cb342' }
    })

    const transRef = useRef();
    const transitions = useTransition(open ? data : [], item => item.name, {
        ref: transRef,
        unique: true,
        trail: 600 / data.length,
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0)' }
    })

    const springRef2 = useRef();
    const { size2, opacity2, ...rest2 } = useSpring({
        ref: springRef2,
        config: config.stiff,
        from: { size2: '20vw', background: '#0091ea' },
        to: { size2: open2 ? '80vw' : '20vw', background: open2 ? '#cca3e0' : '#aa00ff' }
    })
    const transRef2 = useRef();
    const transitions2 = useTransition(open2 ?certificate : [], item => item.cName, {
        ref: transRef2,
        unique: true,
        trail: 600 / certificate.length,
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0)' }
    })
    const rendCert = transitions2.map(({ item, key, props }) => (
        <Item key={key} style={{ ...props , height: '20em'}} >
            <Card style={{color: '#4fc3f7'}}>
                <CardHeader
                    avatar={
                        <img height='30em' width='30em' src={item.orgLogo}/>
                    }
                    title={item.orgName}
                    subheader={item.issueDate}
                    className={classes.heading}
                    style={{maxWidth: '100%'}}
                />
                <CardMedia
                    image={item.img}
                    title="Certificate"
                    style={{height:'4rem'}}
                />
                <CardContent>
                    <Typography  variant='h6' className={classes.heading}>
                        {item.cName}
                    </Typography>
                    <div className={classes.description} style={{height:'1.2em',overflow:'hidden'}}>
                        <Typography className={classes.description}>
                            {item.cred}
                        </Typography>
                    </div>
                    <Typography
                        className={classes.heading}
                        style={{fontSize:15,color:'#90a4ae'}}
                    >
                        {item.cred}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={item.link} target='_blank'>
                        <Button size="small" style={{display: "inline-block"}}>
                            <Typography className={classes.button}>
                                View Certificate
                            </Typography>
                        </Button>
                    </a>
                </CardActions>
            </Card>
        </Item>
        ))
    const handleClick=()=>{
        if (open===true)set(false);
        if (open2===true)set2(false);
    }
    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])
    useChain(open2 ? [springRef2, transRef2] : [transRef2, springRef2], [0, open2 ? 0.1 : 0.6])
    return(
        <div className={classes.container} >
            <div className={classes.wrapper}>

                <Container
                    style={{ ...rest, width: size, height: size/2, margin: '2rem', justifyContent:'space-around' }}
                    onClick={() => set(open => !open)}
                >
                    {open===false?<Typography
                        className={classes.description}
                        style={{color:'white',fontWeight: "bold",justifyContent: "center",alignItems: "center"}}
                    >
                        Projects
                    </Typography>:""}
                    {transitions.map(({ item, key, props }) => (
                        <Item key={key} style={{ ...props }} >
                            <Card style={{color: '#4fc3f7'}}>
                                <CardContent>
                                    <Typography variant='h6' className={classes.heading}>
                                        {item['name']}
                                    </Typography>
                                    <div className={classes.description} style={{height:'4.8em',overflow:'hidden'}}>
                                        <Typography className={classes.description}>
                                            {item['description']}
                                        </Typography>
                                    </div>
                                    <Typography
                                        className={classes.heading}
                                        style={{fontSize:15,color:'#90a4ae'}}
                                    >
                                        {item['created_at']}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <a href={item['html_url']} target='_blank'>
                                        <Button size="small" style={{display: "inline-block"}}>
                                            <Typography className={classes.button}>
                                                View Project
                                            </Typography>
                                        </Button>
                                    </a>
                                </CardActions>
                            </Card>
                        </Item>
                    ))}
                    {open===true ?
                        <div style={{width: '100%', paddingTop: '.5rem'}} onClick={() => {
                        set(true)
                    }}>
                        <BootstrapTooltip title='Close'>
                        <Fab
                        size="medium"
                        color= "inherit"
                        aria-label="add"
                        >
                        <CloseIcon/>
                        </Fab>
                        </BootstrapTooltip>
                        </div>:
                        <div style={{width: '100%', paddingTop: '.5rem'}} >
                            <img width='48px' height='48px' src={projectIcon}/>
                        </div>
                    }
                </Container>
                {/*//certificates*/}
                <Container
                    style={{ ...rest2, width: size2, height: size2/2, margin: '2rem', justifyContent:'space-around' }}
                    onClick={() => set2(open2 => !open2)}
                >
                    {open2===false?<Typography
                        className={classes.description}
                        style={{color:'white',fontWeight: "bold",justifyContent: "center",alignItems: "center"}}
                    >
                        Certificates
                    </Typography>:""}
                    {rendCert}
                    {open2===true ?
                        <div style={{width: '100%', paddingTop: '.5rem'}} onClick={() => {
                            set2(true)
                        }}>
                            <BootstrapTooltip title='Close'>
                                <Fab
                                    size="medium"
                                    color= "inherit"
                                    aria-label="add"
                                >
                                    <CloseIcon/>
                                </Fab>
                            </BootstrapTooltip>
                        </div>:
                        <div style={{width: '100%', paddingTop: '.5rem'}} >
                            <img width='48px' height='48px' src={certificateIcon}/>
                        </div>
                    }
                </Container>
            </div>
            <div className={classes.fab}>
                <div>
                    <BootstrapTooltip title='Skills'>
                        <NavLink to={'/skills'}>
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
                    <BootstrapTooltip title='Contact'>
                        <NavLink to={'/contact'}>
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


export default Projects;