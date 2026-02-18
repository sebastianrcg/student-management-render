import React from "react";
import { NavLink } from "react-router-dom";
import './navigation.css';

const Navigation = () =>{
    return (
        <nav className="navigation-section">
            <ul className="navigation-bar">
                <li><NavLink className="navigation-items" to={"/"}>Home</NavLink></li>
                <li><NavLink className="navigation-items" to={"/"}>Students</NavLink></li>
                <li><NavLink className="navigation-items" to={"/"}>Courses</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation;