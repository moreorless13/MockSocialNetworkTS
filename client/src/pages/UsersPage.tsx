import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Jumbotron from '../components/Jumbotron';
import { Card, Button, Modal } from 'react-bootstrap'
import UnfollowUserButton from '../components/buttons/UnfollowUserButton';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import RemoveFollowerButton from '../components/buttons/RemoveFollowerButton';

const UsersPage = () => {
    let { data } = useQuery(QUERY_ME);
    const [show, setShow] = useState(false);
    const handleShowRemoveAccount = () => setShow(true)
    const handleCloseRemoveAccount = () => setShow(false)
    console.log(data)
    const me = data?.me;
    console.log('this is me', me)

    const myFollowers = me?.followers.map((follower: any) => {
        console.log(follower)
        return (
            <Card className='col-2'>
                <Card.Body>
                    <Card.Title>{follower.username}</Card.Title>
                    <Card.Subtitle>{follower.email}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><RemoveFollowerButton _id={follower?._id} /></Card.Footer>
            </Card>
        )
    })

    const whoIFollow = me?.following.map((following: any) => {
        console.log(following)
        return (
            <Card className='col-2'>
                <Card.Body>
                    <Card.Title>{following.username}</Card.Title>
                    <Card.Subtitle>{following.email}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><UnfollowUserButton _id={following?._id} /></Card.Footer>
            </Card>
        )
    })

    return (
        <Jumbotron>
            <div className='row justify-content-end'>
                <div>
                    <Button onClick={() => handleShowRemoveAccount()} variant='danger'>Delete Account</Button>
                        <Modal show={show} onHide={handleCloseRemoveAccount}>
                            <DeleteAccount />
                        </Modal>
                </div>
           </div>
            <h6>My Followers: </h6>
           <div className='row justify-content-center'>
            {myFollowers}
            </div>
           <h6>Who I Follow: </h6>
           <div className='row justify-content-center'>{whoIFollow}</div>
           
        </Jumbotron>
    )

}
export default UsersPage;