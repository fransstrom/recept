import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';

class RecipeForm2 extends Component {
  constructor() {
    super();
    this.state = {
      addedIngredients: [], // this holds the name of each list
    };

  }

  handleIngredientsSearch(e) {
    this.props.fetchIngredients(e);
  }
  ingredientSearch = _.debounce(e => this.handleIngredientsSearch(e), 200);

  handle(e) {
    let addedIngredients = this.state.addedIngredients;
    addedIngredients.push(e);
    this.setState({ addedIngredients });
  }

  removeIngredient(e) {
    const addedIngredients = this.state.addedIngredients.filter(
      ingredient => ingredient._id !== e.target.value
    );
    this.setState({
      addedIngredients
    });
  }

  handleIngredientAmount(e) {
    let id = e.target.getAttribute('amount');
    let addedIngredients = [...this.state.addedIngredients];
    const index = addedIngredients.findIndex(
      ingredient => ingredient._id === id
    );
    addedIngredients[index].amount = e.target.value;
    this.setState({ addedIngredients });
  }

  render() {
    let ingredients = _.map(this.props.ingredients);
    let ingredientsAddButtons = ingredients.map(ingredients => (
      <li key={ingredients._id}>
        {ingredients.Namn}

        <button
          ingredient={ingredients}
          onClick={e => this.handle(ingredients)}
          className="btn btn-primary">
          Lägg till
        </button>
      </li>
    ));

    let addedIngredientsList=this.state.addedIngredients.map(ingredient => {
      return (
        <p key={ingredient._id}>
          {ingredient.Namn}{' '}
          <input
            amount={ingredient._id}
            label="Mängd i gram"
            onChange={e => this.handleIngredientAmount(e)}
          />
          <button
            value={ingredient._id}
            onClick={e => this.removeIngredient(e)}>
            Remove
          </button>
        </p>
      );
    })
    console.log(this.state);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <input
            label="Sök ingredienser"
            type="text"
            onChange={e => {
              if (e.target.value && e.target.value.length > 2) {
                this.ingredientSearch(e.target.value);
              } else {
                this.ingredientSearch(null);
              }
            }}
            component={this.renderField}
          />
          {ingredientsAddButtons}
        </div>

        <div className="col-sm-12 col-md-6 col-lg-6">
          {addedIngredientsList}
        </div>
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
