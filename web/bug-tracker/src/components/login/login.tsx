import React, { useState } from 'react'
import './login.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {

    const [action, setAction] = useState("Login")
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resp, setResp] = useState<any>({});
    const navigate = useNavigate();
    const BACKEND_ENDPOINT = 'http://localhost:8080'

    const handleSubmit = async () => {
        // need to do async fetch.
        if (action === 'Login') {
            try {
                const response = await fetch(`${BACKEND_ENDPOINT}/login`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                  });
                const responseData = await response.json();
                setResp(responseData);
                navigate('/home')
            } catch (error) {
                alert(error);
            }
        } else {
            try {
                const response = await fetch(`${BACKEND_ENDPOINT}/register`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                    }),
                  });
                const responseData = await response.json();
                setResp(responseData);
            } catch (error) {
                alert(error);
            }
        }
    
    }

    const setLoginState = () => {
        setAction('Login');
        setUsername('');
        setPassword('');
        setEmail('');
        setResp({});
    }

    const setSignUpState = () => {
        setAction('Sign Up');
        setUsername('');
        setPassword('');
        setEmail('');
        setResp({});
    }


    return (
    <div className="container">
        <div className="header">
            <div className="text">{action}</div>
            <div className="underLine"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Name'value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            {action === "Login"? <div></div> : <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email Id'value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>}
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        {action === "Login"? <div className="not-user"> Not a user? <span onClick={()=>{setSignUpState()}}>Sign Up</span></div> 
        : <div className="not-user"> Existing user? <span onClick={()=>{setLoginState()}}>Login</span></div>
        }
        {resp && resp.error ? <div className="error-details">{resp.message}</div> : <div></div>}
        <div className="submit-container">
            <div className="submit" onClick={handleSubmit}>{action}</div>
        </div>
    </div>
    )
}

export default LoginComponent