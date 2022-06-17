import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { REMOVE_FOLLOWER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';


const RemoveFollowerButton = ({ _id }: any) => {
    const [disabled, setDisabled] = useState(false);
    const [removeFollower, { error }] = useMutation(REMOVE_FOLLOWER);

    useEffect(() => {
        if (error) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [error])

    const handleRemoveFollowerClick = async (event: any) => {
        event.preventDefault()
        console.log(_id)
        try {
            const { data } = await removeFollower({
                variables: { _id: _id }
            })
        } catch (error) {
            console.error(error)
        }
        setDisabled(true)
    }


    return (
        <div>
            <Button variant='danger' onClick={handleRemoveFollowerClick} disabled={disabled}>Remove Follower</Button>
        </div>
    )
}

export default RemoveFollowerButton;