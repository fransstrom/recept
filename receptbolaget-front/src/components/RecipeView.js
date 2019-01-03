import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../actions';
import { Link } from 'react-router-dom';
import RecipeNutrients from './RecipeNutrients';
import InstructionList from './InstructionList';
import IngredientList from './IngredientList';
class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portions: '4'
    };
    this.handlePortionChange = this.handlePortionChange.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }
  handlePortionChange(event) {
    console.log(event.target.value);
    console.log(this.state.portions);
    this.setState({ portions: event.target.value });
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
        {recipe.ingredients ? (
          <IngredientList ingredients={recipe.ingredients} portions={this.state.portions}/>
        ) : (
          ''
        )}
        <select
          value={this.state.portions}
          onChange={this.handlePortionChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
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
