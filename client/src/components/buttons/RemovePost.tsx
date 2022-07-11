import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { REMOVE_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const RemovePostButton = ({ postId }: any) => {
    const [disabled, setDisabled] = useState(false);
    const [removePost, { error }] = useMutation(REMOVE_POST);

    useEffect(() => {
        if (error) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [error])

    const handleRemovePost = async (event: any) => {
        event.preventDefault();
        console.log(postId)
        try {
            const { data } = await removePost({
                variables: { postId: postId }
            })
            console.log(data)
        } catch (error) {
            console.error(error)
        }

        window.location.reload()
    }

    return (
        <div>
            <Button variant='danger' onClick={handleRemovePost} disabled={disabled}><i className="bi bi-trash3"></i></Button>
        </div>
    )
}

export default RemovePostButton;