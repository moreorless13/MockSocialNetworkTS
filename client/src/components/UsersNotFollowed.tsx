import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_FILTER_USERS } from '../utils/queries';
import FollowUserButton from '../components/buttons/FollowUnFollow';
import Jumbotron from '../components/Jumbotron';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap'


const UsersNotFollowed = () => {
    const { data } = useQuery(QUERY_FILTER_USERS);
    console.log(data)
    
    const usersMap = data?.filterUsers.map((user: any) => {

        const handleClick = (event: any) => {
            event.preventDefault()
            window.location.assign(`/profile/${user._id}`)
        }
        console.log(user)
        return (
            <Col xs="auto">
                <Card>
                    <Card.Body id={user?._id} key={user?._id}>
                        <Card.Title key={user?.username}>{user.username}</Card.Title>
                        <Card.Text>{user.accountStatus}</Card.Text>
                        <Button onClick={handleClick}>{user?.username}'s Profile</Button>
                    </Card.Body>
                    <Card.Footer><FollowUserButton _id={user._id} /></Card.Footer>
                </Card>
            </Col>
        )
    })

    return (
        <Row className='justify-content-center'>
            {usersMap}
        </Row>
    )
}

export default UsersNotFollowed;