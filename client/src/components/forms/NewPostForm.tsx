import React, { useState, useEffect, useRef, FormEvent, ChangeEvent} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';

const AddNewPost = () => {
    const [addPost, { error }] = useMutation(ADD_POST);
    const [newPostData, setNewPostData] = useState({text: ''});
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [error])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewPostData({ ...newPostData, [name]: value});
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget; 
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addPost({
                variables: { ...newPostData }
            })
        } catch (error) {
            console.error(error);
        }

        setNewPostData({ text: '' });
    }
}
export default AddNewPost;