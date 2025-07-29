import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div>
                <span className="ice-cream-icon">🍦</span>
                <h1>Polar House</h1>
            </div>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? '' : 'active')}
                >
                    Menu
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
