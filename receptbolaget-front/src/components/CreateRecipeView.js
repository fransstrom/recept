import React, { Component } from "react";
import RecipeForm from "./RecipeForm";
import Footer from "./Footer";
export default class CreateRecipeView extends Component {
  render() {
    return (
      <div className="component_wrapper">
        <div className="container">
          <RecipeForm />
        </div>
        <Footer className="default_footer" />
      </div>
    );
  }
}
