import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchIngredients } from "../actions";
import _ from "lodash";
import RecipeFormPreview from "./RecipeFormPreview";

class RecipeForm extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        ingredients: [],
        label: "",
        description: "",
        categories: [],
        imgUrl: "",
        instructions: [{ step: "" }]
      },
      fetching_ingred: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIngredientAmount = this.handleIngredientAmount.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.postRecipe = this.postRecipe.bind(this);
    this.handleIngredientMeasureUnitAmount = this.handleIngredientMeasureUnitAmount.bind(
      this
    );
  }

  handleIngredientsSearch(e) {
    this.setState({ fetching_ingred: true });
    this.props
      .fetchIngredients(e)
      .then(e => {
        console.log("fetching");
      })
      .then(() => {
        this.setState({ fetching_ingred: false });
      });
  }
  ingredientSearch = _.debounce(e => {
    this.handleIngredientsSearch(e);
  }, 1100);

  addIngredient(e) {
    var recipe = this.state.recipe;
    let ingredients = [...this.state.recipe.ingredients];
    e.measure = "g";
    ingredients.push(e);
    recipe.ingredients.push(e);
    this.setState({ recipe });
  }

  removeIngredient(e) {
    var recipe = this.state.recipe;
    const ingredients = recipe.ingredients.filter(
      ingredient => ingredient._id !== e.target.value
    );

    recipe.ingredients = ingredients;
    this.setState({
      recipe
    });
  }

  handleIngredientAmount(e) {
    let id = e.target.getAttribute("amount");
    let ingredients = [...this.state.recipe.ingredients];
    const index = ingredients.findIndex(ingredient => ingredient._id === id);
    ingredients[index].amount = e.target.value;
    this.setState({ ingredients });
  }

  handleIngredientMeasureUnitAmount(e) {
    let id = e.target.getAttribute("quantity");
    let ingredients = [...this.state.recipe.ingredients];
    const index = ingredients.findIndex(ingredient => ingredient._id === id);
    ingredients[index].quantity = e.target.value;
    this.setState({ ingredients });
  }

  handleIngredientMeasureUnit(e) {
    let id = e.target.getAttribute("measure");
    let ingredients = [...this.state.recipe.ingredients];
    const index = ingredients.findIndex(ingredient => ingredient._id === id);
    ingredients[index].measure = e.target.value;
    this.setState({ ingredients });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    var recipe = this.state.recipe;
    recipe[name] = value;

    this.setState({
      recipe: recipe
    });
  }

  handleInstructionStepChange = idx => evt => {
    var recipe = this.state.recipe;

    const newInstructions = this.state.recipe.instructions.map(
      (instruction, sidx) => {
        if (idx !== sidx) return instruction;
        return { ...instruction, step: evt.target.value };
      }
    );

    recipe.instructions = newInstructions;
    this.setState({ recipe });
  };

  handleAddInstruction = () => {
    var recipe = this.state.recipe;
    var instructions = recipe.instructions;

    instructions = instructions.concat([{ step: "" }]);
    recipe.instructions = instructions;
    this.setState({
      recipe
    });
  };

  handleRemoveInstruction = idx => () => {
    var recipe = this.state.recipe;

    if (recipe.instructions.length > 1)
      recipe.instructions = recipe.instructions.filter(
        (s, sidx) => idx !== sidx
      );
    this.setState({
      recipe
    });
  };

  postRecipe = e => {
    e.preventDefault();
    console.log(JSON.stringify(this.state.recipe));
    let recipe = JSON.stringify(this.state.recipe);
    fetch("http://localhost:3000/saverecipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: recipe
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        console.log("responsebody:", body);
        window.location.replace("https://mrpwr.se/recept");
      })
      .catch(e => console.log(e, "error"));
  };

  onCheckChange(e) {
    // current array of options
    let categories = this.state.recipe.categories;
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

  render() {
    let fetching_ingred = this.state.fetching_ingred;

    let ingredients = _.map(this.props.ingredients);
    let ingredientsAddButtons = ingredients.map(ingredients => (
      <li className="list-group-item autoCompleteList" key={ingredients._id}>
        {ingredients.Namn}
        <button
          ingredient={ingredients}
          onClick={e => this.addIngredient(ingredients)}
          className="btn btn-primary">
          +
        </button>
      </li>
    ));

    let ingredientsList = this.state.recipe.ingredients.map(
      (ingredient, index) => {
        return (
          <li className="list-group-item addedIngredient" key={ingredient._id}>
            <p className="ingredient_list_names">
              {index + 1}.{" " + ingredient.Namn}
            </p>
            <input
              required
              min="0"
              step="any"
              type="number"
              quantity={ingredient._id}
              placeholder="Antal måttenheter"
              onChange={this.handleIngredientMeasureUnitAmount}
            />
            <select
              measure={ingredient._id}
              defaultValue="g"
              onChange={e => this.handleIngredientMeasureUnit(e)}>
              <option value="tsk">Tesked</option>
              <option value="msk">Matsked</option>
              <option value="kg">Kilo</option>
              <option value="g">Gram</option>
              <option value="dl">Deciliter</option>
              <option value="cl">Centiliter</option>
              <option value="ml">Milliliter</option>
              <option value="klyftor">klyftor</option>
            </select>
            <input
              required
              type="number"
              step="any"
              min="0"
              amount={ingredient._id}
              placeholder="Mängd i gram"
              onChange={this.handleIngredientAmount}
            />
            <button
              className="btn btn-danger"
              value={ingredient._id}
              onClick={this.removeIngredient}>
              -
            </button>
          </li>
        );
      }
    );

    const instructionInputList = this.state.recipe.instructions.map(
      (instruction, idx) => (
        <div key={idx} className="form-instructions">
          <input
            required
            className="form-control"
            type="text"
            placeholder={`Instruktion #${idx + 1}`}
            value={instruction.step}
            onChange={this.handleInstructionStepChange(idx)}
          />
          <button
            type="button"
            onClick={this.handleRemoveInstruction(idx)}
            className="btn btn-danger">
            -
          </button>
        </div>
      )
    );

    return (
      <div className="row">
        <form onSubmit={this.postRecipe}>
          <div className="col-sm-12 col-md-7 col-lg-7">
            <div className="form-group">
              <label htmlFor="form-name">Namn</label>
              <input
                required
                className="form-control"
                id="form-name"
                type="text"
                name="label"
                value={this.state.recipe.label}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-description">Beskrivning</label>
              <textarea
                required
                className="form-control"
                id="form-description"
                type="comment"
                name="description"
                value={this.state.recipe.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group category-group container">
              <div className="row">
                <div className="form-check col">
                  <label className="form-check-label">Vegetariskt </label>
                  <input
                    onChange={this.onCheckChange}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="vegetarisk"
                  />
                </div>

                <div className="form-check col">
                  <label className="form-check-label">Vegansk </label>
                  <input
                    onChange={this.onCheckChange}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="vegansk"
                  />
                </div>
                <div className="form-check col">
                  <label className="form-check-label">Glutenfri </label>
                  <input
                    onChange={this.onCheckChange}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="glutenfri"
                  />
                </div>
                <div className="form-check col">
                  <label className="form-check-label">Laktosfri </label>
                  <input
                    onChange={this.onCheckChange}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="laktosfri"
                  />
                </div>
                <div className="form-check col">
                  <label className="form-check-label">Proteinrikt</label>
                  <input
                    onChange={this.onCheckChange}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="proteinrikt"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Instruktioner</label>
              {instructionInputList}
              <button
                type="button"
                onClick={this.handleAddInstruction}
                className="btn btn-success">
                Lägg till steg
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="form-imgUrl">Bild-URL</label>
              <input
                required
                className="form-control"
                id="form-imgUrl"
                type="text"
                name="imgUrl"
                value={this.state.recipe.imgUrl}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="card">
              {this.state.recipe.ingredients.length > 0 ? (
                <div>
                  <h4 className="card-header">Tillagda ingredienser</h4>
                  <p className="text-danger bold">
                    Du lägger alltid till ingredienser för 1 portion
                  </p>
                </div>
              ) : (
                ""
              )}

              <ul className="list-group list-group-flush">{ingredientsList}</ul>
            </div>
            <div className="form-group">
              <label htmlFor="ingredientSearch">
                Sök o lägg till ingrediens
              </label>
              <input
                className="form-control"
                id="ingredientSearch"
                type="text"
                autoComplete="off"
                onChange={e => {
                  if (e.target.value && e.target.value.length > 2) {
                    this.ingredientSearch(e.target.value);
                  } else {
                    this.ingredientSearch(null);
                  }
                }}
              />

              <div id="auto_complete_div">
                <p
                  id="searching_ingredients"
                  className={
                    fetching_ingred === true
                      ? "list-group-item autoCompleteList searching_ingred_true"
                      : "searching_ingred_false"
                  }>
                  Söker...
                </p>
                {ingredientsAddButtons}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
        <div className="col-sm-12 col-md-5 col-lg-5">
          <RecipeFormPreview props={this.state.recipe} />
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
RecipeForm = connect(
  mapStateToProps,
  { fetchIngredients }
)(RecipeForm);

export default RecipeForm;
