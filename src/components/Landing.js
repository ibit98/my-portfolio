import React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group'
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from "@material-ui/core/AppBar";
import Home from "./Home";
import About from "./About";
import Skills from  "./Skills";
import Contact from "./Contact";
import logo from '../assets/android-chrome-192x192.png'

const Index = [
    {
        path :'/',
        name : 'Home',
        Component: Home
    },
    {
        path :'/about',
        name : 'About',
        Component: About
    },
    {
        path :'/skills',
        name :'Skills',
        Component: Skills
    },
    {
        path :'/projects',
        name : 'Projects',
        Component: Home
    },
    {
        path :'/contact',
        name :'Contact',
        Component: Contact
    }
]

const useStyle = makeStyles((theme)=>({
    container:{
        width:'100vw'
    },
    toolBar:{
        paddingLeft:'.25rem',
        paddingRight:'.25rem'
    },
    appBar:{
        backgroundColor:'#fff5',
    },
    header:{
        width:'40%',
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "left",
        verticalAlign: "middle"
    },
    MenuButton:{
        padding:'1.5vmin',
        marginLeft:0,
    },
    title:{ // see later
        display: "inline-block",
        justifyContent: "center",
        textAlign:"center",
        fontFamily: 'Lato',
        fontWeight: "bolder",
        verticalAlign: "middle",
        color: "#000000",
        fontSize: 30
    },
    poster:{    /*need to be fixed alignment*/
        width:'80%',
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        alignSelf: "center",
    },
    index:{
        marginLeft: "auto",
        padding: '1vmin',
        justifyContent: "center"
    },
    menuButton: {
        borderRadius: '2rem',
        padding: '4px',
        height:'80%'
    },
    button:{
        textDecoration: "none",
        color: '#1976d2',
        fontFamily: 'Lato',
        '&:hover': {
            color: '#f46548',
        }
    },
    selected:{
        color: '#f46524',
        fontWeight: "bold"
    },
    drawer:{
        width: '20vmin'
    }
}))

function Landing() {
    const classes = useStyle();
    const [DrawerState,setState]= React.useState(false);
    const toggleDrawer = () =>{
        if (DrawerState){
            setState(false);
        }
        else {
            setState(true);
        }
    }
    return(
        <BrowserRouter>
            <div className={classes.container}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <div className={classes.header}>
                            <IconButton
                                edge="start"
                                className={classes.MenuButton}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <IconButton
                                edge="start"
                                className={classes.MenuButton}
                            >
                                <img src={logo} alt='logo' height='30px'/>
                            </IconButton>
                            {/*<Typography variant='subtitle1' className={classes.title} >*/}
                            {/*    Indranil Bit*/}
                            {/*</Typography>*/}
                        </div>
                        <div className={classes.index}>
                            {
                                Index.map((item) =>
                                    <Button className={classes.menuButton}>
                                        <NavLink className={classes.button}
                                                 to={item.path}
                                                 activeClassName={classes.selected}
                                                 exact
                                        >
                                            {item.name}
                                        </NavLink>
                                    </Button>
                                )
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <SwipeableDrawer
                open={DrawerState}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                className={classes.drawer}
            >
                <List>
                    {Index.map((text) => (
                        <NavLink
                            className={classes.button}
                            to={text.path}
                            activeClassName={classes.selected}
                            onClick={toggleDrawer}
                            exact
                        >
                            <ListItem button key={text.path} >
                                <ListItemText primary={text.name} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </SwipeableDrawer>
            {Index.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames='page'
                            unmountOnExit
                        >
                            <Component/>
                        </CSSTransition>
                    )}
                </Route>
            ))}
            <div>

            </div>
        </BrowserRouter>
    )
}
export default Landing;