import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="text-light">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand">TopGuns Bank</div>
            <ul className="navbar-nav ms-auto text-muted">
              <li className="nav-item m-2">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link" to="/about">
                  SCB
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
