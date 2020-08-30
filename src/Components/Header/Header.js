import React from 'react';
import './Header.css';
import Burger from '../Burger/Burger';

export default function Navbar() {
    return (
        <div className="nav">

            <div className="title">
                <a href="/">Training Tracker</a>
            </div>

            <div>
                <Burger pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </div>

        </div>
    )
}
