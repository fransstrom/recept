import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import _ from 'lodash';
class Recipes extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {
    // let recipeList = Object.values(this.props.recipes);

    // return recipeList.map(recipe => {
    //   return <li key={recipe._id}>{recipe.Name} {recipe.Description} {recipe.date}</li>;
    // });
    return _.map(this.props.recipes, recipe => {
      return (
        <li key={recipe._id}>
          {recipe.Name} {recipe.Description}
        </li>
      );
    });
  }

  render() {
    return <div>{this.renderRecipes()}</div>;
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}
export default connect(
  mapStateToProps,
  { fetchRecipes }
)(Recipes);
