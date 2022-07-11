import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import FollowUserButton from '../../components/buttons/FollowUnFollow';
import { Table, Button } from 'react-bootstrap';

const FollowingTab = () => {
    const { userId }: any = useParams();
    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId }
    });
    const user = data?.user;

    const userFollowing = user?.following?.map((follows: any) => {
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${follows._id}`)
        }
        return (
            <tr>
                <td>{follows?.username}</td>
                <td><Button onClick={handleClick}>{follows?.username}'s Profile</Button></td>
                <td><FollowUserButton _id={follows?._id} /></td>
            </tr>
        )
    })
    const numberFollowing = user?.following?.length;
    return (
        <div>
            <div className='row justify-content-center'>{user?.username} Follows: {numberFollowing}</div>
            <br />
            <div className='row justify-content-center'><Table striped bordered hover responsive><tbody>{userFollowing}</tbody></Table></div> 
        </div>
    )
}

export default FollowingTab;