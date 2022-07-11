import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Jumbotron from '../components/Jumbotron';
import { Card, Button, Modal, Row, Col, Table } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader'
import UnfollowUserButton from '../components/buttons/UnfollowUserButton';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import RemoveFollowerButton from '../components/buttons/RemoveFollowerButton';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import RemovePostButton from '../components/buttons/RemovePost';
import AddNewPost from '../components/forms/NewPostForm';

const UsersPage = () => {
    let { data } = useQuery(QUERY_ME);
    const [showRemoveAccount, setShowRemoveAccount] = useState(false);
    const [showAddNewPost, setShowAddNewPost] = useState(false);
    const handleShowRemoveAccount = () => setShowRemoveAccount(true)
    const handleCloseRemoveAccount = () => setShowRemoveAccount(false)
    const handleShowAddNewPost = () => setShowAddNewPost(true);
    const handleCloseAddNewPost = () => setShowAddNewPost(false);
    console.log(data)
    const me = data?.me;
    console.log('this is me', me)

    const myPosts = me?.posts.map((post: any) => {
        console.log(post)
        const comments = post?.comments.map((comment: any) => {
            return (
                <Row className="mb-3">
                    <Card key={comment?.owner}>
                        <CardHeader className='bg-danger text-white'>{comment.author}</CardHeader>
                        <Card.Body>{comment.text}</Card.Body>
                    </Card>
                </Row>
            )
        })
        return (
            <Row className="mb-3 justify-content-center">
                <Col>
                    <Card key={post?._id}>
                        <CardHeader className='bg-primary text-white'><Col className='ms-auto'><RemovePostButton postId={post._id} /></Col></CardHeader>
                        <Card.Body>{post.text}</Card.Body>
                        <Card.Footer>{comments}</Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    })

    const myFollowers = me?.followers.map((follower: any) => {
        console.log(follower)
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${follower._id}`)
        }
        return (
            <tr>
                <td>{follower.username}</td>
                <td><Button onClick={handleClick}>{follower?.username}'s Profile</Button></td>
                <td><RemoveFollowerButton _id={follower?._id} /></td>
            </tr>
        )
    })

    const whoIFollow = me?.following.map((following: any) => {
        console.log(following)
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${following._id}`)
        }
        return (
            <tr>
                <td>{following.username}</td>
                <td><Button onClick={handleClick}>{following?.username}'s Profile</Button></td>
                <td><RemoveFollowerButton _id={following?._id} /></td>
            </tr>
        )
    })
    return (
        Auth.loggedIn() ? (
            
            <Jumbotron>
                <div className='row justify-content-end'>
                    <div>
                        <Button onClick={() => handleShowRemoveAccount()} variant='danger'>Delete Account</Button>
                        <Modal show={showRemoveAccount} onHide={handleCloseRemoveAccount}>
                            <DeleteAccount />
                        </Modal>
                    </div>
                </div>
                <div>
                    <Row className='justify-content-center'>
                        <Col className='justify-content-center'>
                            <Row className='justify-content-center'>
                                <Col xs='auto'>
                                    <h5 className='mb-3'>My Posts:</h5>
                                </Col>
                                <Col xs='auto'>
                                    <Button onClick={() => handleShowAddNewPost()} variant='outline-success'><i className="bi bi-plus"></i></Button>
                                </Col>
                            </Row>
                            <Modal show={showAddNewPost} onHide={handleCloseAddNewPost}>
                                <Modal.Header>
                                    <Modal.Title>Add A New Post</Modal.Title>
                                    <Button onClick={() => handleCloseAddNewPost()} variant='outline-dark'>✗</Button>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddNewPost />
                                </Modal.Body>
                            </Modal>
                            <div>{myPosts}</div>

                        </Col>
                        <Col>
                            <h5 className='mb-3'>My Followers: </h5>
                            <div className='justify-content-center'><Table striped bordered hover responsive><tbody>{myFollowers}</tbody></Table></div>
                        </Col>
                        <Col>
                            <h5 className='mb-3'>Who I Follow: </h5>
                            <div className='justify-content-center'><Table striped bordered hover responsive><tbody>{whoIFollow}</tbody></Table></div>
                        </Col>
                    </Row>
                </div>
            </Jumbotron>

        ) : (
            <Jumbotron>
                <h3> You Are not authorized</h3>
            </Jumbotron>
        )
    )

    

}
export default UsersPage;