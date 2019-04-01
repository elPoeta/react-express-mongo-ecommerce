import React from 'react'
import { Link } from 'react-router-dom';
import './CustomerMenu.css';
const CustomerMenu = () => (
    <div className='customer-menu'>
        <ul>
            <li><Link to='/editcustomer'><i className='fas fa-user-edit' />Edit Profile</Link></li>
            <li><Link to='/addaddress'><i className='fas fa-map-marker-alt' />Add Address</Link></li>
            <li><Link to='/myshopping'><i class="fas fa-shopping-bag" />My Shopping</Link></li>
        </ul>
    </div>
);
export default CustomerMenu;