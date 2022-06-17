import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';


const UserProfile = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    console.log(data)
    const user = data?.user;
    console.log(user)
    return (
        <Jumbotron>
            You found {user?.username}'s  profile!
        </Jumbotron>
    )
}

export default UserProfile;