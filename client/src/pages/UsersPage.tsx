import React from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Jumbotron from '../components/Jumbotron';
import { Card } from 'react-bootstrap'
import UnfollowUserButton from '../components/buttons/UnfollowUserButton';

const UsersPage = () => {
    let { data } = useQuery(QUERY_ME);
    console.log(data)
    const me = data?.me;
    console.log('this is me', me)

    const myFollowers = me?.followers.map((follower: any) => {
        console.log(follower)
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{follower.username}</Card.Title>
                    <Card.Subtitle>{follower.email}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><UnfollowUserButton followers={follower._id} /></Card.Footer>
            </Card>
        )
    })

    const whoIFollow = me?.following.map((following: any) => {
        console.log(following)
        return (
            <Card>
                <Card.Body>{following.username}</Card.Body>
                <Card.Subtitle>{following.email}</Card.Subtitle>
                <Card.Footer><UnfollowUserButton _id={following?._id} /></Card.Footer>
            </Card>
        )
    })

    return (
        <Jumbotron>
            <h6>My Followers: </h6>
           {myFollowers}
           <h6>Who I Follow: </h6>
           {whoIFollow}
        </Jumbotron>
    )

}
export default UsersPage;