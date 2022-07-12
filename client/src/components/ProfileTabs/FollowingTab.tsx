import React from 'react';
import { Table, Button } from 'react-bootstrap';

const FollowingTab = ({following, username}: any) => {
    const userFollowing = following?.map((follows: any) => {
        try {
            const handleClick = (event: any) => {
                event.preventDefault();
                window.location.assign(`/profile/${follows._id}`)
            }
            return (
                <tr>
                    <td>{follows?.username}</td>
                    <td><Button onClick={handleClick}>{follows?.username}'s Profile</Button></td>
                </tr>
            )
        } catch (error) {
            console.error(error)
        }
        return follows
    })
    const numberFollowing = following?.length;
    return (
        <div>
            <div className='row justify-content-center'>{username} Follows: {numberFollowing}</div>
            <br />
            <div className='row justify-content-center'><Table striped bordered hover responsive><tbody>{userFollowing}</tbody></Table></div> 
        </div>
    )
}

export default FollowingTab;