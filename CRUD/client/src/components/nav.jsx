import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <div className="logo">
                Students-CRUD
            </div>
            <div className="navbar">
                <NavLink to="/" exact activeClassName="active" className="link">Home</NavLink>
                <NavLink to="/create" exact activeClassName="active" className="link">Create</NavLink>
                <NavLink to="/update" exact activeClassName="active" className="link">Update</NavLink>
            </div>
        </nav>
    )
}

export default Nav
