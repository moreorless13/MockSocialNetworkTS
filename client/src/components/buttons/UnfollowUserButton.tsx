import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { UNFOLLOW_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const UnfollowUserButton = ({ _id }: any) => {
    const [disabled, setDisabled] = useState(false);
    const [unfollowUser, { error }] = useMutation(UNFOLLOW_USER);

    useEffect(() => {
        if (error) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [error]);

    const handleUnfollowClick = async (event: any) => {
        event.preventDefault()
        console.log(_id)
        try {
            const { data } = await unfollowUser({
                variables: { _id: _id }  
            })
            return data
        } catch (error) {
            console.error(error)
        }

        setDisabled(true)
    }

    return (
        <div>
            <Button variant='danger' onClick={handleUnfollowClick} disabled={disabled}>Unfollow</Button>
        </div>
    )
}

export default UnfollowUserButton;