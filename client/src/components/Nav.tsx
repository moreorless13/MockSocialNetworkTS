import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Auth from '../utils/auth';


const NavigationBar = () => {
    const username = localStorage.getItem('username');
    if (Auth.loggedIn()) {
        return (
            <header>
                <Navbar expand='lg' className='p-3 bg-dark text-white' fixed='top'>
                    <Container>
                        <Navbar.Brand className='text-white' href='/'>Home</Navbar.Brand>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href='/userPage' className='text-white'>{username}'s Page</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='/' onClick={() => Auth.logout()} className='text-white'>Log Out</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        )
    } else {
        return (
            <header>
                <Navbar expand='lg' className='p-3 bg-dark text-white' fixed='top'>
                    <Container>
                        <Navbar.Brand className='text-white' href='/'>Home</Navbar.Brand>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href='/signup' className='text-white'>Sign Up</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='/login' className='text-white'>Login</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        )
    }
    
}
export default NavigationBar;