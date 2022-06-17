import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FOLLOW_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const FollowUserButton = ({ _id }: any) => {
    const [disabled, setDisabled] = useState(false);
    const [followUser, { error }] = useMutation(FOLLOW_USER);

    
    useEffect(() => {
        if (error) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [error]);

    const handleFollowClick = async (event: any) => {
        event.preventDefault()
        console.log(_id)
        try {
            const { data } = await followUser({
                variables: { _id: _id }  
            })
            console.log('this is the data', data)
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