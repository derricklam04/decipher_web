import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = ({onHome, onAbout}) => {
    const selectHome = () =>{
        onHome()
    }
    const selectAbout = () =>{
        onAbout()
    }
    return (
        <Navbar className="top-nav" bg="" collapseOnSelect expand="lg" variant="dark">
            <Nav className="links">
                <Nav.Link onClick={selectHome}>Home</Nav.Link>
            </Nav>
            <Nav className="ml-auto links">
                <Nav.Link onClick={selectAbout}>Learn More</Nav.Link>
            </Nav>
        </Navbar>
    )
}