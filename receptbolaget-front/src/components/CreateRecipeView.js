import React, { Component } from "react";
import RecipeForm from "./RecipeForm";
import Footer from "./Footer";
export default class CreateRecipeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component_wrapper">
        <div className="container">
          {this.props.user.isSignedIn === true ? (
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
