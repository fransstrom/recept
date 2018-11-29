import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
class RecipeForm2 extends Component {
  constructor() {
    super();
    this.state = {
      addedIngredients: [], // this holds the name of each list
      items: {} // this property names of this object are the names of the lists; their values are arrays of the items in each list
    };
  }

  handleIngredientsSearch(e) {
    this.props.fetchIngredients(e);
  }
  ingredientSearch = _.debounce(e => this.handleIngredientsSearch(e), 400);

  handle(e) {
   let list=this.state.addedIngredients;
   list.push(e);
   this.setState({addedIngredients:list})
    console.log(this.state.addedIngredients);
  }



  render() {
    let ingredients = _.map(this.props.ingredients);
    let ingredientsAddButtons = ingredients.map(ingredients => (
      <li className="autoCompleteList" key={ingredients._id}>
        {ingredients.Namn}
        <button
          ingred={ingredients}
          onClick={e => this.handle(ingredients)}
          className="btn btn-primary">
          Lägg till
        </button>
      </li>
    ));
    console.log(this.props.ingredients);

    return (
      <div>
        <input
          label="Sök ingredienser"
          type="text"
          onChange={e => {
            if (e.target.value) {
              this.ingredientSearch(e.target.value);
            }
          }}
          component={this.renderField}
        />

        {ingredientsAddButtons}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ingredients: state.ingredients
  };
}
RecipeForm2 = connect(
  mapStateToProps,
  { fetchIngredients }
)(RecipeForm2);

export default RecipeForm2;
