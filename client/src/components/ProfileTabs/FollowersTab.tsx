import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import FollowUserButton from '../../components/buttons/FollowUnFollow';
import { Card } from 'react-bootstrap'

const FollowersTab = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    // console.log(data)
    const user = data?.user;

    const userFollowers = user?.followers?.map((follower: any) => {
        console.log(follower)
        return (
            <Card className='col-2 justify-content-center'>
                <Card.Header>{follower?.username}</Card.Header>
                <Card.Body>
                    <Card.Subtitle><p>{follower.email}</p></Card.Subtitle>
                </Card.Body>
                <Card.Footer><FollowUserButton _id={follower?._id} /></Card.Footer>
            </Card>
        )
    })

    return (
        <div>
            <div className='row justify-content-center'>{user?.username}'s Followers: </div>
            <br />
            <div className='row justify-content-center'>{userFollowers}</div> 
        </div>
    )
}

export default FollowersTab;