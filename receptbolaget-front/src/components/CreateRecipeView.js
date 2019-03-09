import React, { Component } from "react";
import RecipeForm from "./RecipeForm";
import Footer from "./Footer";
export default class CreateRecipeView extends Component {
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
  componentWillMount() {
    var GoogleAuth;
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyCLcIH2WhxPsjJmhrQHAoiv22-pfv7hG0Q",
          client_id: process.env.REACT_APP_CLIENT_ID,
          // Scopes to request in addition to 'profile' and 'email'
          scope: "https://www.googleapis.com/auth/userinfo.email"
        })
        .then(() => {
          GoogleAuth = window.gapi.auth2.getAuthInstance();
          var GoogleUser = GoogleAuth.currentUser.get();
          var state = this.state;
          state.isSignedIn = GoogleAuth.isSignedIn.get();
          state.user.name = GoogleUser.w3.ofa;
          this.setState({
            state
          });
          GoogleAuth.isSignedIn.listen(this.onAuthChange);
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

  render() {
    return (
      <div className="component_wrapper">
        <div className="container">
          {this.state.isSignedIn === true ? (
            <RecipeForm />
          ) : (
            <h1>You need to be signed in to create recipe</h1>
          )}
        </div>
        <Footer className="default_footer" />
      </div>
    );
  }
}
