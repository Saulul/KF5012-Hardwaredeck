//React Components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

//CSS 
import '../css/style.css';

//Images
import logo from '../images/logoA.png';


export default function Login({setUser})
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    useEffect(() => {
        document.title = "Hardwaredeck | Sign In";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);



    function showPassword()
    {
        const password = document.getElementById('password');
        if(password.type === "password")
        {
            password.type = "text";
        }
        else
        {
            password.type = "password";
        }
    }


    const navigate = useNavigate();

    //function to got back to home page
    function backToHome()
    {
        navigate('/');
    }


    //test for logging in (placeholder)
    async function login(event)
    {
        event.preventDefault();

        const confirmMessage = document.getElementById("confirmMessage");

        

        //date to be passed to server-side
        const data = {
            "identifier": email,
            "password": password
        };


        let loginError;
        let response;
        try
        {
            response = await axios.post("http://localhost:1337/api/auth/local", data);
        }
        catch(error)
        {
            confirmMessage.setAttribute("style", "color: red; display: block;");
            confirmMessage.innerHTML = "<p>Details incorrect, try again</p>";
            loginError = true
        }

        if(!loginError)
        {
            //store user in local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            
            //set state of the user
            setUser(response.data);

            confirmMessage.setAttribute("style", "color: green; display: block;");
            confirmMessage.innerHTML = "<p>Welcome " + response.data.user.firstName + " " + response.data.user.lastName + "</p>";
            confirmMessage.innerHTML += "<p>You are now logged in, please wait 5 seconds</p>";

            setTimeout(() => navigate('/'), 5000)
        }
    }



    return (
        <>
            <main className='loginRegisterPage loginPage'>
                <div className='pageLogoContainer' onClick={backToHome}>
                    <img src={logo} className='pageLogo' alt='Logo'/>
                </div>

                <form onSubmit={login} className='innerLoginRegister'>
                    <h1>Sign In</h1>

                    <label>Email</label>
                    <input type='email' onChange={(event) => setEmail(event.target.value)} name='email' required/>
                
                    <label>Password <span>Forgot Password</span></label>
                    <input type='password' id='password' onChange={(event) => setPassword(event.target.value)} name='password' required/>

                    <div className='passShow'>
                        <input type='checkbox' onClick={showPassword} name='passwordShow'/>
                        <span>Password</span>
                    </div>

                    <p>
                        By signing-in you agree to Hardwaredeck's Conditions of Use & Sale.
                        Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>

                    <div id='confirmMessage' className='confirmMessage'></div>
                
                    <input type='submit' value='Sign-in'/>
                </form>

                <div className='dividerContainer'>
                    <span>New to Hardwaredeck?</span>
                </div>

                <Link to={'/register'} className='registerLink'>Register</Link>
            </main>
        </>
    );
}