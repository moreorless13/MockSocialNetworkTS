import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { ObjectType } from 'typescript';
import { Types } from 'mongoose';

const FollowUserButton = ({ followers, following }: any) => {
    const [disabled, setDisabled] = useState(false);
    const [followUser, { error }] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    
    useEffect(() => {
        if (error) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [error]);

    const handleFollowClick = async (event: any) => {
        event.preventDefault()
        console.log(followers)
        try {
            const { data } = await followUser({
                variables: followers  
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleUnfollowClick = async (event: any) => {
        event.preventDefault()
        try {
            const { data } = await unfollowUser({
                variables: following
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Button variant='primary' onClick={handleFollowClick} disabled={disabled}>Follow</Button>
        </div>
    )
}

export default FollowUserButton;