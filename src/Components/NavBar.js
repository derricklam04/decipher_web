import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <Navbar className="top-nav" bg="" collapseOnSelect expand="lg" variant="dark">
            <Nav className="links">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>

            <Navbar.Brand className="title"></Navbar.Brand>

            <Nav className="ml-auto links">
                <Nav.Link href="/about"> Learn More</Nav.Link>
            </Nav>
        </Navbar>
    )
}