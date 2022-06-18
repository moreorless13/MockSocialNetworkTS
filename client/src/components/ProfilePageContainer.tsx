import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Auth from '../utils/auth';
import FollowersTab from './ProfileTabs/FollowersTab';
import FollowingTab from './ProfileTabs/FollowingTab';

const ProfilePageContainer = () => {
    const [key, setKey] = useState('Posts');

    return (
        <Tabs id='controlled-tabs' activeKey={key} onSelect={(key: any) => setKey(key)} className='mb-3'>
            <Tab eventKey='Posts' title='Posts'></Tab>
            <Tab eventKey='Following' title='Following'><FollowingTab /></Tab>
            <Tab eventKey='Followers' title='Followers'><FollowersTab /></Tab>
        </Tabs>
    )
}

export default ProfilePageContainer;