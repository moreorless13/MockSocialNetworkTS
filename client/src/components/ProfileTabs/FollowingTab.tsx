import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import FollowUserButton from '../../components/buttons/FollowUnFollow';
import { Card } from 'react-bootstrap';

const FollowingTab = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    const user = data?.user;

    const userFollowing = user?.following?.map((follows: any) => {
        console.log(follows)
        return (
            <Card className='justify-content-center'>
                <Card.Header>{follows?.username}</Card.Header>
                <Card.Body>
                    <Card.Subtitle><p>{follows.email}</p></Card.Subtitle>
                </Card.Body>
                <Card.Footer><FollowUserButton _id={follows?._id} /></Card.Footer>
            </Card>
        )
    })

    const numberFollowing = user?.following?.length;
    console.log(numberFollowing)

    return (
        <div>
            <div className='row justify-content-center'>{user?.username} Follows: {numberFollowing}</div>
            <br />
            <div className='row justify-content-center'>{userFollowing}</div> 
        </div>
    )
}

export default FollowingTab;