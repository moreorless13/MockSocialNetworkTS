import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VERIFY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import Jumbotron from '../components/Jumbotron';

const VerifyUser = () => {
    const { userId }: any = useParams();
    useQuery(VERIFY_USER, {
        variables: { userId: userId }
    });

    Auth.logout();
    window.location.assign('/login') 
    return (
        <Jumbotron>
            <h1>Email Successfully Verified!</h1>
        </Jumbotron>
    )
}

export default VerifyUser;