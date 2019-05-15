import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import StackGrid, { transitions } from "react-stack-grid";
import Footer from "./Footer";
import RecipeSearchBar from "./RecipeSearchBar";
const { scaleDown } = transitions;

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      width: props.width,
      searchVal: "",
      categories: []
    };
    this.recipeSearch = this.recipeSearch.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes(this.state.searchVal);
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleRecipesSearch(e) {
    // this.setState({ fetching_ingred: true });
    this.setState({
      searchVal: e
    });
    this.props
      .fetchRecipes(e)
      .then(e => {
        console.log(e);
      })
      .then(() => {
        // this.setState({ fetching_ingred: false });
      });
  }
  onCheckChange(e) {
    // current array of options
    let categories = this.state.categories;
    let index;
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      categories.push(e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = categories.indexOf(e.target.value);
      categories.splice(index, 1);
    }
    this.setState({ categories: categories });
  }

  recipeSearch = _.debounce(e => {
    this.handleRecipesSearch(e);
  }, 600);

  render() {
    const recipeList = _.map(this.props.recipes, (recipe, index) => {
      if (_.difference(this.state.categories, recipe.categories).length === 0) {
        return (
          <div className="recipeItem card" key={recipe._id + index}>
            <div className="card-body">
              <h4 className="card-title">{recipe.label}</h4>
              <p className="card-text"> {recipe.description}</p>
              <h6 className="card-subtitle mb-2 text-muted">
                {" "}
                {recipe.categories ? (
                  <div>
                    {recipe.categories.map(e => {
                      return (
                        <li className="categories_recipe_card" key={e + index}>
                          {e}
                        </li>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </h6>
              <Link className="btn btn-primary" to={"/recept/" + recipe._id}>
                Visa recept
              </Link>
            </div>
          </div>
        );
      }
    });

    return (
      <div className="component_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <RecipeSearchBar inputHandle={this.recipeSearch} />
            </div>
            <div className="form-group category-group col-sm-12 col-md-12 col-lg-6">
              <div className="form-check col">
                <label className="form-check-label">Vegetariskt </label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="vegetarisk"
                />
              </div>

              <div className="form-check col">
                <label className="form-check-label">Vegansk </label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="vegansk"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Glutenfri </label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="glutenfri"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Laktosfri </label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="laktosfri"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Proteinrikt</label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="proteinrikt"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Enkelt</label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="enkelt"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Avancerat</label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="avancerat"
                />
              </div>
              <div className="form-check col">
                <label className="form-check-label">Snabbt</label>
                <input
                  onChange={this.onCheckChange}
                  className="form-check-input"
                  type="checkbox"
                  value="snabbt"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <StackGrid
                appear={scaleDown.appear}
                appeared={scaleDown.appeared}
                enter={scaleDown.enter}
                entered={scaleDown.entered}
                leaved={scaleDown.leaved}
                columnWidth={this.state.width <= 768 ? "100%" : "33.33%"}>
                {recipeList}
              </StackGrid>
            </div>
          </div>
        </div>
        <Footer className="default_footer" />
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
