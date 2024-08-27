import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    await axios.post('/employee/login',{ email: email, password: password })
    .then((res)=>{
      setLoading(false)
        if(res.data.status === 200)
        {
            window.localStorage.setItem('user',JSON.stringify(res.data.user))
            navigate('/profile', {replace: true})
        }
        if(res.data.status === 404){
            alert("Wrong Credentials")
        }
    })
    .catch(()=>{
        alert("Please Try Again After Some Time")
    })
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.loginButton}>
          {loading? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;