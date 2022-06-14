import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FORGOT_PASSWORD } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [error])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await forgotPassword({
                variables: { ...userFormData }
            });
            return data
        } catch (error) {
            console.error(error)
            setShowAlert(true)            
        }

        setUserFormData({ email: '' });
    }

    return (
        <div className="container bg-warning rounded pt-2 pb-2">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'></Alert>
                <Form.Group>
                    <Form.Label htmlFor='email'>Account Email Address</Form.Label>
                    <Form.Control type="email" placeholder='Account Email Address' name='email' onChange={handleInputChange} value={userFormData.email} required />
                    <Form.Control.Feedback type="invalid">Email Address Required</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button className='padding bg-dark' disabled={!userFormData.email} type='submit' variant='success'>Submit</Button>
            </Form>
            <br />
            <Link to="/login">← Go to Login</Link>
        </div>
    )
}

export default ForgotPasswordForm