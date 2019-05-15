import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import Recipes from "./components/Recipes";
import ReduxPromise from "redux-promise";
import RecipeView from "./components/RecipeView";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import CreateRecipe from "./components/CreateRecipeView";
import Auth from "./components/Authentication";

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };

    this.onAuthChange = this.onAuthChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
  }

  componentWillMount() {
    this.getUserStatus();
  }

  getUserStatus = () => {
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
          state.user.isSignedIn = GoogleAuth.isSignedIn.get();
          state.user.name = GoogleUser.w3.ofa;
          state.user.email = GoogleUser.w3.U3;
          state.user.img = GoogleUser.w3.Paa;
          this.setState({
            state
          });
          GoogleAuth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  onAuthChange = e => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    var GoogleUser = GoogleAuth.currentUser.get();
    var state = this.state;
    state.user.isSignedIn = GoogleAuth.isSignedIn.get();
    state.user.name = GoogleUser.w3.ofa;
    state.user.email = GoogleUser.w3.U3;
    state.user.img = GoogleUser.w3.Paa;
    this.setState({
      state
    });
  };

  signIn = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    // GoogleAuth.grantOfflineAccess({
    //   scope: "https://www.googleapis.com/auth/userinfo.email"
    // }).then(this.signInCallback);
    GoogleAuth.signIn().then(this.onAuthChange);
  };

  signOut = () => {
    var GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(this.onAuthChange);
  };

  // signInCallback = authResult => {
  //   if (authResult["code"]) {
  //     // Send the code to the server
  //     axios.post("http://localhost:3000/authorize", {
  //       code: authResult["code"],
  //       header: "X-Requested-With"
  //     });
  //   } else {
  //     console.log("failed to get authcode");
  //     // let userId = window.gapi.auth2.getAuthInstance().currentUser.Ab.El;
  //   }
  // };

  render() {
    return (
      <BrowserRouter>
        <Provider store={createStoreWithMiddleWare(reducers)}>
          <div className="main-container">
            <Navbar
              signOut={this.signOut}
              signIn={this.signIn}
              onAuthChange={this.onAuthChange}
              user={this.state.user}
            />
            <Switch>
              <Route
                path="/recept/nytt"
                render={() => <CreateRecipe user={this.state.user} />}
              />
              <Route path="/recept/:id" component={RecipeView} />

              <Route path="/recept" component={Recipes} />
              <Route path="/auth" component={Auth} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
