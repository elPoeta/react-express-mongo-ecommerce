import React from 'react'
import { Link } from 'react-router-dom';
import TextField from '../common/input/TextField';
import './DashboardMenu.css';
const DashboardMenu = () =>
    (

        <div className='customer-menu'>
            <div>
                <i className="fas fa-search"></i><input type="search" />
            </div>
            <ul>
                <li><Link to='/admin/add-category'><i className='fas fa-plus' />Add Category</Link></li>
                <li><Link to='/admin/edit-category'><i className='fas fa-edit' />Edit Category</Link></li>
                <li><Link to='/admin/add-product'><i className='fas fa-plus' />Add Product</Link></li>
                <li><Link to='/admin/edit-product'><i className='fas fa-edit' />Edit Product</Link></li>
            </ul>

        </div>
    )


export default DashboardMenu
