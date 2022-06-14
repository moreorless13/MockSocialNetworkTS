import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
        dateOfBirth: ''
    });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
        setShowAlert(true);
        } else {
        setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.preventPropagation()
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

        } catch (error) {
            console.error(error)
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
            dateOfBirth: ''
        });

        window.location.assign('/signUpSuccess')
    }

    return (
        <div className="container bg-warning rounded pt-2 pb-2" style= {{
            position: 'absolute', top: '30%', 
        }}>

            
            {/* This is needed for the validation functionality above */}
            <Form   noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert 
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
                >
                Something went wrong with your signup!
                </Alert>

                <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your username"
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Username is required!
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Your email address"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Email is required!
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                    
                />
                <Form.Control.Feedback type="invalid">
                    Password is required!
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                    <Form.Control type="Date" placeholder='Birthday' name="dateOfBirth" onChange={handleInputChange} value={userFormData.dateOfBirth} required />
                    <Form.Control.Feedback type="invalid">
                        Date of Birth is required!
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                className='padding bg-dark'
                disabled={
                    !(
                    userFormData.username &&
                    userFormData.email &&
                    userFormData.password &&
                    userFormData.dateOfBirth
                    )
                }
                type="submit"
                variant="success"
                >
                Submit
                </Button>
            </Form>
            <div>
                <Link to="/login">← Go to Login</Link>
                <br />
                <Link to='/forgotPassword'>Forgot Password?</Link>
            </div>
        </div>
    )
}

export default SignupForm;