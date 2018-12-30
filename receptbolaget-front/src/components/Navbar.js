import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">
              {' '}
              Frans Herrström
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/add">Skapa recept</Link>
              </li>
              <li>
                <Link to="/allrecipes">Alla recept</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-user" /> Sign Up
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-log-in" /> Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
