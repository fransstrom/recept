import React, { Component } from "react";

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    };
  }

  componentDidMount() {
    var GoogleAuth;
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id:
            "943135891490-35beekcmehg06dgj5254js8ftatbgh7m.apps.googleusercontent.com",
          // Scopes to request in addition to 'profile' and 'email'
          scope: "https://www.googleapis.com/auth/userinfo.email"
        })
        .then(() => {
          GoogleAuth = window.gapi.auth2.getAuthInstance();

          this.setState({
            isSignedIn: GoogleAuth.isSignedIn.get()
          });
        });
    });
  }

  signIn = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();

    GoogleAuth.signIn();
    this.setState({
      isSignedIn: true
    });
    var GoogleUser = GoogleAuth.currentUser.get();

    GoogleUser.grant({
      scope: "https://www.googleapis.com/auth/userinfo.email"
    });

    console.log(this.state);
  };

  signOut = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
    this.setState({
      isSignedIn: false
    });
    console.log(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.isSignedIn === true ? (
          <button
            className="btn btn-primary"
            style={{ marginTop: "200px" }}
            onClick={this.signOut}>
            Sign out
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ marginTop: "200px" }}
            onClick={this.signIn}>
            Sign in
          </button>
        )}
      </div>
    );
  }
}
