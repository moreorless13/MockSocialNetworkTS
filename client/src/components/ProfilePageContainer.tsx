import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FollowersTab from './ProfileTabs/FollowersTab';
import FollowingTab from './ProfileTabs/FollowingTab';
import UsersPostsTab from './ProfileTabs/Posts';

const ProfilePageContainer = ({username, posts, following, followers}: any) => {
    const [key, setKey] = useState('Posts');

    return (
        <Tabs id='controlled-tabs' activeKey={key} onSelect={(key: any) => setKey(key)} className='mb-3'>
            <Tab eventKey='Posts' title='Posts'><UsersPostsTab username={username} posts={posts} /> </Tab>
            <Tab eventKey='Following' title='Following'><FollowingTab username={username} following={following} /></Tab>
            <Tab eventKey='Followers' title='Followers'><FollowersTab username={username} followers={followers} /></Tab>
        </Tabs>
    )
}

export default ProfilePageContainer;