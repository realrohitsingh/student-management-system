import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>My React App</h1>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
