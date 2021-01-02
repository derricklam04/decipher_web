import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

export const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Encryption Breaker</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Vigenere Cipher</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Caeser Cipher</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventKey={2} href="#memes">
                    About
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    )
}