import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Background from '../assets/01.jpg'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Card from "@material-ui/core/Card";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme)=>({
    container:{
        width:'100%',
        minHeight: "90vh",
        paddingTop:'10vh',
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url(${Background})` ,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    wrapper:{
        display: "flex",
        width: '90%',
        overflow: "visible",
        flexDirection: "row",
        padding: '5vmin',
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingBottom:'0vw',
        opacity: '1',

    },
    form:{
        minWidth:'330px',
        minHeight: '350px',
        display: "flex" ,
        padding: '.5rem',
        justifyContent: "space-around",
        flexDirection: "column",
        backgroundColor: "#bbdefb"
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

const API_KEY = 'a9ce1cf6cdc26d53b592f8b2d9358109';

function Contact() {
    const classes=useStyles();
    const [name,setName]=useState("");
    const [email,setMail]=useState("");
    const [msg,setMsg]=useState("");
    const [toggle,setToggle]=useState(false);
    const [snack,setSnack]=useState(false);
    const [validEmail,setValid]=useState(true);
    const handleForm = (e) =>{
       e.preventDefault();
       setToggle(true);
       fetch(`https://apilayer.net/api/check?access_key=${API_KEY}&email=${email}&smtp=1&format=1`)
           .then(res=>res.json())
           .then(res=> {
           if (res.format_valid === true) {
               setValid(true);
               const data = new FormData();
               data.append('name',`${name}`);
               data.append('email',`${email}`);
               data.append('message',`${msg}`);
               const xhr = new XMLHttpRequest();
               xhr.open('POST', 'https://getform.io/f/66706c37-5582-4d48-96b9-58be2ca4edc2');
               xhr.setRequestHeader("Accept", "application/json");
               xhr.onreadystatechange = () => {
                   if (xhr.readyState !== XMLHttpRequest.DONE) return;
                   if (xhr.status === 200) {
                        setSnack(true);
                        setToggle(false);
                   } else {
                       alert('Submission failed. Please send your message to iam@ibit.tech');
                   }
               };
               xhr.send(data);
           } else {
                setValid(false);
           }
       })
    }


    return(
        <div className={classes.container}>
            <Snackbar
                open={snack}
                autoHideDuration={6000}
                onClose={()=>setSnack(prevState => !prevState)}
                anchorOrigin={{vertical: 'top',horizontal:'center'}}
            >
                <Alert  severity="success">
                    Message has been sent to Indranil Bit
                </Alert>
            </Snackbar>
            <div className={classes.wrapper}>
                <Card className={classes.form}>
                    <form onSubmit={(e)=>handleForm(e)} className={classes.form}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput
                                label="Name"
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                                required
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">E-Mail</InputLabel>
                            <OutlinedInput
                                label="E-Mail"
                                value={email}
                                type='email'
                                onChange={(e)=>{setMail(e.target.value)}}
                                required
                                error={!validEmail}
                            />
                            <FormHelperText error >{validEmail===true?"":"Invalid Email"}</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Message</InputLabel>
                            <OutlinedInput
                                label="Message"
                                value={msg}
                                required
                                onChange={(e)=>setMsg(e.target.value)}
                                multiline />
                        </FormControl>
                        <Button
                            id='123'
                            type='submit'
                            variant="contained"
                            color="primary"
                            disabled={toggle}
                            className={classes.button}
                            endIcon={<SendIcon/>}
                        >
                            {toggle===false?"Send":"Sending..."}
                        </Button>
                    </form>

                </Card>
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

export default Contact;