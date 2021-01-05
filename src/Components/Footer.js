import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'

export const Footer = () => {
    return (
        <Navbar className="footer" fixed="bottom" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Nav className="ml-auto"><Nav.Link >Developed by Derrick Lam | Student at Stony Brook University | Jan 2021</Nav.Link></Nav>
        </Navbar>
    )
}