import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './nav/Navbar';
import NavCategories from './nav/NavCategories';
import './Header.css';

const Header = () => (
    <div className='sticky'>
        <header>
            <h1><Link to="/">E-commerce</Link></h1>
            <NavCategories />
            <Navbar />
        </header>
    </div>
);

export default Header;
