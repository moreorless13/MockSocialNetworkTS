import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_FILTER_USERS } from '../utils/queries';
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
    const { data } = useQuery(QUERY_FILTER_USERS);
    console.log(data)
    
   
    

    const usersMap = data?.filterUsers.map((user: any) => {

        const handleClick = (event: any) => {
            event.preventDefault()
            window.location.assign(`/profile/${user._id}`)
        }
        console.log(user)
        return (
            <Card>
                <Card.Body id={user?._id} key={user?._id}>
                    <Card.Title key={user?.username}>{user.username}</Card.Title>
                    <Card.Subtitle>{user.email}</Card.Subtitle>
                    <Card.Text>{user.accountStatus}</Card.Text>
                    <Button onClick={handleClick}>{user?.username}'s Profile</Button>
                </Card.Body>
                <Card.Footer><FollowUserButton _id={user._id} /></Card.Footer>
            </Card>
        )
    })

   
    if (Auth.loggedIn()) {
        return (
            <Jumbotron>
                <h1>Welcome back, {myUsername}!</h1>
                <div className='row justify-content-center'>{usersMap}</div>
                <br />
                <div className='row'>
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
            <Jumbotron>
                <SignupForm />
            </Jumbotron>
        )
    }
}

export default HomePage;