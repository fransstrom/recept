import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipe } from "../actions";
import { Link } from "react-router-dom";
import RecipeNutrients from "./RecipeNutrients";
import InstructionList from "./InstructionList";
import IngredientList from "./IngredientList";
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
      <div className="component_wrapper recipe_view">
        <div className="container recipe_view_container">
          <div className="row" style={{ marginBottom: "20px" }}>
            <h2>{recipe.label}</h2>
            {recipe.imgUrl ? (
              <div
                style={{ backgroundImage: "url(" + recipe.imgUrl + ")" }}
                className="col-sm-12 col-md-5 col-lg-5 recipe_view_img_container"
              />
            ) : (
              ""
            )}

            <div className="col-sm-12 col-md-7 col-lg-7">
              {recipe.categories ? (
                <div className="categories_container">
                  {recipe.categories.map(e => {
                    return (
                      <h4>
                        <span class="badge badge-info text-capitalize">
                          {e}
                        </span>
                      </h4>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <p>{recipe.description}</p>
            </div>
          </div>
          <div className="row">
            {recipe.ingredients ? (
              <div className="col-sm-12 col-md-4 col-lg-4 recipe_view_ingredients">
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

            {recipe.instructions ? (
              <div className="col-sm-12 col-md-8 col-lg-8 recipe_view_instructions">
                <InstructionList instructions={recipe.instructions} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row recipe_view_bottom">
            <div className="col-sm-12 col-md-4 col-lg-4 recipe_view_nutrients">
              {recipe.instructions ? <RecipeNutrients recipe={recipe} /> : ""}
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Link className="btn btn-danger" to="/recept">
                Tillbaka
              </Link>
            </div>
          </div>
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
