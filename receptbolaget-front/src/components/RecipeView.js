import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../actions';
import { Link } from 'react-router-dom';
class RecipeView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }
  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return ' loading';
    }

    return (
      <div>
        <h2>{recipe.label}</h2>

        <p>{recipe.description}</p>
        <div>
          <img alt="" src={recipe.imgUrl} />
        </div>

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
