import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import StackGrid, { transitions } from "react-stack-grid";
import Footer from "./Footer";
const { scaleDown } = transitions;

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { height: props.height, width: props.width };
  }

  componentDidMount() {
    this.props.fetchRecipes();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    console.log(this.state);
    const recipeList = _.map(this.props.recipes, (recipe, index) => {
      return (
        <div className="recipeItem card" key={recipe._id + index}>
          <div className="card-body">
            <h5 className="card-title">{recipe.label}</h5>

            <p className="card-text"> {recipe.description}</p>
            <h6 className="card-subtitle mb-2 text-muted">
              {" "}
              {recipe.categories ? (
                <div>
                  {recipe.categories.map(e => {
                    return <li key={e + index}>{e}</li>;
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
    });

    return (
      <div className="component_wrapper">
        <div className="container">
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
