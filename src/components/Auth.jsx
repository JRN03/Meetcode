import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from './Alert';

const reg = 'https://meetcode-api.herokuapp.com/api/user/register';
const login = 'https://meetcode-api.herokuapp.com/api/user/login';
const posts = 'https://meetcode-api.herokuapp.com/api/posts';

//import someImage from "../assets/signup.png";

const initial = {
  username:"",
  password:"",
  email:"",
}

const Auth = ({setAuth,setUser}) => {

  const [form,setForm] = useState(initial)
  const [isUser,setIsUser] = useState(false);
  const [token, setToken] = useState(Cookies.get('token'));
  const [alert, showAlert] = useState(false);

  const newUser = async (data) => {
    axios.post(reg, data).then(
      (res) => {
        console.log(res.data);
        setIsUser(true);
      }, (error) => console.log(JSON.stringify(error))
    );
  }
  
  const loginUser = async (data) => {
    axios.post(login, data).then(
        (res) => {
          setToken(res.data.token);
          Cookies.set('token',res.data.token);
        },
        (err) => {
           showAlert(true);
        }
    )
  };

  useEffect(() => {
    axios.get(posts,{
        headers: {
          "auth-token": token
        }
    }).then(res =>{
      setAuth(true);
      setUser(res.data);
    },rej => {
      setAuth(false);
    });
  },[token,setAuth,setUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let {confirmPass, ...regData} = form;
    let {email, ...loginData} = regData;
    if(!isUser){
      newUser(regData);
    }
    if(isUser) loginUser(loginData);
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
    if(e.target.name === "password"){
      e.target.value.length < 8 ? e.target.setCustomValidity("Password must be at least 8 characters long") : e.target.setCustomValidity("");
    }
    if(e.target.name === "confirmPass"){
      form.password !== e.target.value ? e.target.setCustomValidity("Passwords must match") : e.target.setCustomValidity("");
    }

  }

  const switchMode = () => {
    setIsUser(!isUser)
  }

  return (
    <div className = "authForm-container">
        {alert && <Alert title="Invalid Credentials" message="We can't seem to find a user with that info. Check your login info one more time" onClick = {() => {showAlert(false)}}/>}
        <div className = "authForm">
              <h1>{isUser?"Sign In":"Sign Up"}</h1>
              <form onSubmit={handleSubmit}>
                  <div className = "content">
                      <label htmlFor="username">Username</label>
                      <input 
                        id='submit'
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                        required/>
                  </div>
                  <div className = "content">
                      <label htmlFor="password">Password</label>
                      <input 
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required/>
                  </div>
                  {!isUser && (
                    <div className = "content">
                        <label htmlFor="confirmPass">Confirm Password</label>
                        <input 
                        name="confirmPass"
                        type="password"
                        placeholder="Retype password"
                        onChange= {handleChange}
                        required/>
                    </div>
                  )}
                  {!isUser && (
                    <div className = "content">
                        <label htmlFor="email">Email</label>
                        <input 
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required/>
                    </div>
                  )}
                  <div className = "submit">
                        <button>{isUser?"Sign in":"Sign Up"}</button>
                  </div>
              </form>
              <div className = "accountToggle">
                    <p>
                      {isUser?"Don't Have an Account?":"Already a user?"}
                    </p>
                    <button onClick = {switchMode}>
                      {isUser?"Create account":"Sign in"}
                    </button>
              </div>
        </div>
    </div>
  )
}

export default Auth