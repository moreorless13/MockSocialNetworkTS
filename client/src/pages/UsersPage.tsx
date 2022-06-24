import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Jumbotron from '../components/Jumbotron';
import { Card, Button, Modal, Row } from 'react-bootstrap'
import UnfollowUserButton from '../components/buttons/UnfollowUserButton';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import RemoveFollowerButton from '../components/buttons/RemoveFollowerButton';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const UsersPage = () => {
    let { data } = useQuery(QUERY_ME);
    const [show, setShow] = useState(false);
    const handleShowRemoveAccount = () => setShow(true)
    const handleCloseRemoveAccount = () => setShow(false)
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
            <Row className="mb-3">
                <Card key={post?._id}>
                    <CardHeader className='bg-primary text-white'>{post.author}</CardHeader>
                    <Card.Body>{post.text}</Card.Body>
                    <Card.Footer>{comments}</Card.Footer>
                </Card>
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
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>{follower.username}</Card.Title>
                    <Card.Subtitle>{follower.email}</Card.Subtitle>
                    <br />
                    <Button onClick={handleClick}>{follower?.username}'s Profile</Button>
                </Card.Body>
                <Card.Footer><RemoveFollowerButton _id={follower?._id} /></Card.Footer>
            </Card>
        )
    })

    const whoIFollow = me?.following.map((following: any) => {
        console.log(following)
        const handleClick = (event: any) => {
            event.preventDefault();
            window.location.assign(`/profile/${following._id}`)
        }
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{following.username}</Card.Title>
                    <Card.Subtitle>{following.email}</Card.Subtitle>
                    <br />
                    <Button onClick={handleClick}>{following?.username}'s Profile</Button>
                </Card.Body>
                <Card.Footer><UnfollowUserButton _id={following?._id} /></Card.Footer>
            </Card>
        )
    })
    return (
        Auth.loggedIn() ? (
            
            <Jumbotron>
                <div className='row justify-content-end'>
                    <div>
                        <Button onClick={() => handleShowRemoveAccount()} variant='danger'>Delete Account</Button>
                        <Modal show={show} onHide={handleCloseRemoveAccount}>
                            <DeleteAccount />
                        </Modal>
                    </div>
                </div>
                <h5>My Posts:</h5>
                <div className='row justify-content-center'>{myPosts}</div>
                <h6>My Followers: </h6>
                <div className='row justify-content-center'>
                    {myFollowers}
                </div>
                <h6>Who I Follow: </h6>
                <div className='row justify-content-center'>{whoIFollow}</div>
            
            </Jumbotron>

        ) : (
            <Jumbotron>
                <h3> You Are not authorized</h3>
            </Jumbotron>
        )
    )

    

}
export default UsersPage;