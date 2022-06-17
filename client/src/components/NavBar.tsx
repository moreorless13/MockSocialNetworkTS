import React, { useState } from 'react';
import Auth from '../utils/auth';

const NavBar = () => {
    const [tab, setTab] = useState('Profile')
    const handleTabChange = (tab: any) => setTab(tab)
    const renderTab = () => {
        
    }
    if (Auth.loggedIn()) {
        return (
            <header className='p-3 bg-dark text-white'>
                <div className='container-fluid'>

                </div>

            </header>
        )
    } else {
        return (
            <header className='p-3 bg-dark text-white'>
                <div className='container-fluid'>

                </div>

            </header>
        )
    }
};

export default NavBar;