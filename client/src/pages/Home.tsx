import React, { useState } from 'react';
import Auth from '../utils/auth'
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignUpForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import Jumbotron from '../components/Jumbotron';
import { Button, Modal } from 'react-bootstrap'


const HomePage = () => {
    const [show, setShow] = useState(false);
    const handleShowRemoveAccount = () => setShow(true)
    const handleCloseRemoveAccount = () => setShow(false)

   
    if (Auth.loggedIn()) {
        return (
            <Jumbotron>
                <h1>Welcome back!</h1>
                <div className='row'>
                    <div className='col-4'></div>
                    <Button onClick={() => Auth.logout()}>Log Out!</Button>
                    <div className='col-1'></div>
                    <div>
                        <Button onClick={() => handleShowRemoveAccount()} variant='danger'>Delete Account</Button>
                        <Modal show={show} onHide={handleCloseRemoveAccount}>
                            <DeleteAccount />
                        </Modal>
                    </div>
                </div>
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