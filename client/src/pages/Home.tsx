import React, { useState } from 'react';
import Auth from '../utils/auth'
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignUpForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import Jumbotron from '../components/Jumbotron';
import { Button } from 'react-bootstrap'


const HomePage = () => {
   
    if (Auth.loggedIn()) {
        return (
            <Jumbotron>
                <h1>Welcome back!</h1>
                <Button onClick={() => Auth.logout()}>Log Out!</Button>
            </Jumbotron>
        )
    } else {
        return (
            <div className='container'>
                <LoginForm />
            </div>
        )
    }
}

export default HomePage;