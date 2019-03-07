import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipe } from "../actions";
import { Link } from "react-router-dom";
import RecipeNutrients from "./RecipeNutrients";
import InstructionList from "./InstructionList";
import IngredientList from "./IngredientList";
import _ from "lodash";
import Footer from "./Footer";
class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portions: "4"
    };
    this.handlePortionChange = this.handlePortionChange.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }
  handlePortionChange(event) {
    this.setState({ portions: event.target.value });
  }
  render() {
    const { recipe } = this.props;

    // if (!recipe.label) {
    //   return (
    //     <div>
    //       <h2 className="warning">Finns inget recept med detta id</h2>
    //       <Link className="btn btn-danger" to="/recept">
    //         Tillbaka
    //       </Link>
    //     </div>
    //   );
    // }

    return (
      <div className="component_wrapper">
        <div className="container">
          <h2>{recipe.label}</h2>
          <p>{recipe.description}</p>
          {recipe.ingredients ? (
            <div>
              <IngredientList
                ingredients={recipe.ingredients}
                portions={this.state.portions}
              />
              <label>Antal portioner:</label>{" "}
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
            </div>
          ) : (
            ""
          )}
          <div />
          <div>
            <img className="recipeViewImg" alt="" src={recipe.imgUrl} />
          </div>
          {recipe.instructions ? (
            <InstructionList instructions={recipe.instructions} />
          ) : (
            ""
          )}
          {recipe.instructions ? <RecipeNutrients recipe={recipe} /> : ""}

          <Link className="btn btn-danger" to="/recept">
            Tillbaka
          </Link>
        </div>
        <Footer className="default_footer" />
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
