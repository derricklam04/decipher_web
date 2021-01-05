import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import title from '../Icons/title.png'

export const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="title"><img className="image" height={60} src={title}/></Navbar.Brand>
            <Nav className="ml-auto"></Nav>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="ml-auto links">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link >Learn More</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}