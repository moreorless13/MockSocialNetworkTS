import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams, Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import ProfilePageContainer from '../components/ProfilePageContainer';
import Auth from '../utils/auth';



const UserProfile = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    const user = data?.user;
    return (
        Auth.loggedIn() ? (
            <Jumbotron>
                <div className='row justify-content-center'>Welcome to {user?.username}'s Profile Page</div>
                <br />
                <ProfilePageContainer userId={user?._id} username={user?.username} posts={user?.posts} followers={user?.followers} following={user?.following} />
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