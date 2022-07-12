import React, { useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const AddNewComment = () => {
    const [userFormData, setUserFormData] = useState({commentText: ''});
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [addPost, { error }] = useMutation(ADD_COMMENT);

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [error])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value});
    }


    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget; 
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true)

        try {
            const { data } = await addPost({
                variables: { ...userFormData }
            })
            return data;
        } catch (error) {
            console.error(error);
        }

        setUserFormData({ commentText: '' });
        window.location.reload()
    }

    return (
        <div className='container-fluid'>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Post must be 255 characters or less!
                </Alert>
                <Form.Group className='mt-3 mb-3'>
                    <Col xs='auto'></Col>
                    <Form.Label htmlFor='text'>Post Text: </Form.Label>
                    <Form.Control as='textarea' placeholder='Post content here.' name='text' onChange={handleInputChange} value={userFormData.commentText} required maxLength={255} />
                </Form.Group>
                    <div className='row justify-content-center'>
                        <Button  className='padding rounded justify-content-center mb-4' disabled={(userFormData.commentText.length >= 255 || userFormData.commentText.length < 5)} type='submit' variant='success'>Submit</Button>
                    </div>
            </Form>
        </div>
    )
}

export default AddNewComment;