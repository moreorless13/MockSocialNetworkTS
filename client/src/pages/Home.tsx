import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_ME } from '../utils/queries';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignUpForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import Jumbotron from '../components/Jumbotron';
import { Button, Modal, Card } from 'react-bootstrap'
import FollowUserButton from '../components/buttons/FollowUnFollow';



const HomePage = () => {
    const [myUsername, setMyUsername] = useState(localStorage.getItem('username'))
    const [show, setShow] = useState(false);
    const handleShowRemoveAccount = () => setShow(true)
    const handleCloseRemoveAccount = () => setShow(false)
    const { data } = useQuery(QUERY_USERS);
    
   
    

    const usersMap = data?.users.map((user: any) => {
        console.log(user)
        return (
            <Card className='col-2' key={user._id}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Subtitle>{user.email}</Card.Subtitle>
                    <Card.Text>{user.accountStatus}</Card.Text>
                </Card.Body>
                <Card.Footer><FollowUserButton followers={user._id} /></Card.Footer>
            </Card>
        )
    })

   
    if (Auth.loggedIn()) {
        return (
            <Jumbotron>
                <h1>Welcome back!</h1>
                <div className='row'>{usersMap}</div>
                <br />
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