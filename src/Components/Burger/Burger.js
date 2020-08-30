import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Burger.css';

export default function Burger() {
    return (
        <Menu right>
            
            <a href="/">Home</a>

            <a href="/login">Log In</a>

            <a href="/signup">Sign Up</a>
            
        </Menu>
    )
}
