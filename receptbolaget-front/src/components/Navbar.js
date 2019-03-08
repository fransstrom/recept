import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null,
      user: {
        email: "",
        name: ""
      }
    };
  }
  componentDidMount() {
    var GoogleAuth;

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyCLcIH2WhxPsjJmhrQHAoiv22-pfv7hG0Q",
          client_id:
            "943135891490-35beekcmehg06dgj5254js8ftatbgh7m.apps.googleusercontent.com",
          // Scopes to request in addition to 'profile' and 'email'
          scope: "https://www.googleapis.com/auth/userinfo.email"
        })
        .then(() => {
          GoogleAuth = window.gapi.auth2.getAuthInstance();

          // var state = this.state;
          // state.isSignedIn = GoogleAuth.isSignedIn.get();
          // state.user.name = GoogleUser.w3.ofa;
          // this.setState({
          //   state
          // });

          GoogleAuth.isSignedIn.listen(this.onAuthChange());
        });
    });
  }

  onAuthChange = e => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    var GoogleUser = GoogleAuth.currentUser.get();
    var state = this.state;
    state.isSignedIn = GoogleAuth.isSignedIn.get();
    state.user.name = GoogleUser.w3.ofa;
    state.user.email = GoogleUser.w3.U3;
    console.log(GoogleUser);
    this.setState({
      state
    });
  };

  signIn = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then(this.onAuthChange);
    console.log(this.state);
  };

  signOut = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(this.onAuthChange);
  };

  render() {
    console.log(this.state);
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
                {this.state.isSignedIn === true ? (
                  <a onClick={this.signOut}>
                    Sign out
                    {" " + this.state.user.name}
                  </a>
                ) : (
                  <a onClick={this.signIn}>
                    <span className="glyphicon glyphicon-log-in" /> Sign in
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
