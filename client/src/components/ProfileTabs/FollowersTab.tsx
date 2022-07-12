import React from 'react';
import { Table, Button } from 'react-bootstrap'

const FollowersTab = ({followers, username}: any) => {
    const userFollowers = followers?.map((follower: any) => {
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${follower._id}`)
        }
        return (
            <tr key={follower?._id}>
                <td>{follower?.username}</td>
                <td><Button onClick={handleClick}>{follower?.username}'s Profile</Button></td>
            </tr>
        )
    })
    const numberOfFollowers = followers?.length;
    return (
        <div>
            <div className='row justify-content-center'>{username}'s Followers: {numberOfFollowers}</div>
            <br />
            <div className='row justify-content-center'><Table striped bordered hover responsive><tbody>{userFollowers}</tbody></Table></div> 
        </div>
    )
}

export default FollowersTab;