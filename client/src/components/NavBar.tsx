import React from 'react';
import Auth from '../utils/auth';

const NavBar = () => {
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