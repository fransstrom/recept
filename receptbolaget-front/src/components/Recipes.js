import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
class Recipes extends Component {
  componentDidMount() {
    this.props.fetchRecipes();


  }

  renderRecipes() {
    //Variant utan lodash.
    // let recipeList = Object.values(this.props.recipes);

    // return recipeList.map(recipe => {
    //   return <li key={recipe._id}>{recipe.Name} {recipe.Description} {recipe.date}</li>;
    // });

    return _.map(this.props.recipes, (recipe, index) => {
      return (
        <li key={recipe._id+index}>
         <h4 >{recipe.label}</h4>  
         <p>{recipe.description}</p>
         <p></p>
          <div >
            <Link className="btn btn-primary" to={'/recept/'+recipe._id}>Visa recept</Link>
          </div>
        </li>
      );
    });
  }

  render() {

    
    return (
      <div>
        <ul>
        {this.renderRecipes()}
        </ul>
        <div>
          <Link className="btn btn-success" to="/add">Lägg till recept</Link>
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
