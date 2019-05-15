import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse noselect">
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Receptbolaget
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/recept">Se recept</Link>
                    </li>
                    <li>
                      <Link to="/recept/nytt">Skapa recept</Link>
                    </li>
                  </ul>
                </div>
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
            <ul className="nav navbar-nav navbar-right">
              <li>
                {this.props.user.isSignedIn === true ? (
                  <a onClick={this.props.signOut}>
                    Sign out
                    {" " + this.props.user.name}
                  </a>
                ) : (
                  <a onClick={this.props.signIn}>
                    <span className="glyphicon glyphicon-log-in" /> Sign in with
                    google
                  </a>
                )}
              </li>

              {this.props.user.isSignedIn === true ? (
                <li className="nav-item dropdown nav_li_img">
                  <a
                    className="nav-link dropdown-toggle"
                    id="nav_img_dropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <img
                      className="google_img"
                      src={this.props.user.img}
                      alt="Profilepic"
                    />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="nav_img_dropdown">
                    <ul className="nav navbar-nav">
                      <li>
                        <Link to="/recept">Favoriter</Link>
                      </li>
                      <li>
                        <Link to="/recept/nytt">Inställningare</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
