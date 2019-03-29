import React from "react";
import { Link } from "react-router-dom";
import "./DashboardMenu.css";
const DashboardMenu = () => (
  <div className="customer-menu">
    <ul className="dashboard-menu">
      <li>
        <Link to="/admin/add-category">
          <i className="fas fa-plus" />
          Add Category
        </Link>
      </li>
      <li>
        <Link to="/admin/edit-category/categories">
          <i className="fas fa-edit" />
          Edit Category
        </Link>
      </li>
      <li>
        <Link to="/admin/add-product">
          <i className="fas fa-plus" />
          Add Product
        </Link>
      </li>
      <li>
        <Link to="/admin/edit-product">
          <i className="fas fa-edit" />
          Edit Product
        </Link>
      </li>
      <li>
        <Link to="/my-account">
          <i className="fas fa-user" />
          My Account
        </Link>
      </li>
    </ul>
  </div>
);

export default DashboardMenu;
