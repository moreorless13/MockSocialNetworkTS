import React from 'react';
import { Card } from 'react-bootstrap'

const UsersPostsTab = ({ posts, username }: any) => {
    const UsersPosts = posts?.map((post: any) => {
        const PostComments = post?.comments.map((comment: any) => {
            console.log('these are user comments', comment)
            const CommentDate = new Date(comment?.createdAt)
            return (
                <Card className='mb-4' key={comment?._id}>
                    <Card.Header className='bg-danger justify-content-center text-white' key={comment?.author}>{comment?.author}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle className='mb-3'>{CommentDate.toLocaleDateString()}</Card.Subtitle>
                        <Card.Subtitle className='mb-3'>{CommentDate.toLocaleTimeString()}</Card.Subtitle>
                        <Card.Text>{comment?.text}</Card.Text>
                    </Card.Body>
                </Card>
            )
        })
        return ( 
            <Card className='justify-content-center' key={post?._id}>
                <Card.Header className='bg-primary' key={post?.author}>{post?.author}</Card.Header>
                <Card.Body key={post?.text}>{post?.text}</Card.Body>
                <Card.Footer>{PostComments}</Card.Footer>
            </Card>
        )
    })
    const numberOfPosts = posts?.length
    return (
        <div>
            <div className='row justify-content-center'>{username}'s Posts: {(numberOfPosts === 0) ? <div><p>No Posts Yet</p></div> : <div><p>{numberOfPosts}</p></div>}</div>
            <div className='row justify-content-center'>
                {UsersPosts}
            </div>
        </div>
    )
}

export default UsersPostsTab