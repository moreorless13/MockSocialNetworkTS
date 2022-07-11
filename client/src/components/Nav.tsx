import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Auth from '../utils/auth';


const NavigationBar = () => {
    const username = localStorage.getItem('username');
    const [key, setKey] = useState('/')
    if (Auth.loggedIn()) {
        return (
            <header>
                <Navbar expand='lg' className='p-3 bg-dark text-white' fixed='top'> 
                    <Container>
                        <Navbar.Brand className='text-white' href='/'>Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                            <Nav activeKey={key} onSelect={(key: any) => setKey(key)} className='justify-content-end'>
                                <Nav.Item>
                                    <Nav.Link eventKey='/userPage' href='/userPage' className='text-white'>{username}'s Page</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/' onClick={() => Auth.logout()} className='text-white'>Log Out</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    } else {
        return (
            <header>
                <Navbar expand='lg' className='bg-dark text-white' fixed='top'>
                    <Container>
                        <Navbar.Brand className='text-white justify-content-start' href='/'>Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' className='justify-content-end' />
                        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link href='/signup' className='text-white'>Sign Up</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/login' className='text-white'>Login</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }
    
}
export default NavigationBar;