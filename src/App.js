import React, {useEffect, useState} from 'react';
import logo from 'assets/logo.svg';
import './App.css';
import FadeIn from "react-fade-in";
import Landing from './components/Landing';


function App() {
  const [loadState, setState]=useState(true);
  return (
    <div className="App">
      {{loadState}?
        <header className="App-header" >
          <Loading onLoad={()=>setState(false)}/>
        </header>:
          <FadeIn delay={500} transitionDuration={800} >
            <Landing />
          </FadeIn>
      }
    </div>
  );
}

function Loading(props) {
  useEffect(()=>{
    setTimeout(()=>
    props.onLoad(),5000)
  })
  return(
      <div>
        <img className="App-logo" src={logo} alt='loading'/>
      </div>
  )
}

export default App;
