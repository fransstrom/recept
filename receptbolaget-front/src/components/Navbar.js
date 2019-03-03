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
              Frans Herrström
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
            <li>
                <Link to="/recept">Receptbolaget</Link>
              </li>
              <li>
                <Link to="/recept/nytt">Skapa recept</Link>
              </li>
          
            </ul>
            {/* <ul className="nav navbar-nav navbar-right">
              <li>
  
                <Link to="/">  <span className="glyphicon glyphicon-user" /> Sign Up</Link>
              </li>
              <li>
                <Link to="/"> <span className="glyphicon glyphicon-log-in" /> Login</Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    );
  }
}
