import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import FollowUserButton from '../components/buttons/FollowUnFollow';
import { Card, Nav } from 'react-bootstrap';


const UserProfile = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    // console.log(data)
    const user = data?.user;
    console.log('i am the usr', user)
    console.log('user followers', user?.followers)
    const userFollowers = user?.followers?.map((follower: any) => {
        console.log(follower)
        return (
            <Card className='col-3 justify-content-center'>
                <Card.Header>{follower?.username}</Card.Header>
                <Card.Body>
                    <Card.Subtitle><p>{follower.email}</p></Card.Subtitle>
                </Card.Body>
                <Card.Footer><FollowUserButton _id={follower?._id} /></Card.Footer>
            </Card>
        )
    })
    console.log('mapped users', userFollowers)
    

    return (
        <Jumbotron>
            <div className='row justify-content-center'>Welcome to {user?.username}'s Profile Page</div>
            <Nav></Nav>
            <div className='row justify-content-center'>{user?.username}'s Followers: </div>
            <div className='row justify-content-center'>{userFollowers}</div> 
        </Jumbotron>
    )
}

export default UserProfile;