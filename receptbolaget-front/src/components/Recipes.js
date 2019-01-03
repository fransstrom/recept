import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import StackGrid, { transitions } from 'react-stack-grid';
const { scaleDown } = transitions;
class Recipes extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    console.log(this.props.recipes.categories);
    const recipeList = _.map(this.props.recipes, (recipe, index) => {
      return (
        <div className="recipeItem" key={recipe._id + index}>
          <h4>{recipe.label}</h4>
          <p>{recipe.description}</p>
          <div>
            {recipe.categories ? (
              <div>
                {recipe.categories.map(e => {
                  return <li>{e}</li>;
                })}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <Link className="btn btn-primary" to={'/recept/' + recipe._id}>
              Visa recept
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div>
        <StackGrid
          appear={scaleDown.appear}
          appeared={scaleDown.appeared}
          enter={scaleDown.enter}
          entered={scaleDown.entered}
          leaved={scaleDown.leaved}
          columnWidth={300}>
          {recipeList}
        </StackGrid>
        <div>
          <Link className="btn btn-success" to="/recept/nytt">
            Lägg till recept
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}
export default connect(
  mapStateToProps,
  { fetchRecipes }
)(Recipes);
