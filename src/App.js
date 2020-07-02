import React, {useEffect, useState} from 'react';
import './App.css';
import HashLoader from "react-spinners/HashLoader";
import FadeIn from "react-fade-in";
import Landing from './components/Landing';


function App() {
  const [loadState, setState]=useState(true);
  if (loadState===true){
      return (
        <header className='App-header'>
            <Loading onLoad={setState}/>
        </header>
      )
  }
  else {
      return (
          <div className='App'>
              <FadeIn
                  delay={500}
                  transitionDuration={800}
              >
                  <Landing />
              </FadeIn>
          </div>
      )
  }
}

function Loading(props) {
  useEffect(()=>{
    setTimeout(()=>
    props.onLoad(false),300)
  });
  return(
      <div>
          <HashLoader
              size={70}
              color={"#F8E71C"}
              loading={true}
          />
      </div>
  )
}

export default App;
