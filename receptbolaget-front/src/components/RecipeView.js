import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../actions';
import { Link } from 'react-router-dom';
import RecipeNutrients from './RecipeNutrients';
import InstructionList from './InstructionList';
import IngredientList from './IngredientList';
import _ from 'lodash';
class RecipeView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }

  render() {
    const { recipe } = this.props;

    return (
      <div>
        <h2>{recipe.label}</h2>
        <p>{recipe.description}</p>
        <div>
          <img className="recipeViewImg" alt="" src={recipe.imgUrl} />
        </div>
        {recipe.instructions ? (
          <InstructionList instructions={recipe.instructions} />
        ) : (
          ''
        )}
        {recipe.instructions ? <RecipeNutrients recipe={recipe} /> : ''}
        {recipe.ingredients ? <IngredientList ingredients={recipe.ingredients} /> : ''}
        <Link className="btn btn-danger" to="/">
          Tillbaka
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ recipe }) {
  return { recipe };
}

export default connect(
  mapStateToProps,
  { fetchRecipe }
)(RecipeView);
