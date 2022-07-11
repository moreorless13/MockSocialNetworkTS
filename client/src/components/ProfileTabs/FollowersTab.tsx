import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import FollowUserButton from '../../components/buttons/FollowUnFollow';
import { Table, Button } from 'react-bootstrap'

const FollowersTab = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    const user = data?.user;
    const userFollowers = user?.followers?.map((follower: any) => {
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${follower._id}`)
        }
        return (
            <tr>
                <td>{follower?.username}</td>
                <td><Button onClick={handleClick}>{follower?.username}'s Profile</Button></td>
                <td><FollowUserButton _id={follower?._id} /></td>
            </tr>
        )
    })
    const numberOfFollowers = data?.user?.followers?.length;
    return (
        <div>
            <div className='row justify-content-center'>{user?.username}'s Followers: {numberOfFollowers}</div>
            <br />
            <div className='row justify-content-center'><Table striped bordered hover responsive><tbody>{userFollowers}</tbody></Table></div> 
        </div>
    )
}

export default FollowersTab;