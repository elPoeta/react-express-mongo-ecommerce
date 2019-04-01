import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./nav/Navbar";
import NavCategories from "./nav/NavCategories";
import "./Header.css";

const Header = () => (
  <div className="sticky">
    <header>
      <figure>
        <img src="https://www.freeiconspng.com/uploads/bike-icon-30.png" alt="not found" />
      </figure>
      <h1>
        <Link to="/">eBike</Link>
      </h1>
      <NavCategories />
      <Navbar />
    </header>
  </div>
);

export default Header;
