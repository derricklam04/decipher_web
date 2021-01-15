import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import title from '../Icons/title.png'

export const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Nav className="links">
                <Nav.Link >Home</Nav.Link>
            </Nav>

            <Navbar.Brand className="title"></Navbar.Brand>

            <Nav className="ml-auto links">
                <Nav.Link >Learn More</Nav.Link>
            </Nav>
        </Navbar>
    )
}