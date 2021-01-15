import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import title from '../Icons/title.png'

export const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="title"></Navbar.Brand>

            <Nav className="ml-auto links">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link >Learn More</Nav.Link>
            </Nav>
        </Navbar>
    )
}