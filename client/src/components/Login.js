import React, { useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    console.log('Log username and password', { [e.target.name]: e.target.value })
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', creds)
      .then(res => {
        console.log('Login.js > handleSubmit > post response', res);
        localStorage.setItem('token', res.data.payload);
        setCreds({
            username: '',
            password: ''
        })   
        history.push('/bubbles');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('Invalid username or password', err);
      })
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' 
        name='username' 
        placeholder='username' 
        onChange={handleChange}
        value={creds.username} 
        />

        <input type='password' 
        name='password' 
        placeholder='password' 
        onChange={handleChange} 
        value={creds.password}
        />

        <button>SUBMIT</button>
      </form>
    </>
  );
};

export default Login;
