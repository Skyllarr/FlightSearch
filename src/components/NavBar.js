import React from 'react'
import {Navbar, NavbarBrand} from 'reactstrap'

import {nextPath} from "../routes/history"
import './NavBar.css'

const NavBar = () => (
    <div>
        <Navbar color="dark" className="menu-link" dark expand="md">
            <NavbarBrand className="ml-lg-5" onClick={() => nextPath('/')}>Home</NavbarBrand>
        </Navbar>
    </div>
)

export default NavBar
