import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_FILTER_USERS } from '../utils/queries';
import FollowUserButton from '../components/buttons/FollowUnFollow';
import { Button, Card, Row, Col } from 'react-bootstrap'


const UsersNotFollowed = () => {
    const { data } = useQuery(QUERY_FILTER_USERS);
    const usersMap = data?.filterUsers.map((user: any) => {
        const handleClick = (event: any) => {
            event.preventDefault()
            window.location.assign(`/profile/${user._id}`)
        }
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