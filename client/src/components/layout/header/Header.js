import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Header.css';

const Header = () => (
    <div className='sticky'>
        <header>
            <h1><Link to="/">E-commerce</Link></h1>
            <ul>
                <li>products</li>
            </ul>
            <Navbar />
        </header>
    </div>
);

export default Header;
