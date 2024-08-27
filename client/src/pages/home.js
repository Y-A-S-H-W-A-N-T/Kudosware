import React, { useState } from 'react';
import styles from '../styles/home.module.css'
import Login from './login'
import SignIN from './signin'

function Home() {

    const [state,setstate] = useState(true)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        YourHR
      </h1>
      <div className={styles.buttonGroup}>
        <div>
            { state? <SignIN/> : <Login/> }
        </div>
        {state && <p>already have an account? <span onClick={()=>setstate(false)} style={{cursor: 'pointer', color: 'orchid'}}>login</span></p>}
        {!state && <p><span onClick={()=>setstate(true)} style={{cursor: 'pointer', color: 'orchid'}}>create new account</span></p>}
      </div>
    </div>
  );
}

export default Home;