import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams, Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import FollowUserButton from '../components/buttons/FollowUnFollow';
import { Card } from 'react-bootstrap';
import ProfilePageContainer from '../components/ProfilePageContainer';
import Auth from '../utils/auth'


const UserProfile = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    console.log(data)
    const user = data?.user;

    const userFollowers = user?.followers?.map((follower: any) => {
        console.log(follower)
        return (
            <Card className='justify-content-center'>
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
        Auth.loggedIn() ? (
            <Jumbotron>
                <div className='row justify-content-center'>Welcome to {user?.username}'s Profile Page</div>
                <br />
                <ProfilePageContainer />
            </Jumbotron>
        ) : (
            <Jumbotron>
                <h3>Please Login or sign up to view this account!</h3>
                <Link to='/login'>Login</Link>
                <br />
                <Link to='/signup'>Sign Up</Link>
            </Jumbotron>

        )

    )
}

export default UserProfile;