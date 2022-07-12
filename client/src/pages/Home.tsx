import React, { useState } from 'react';
import Auth from '../utils/auth'
import SignupForm from '../components/forms/SignUpForm';
import Jumbotron from '../components/Jumbotron';
import UsersNotFollowed from '../components/UsersNotFollowed';

const HomePage = () => {
    const [myUsername, setMyUsername] = useState(localStorage.getItem('username'))
   
    if (Auth.loggedIn()) {
        setMyUsername(localStorage.getItem('username'))
        return (
            <Jumbotron>
                <h1>Welcome back, {myUsername}!</h1>
                <br />
                <UsersNotFollowed />
            </Jumbotron>
        )
    } else {
        return (
            <Jumbotron>
                <SignupForm />
            </Jumbotron>
        )
    }
}

export default HomePage;