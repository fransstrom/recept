import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
import RecipeFormPreview from './RecipeFormPreview';

class RecipeForm2 extends Component {
  constructor() {
    super();
    this.state = {
      addedIngredients: [],
      label: '',
      description: '',
      categories: [],
      imgUrl: '',
      instructions: [{ step: '' }]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleIngredientsSearch(e) {
    this.props.fetchIngredients(e);
  }
  ingredientSearch = _.debounce(e => this.handleIngredientsSearch(e), 200);

  addIngredient(e) {
    let addedIngredients = [...this.state.addedIngredients];

    e.measure = 'g';
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

  handleIngredientMeasureUnitAmount(e) {
    let id = e.target.getAttribute('quantity');
    let addedIngredients = [...this.state.addedIngredients];
    const index = addedIngredients.findIndex(
      ingredient => ingredient._id === id
    );
    addedIngredients[index].quantity = e.target.value;
    this.setState({ addedIngredients });
  }

  handleIngredientMeasureUnit(e) {
    let id = e.target.getAttribute('measure');
    let addedIngredients = [...this.state.addedIngredients];
    const index = addedIngredients.findIndex(
      ingredient => ingredient._id === id
    );
    addedIngredients[index].measure = e.target.value;
    this.setState({ addedIngredients });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleInstructionStepChange = idx => evt => {
    const newInstructions = this.state.instructions.map((instruction, sidx) => {
      if (idx !== sidx) return instruction;
      return { ...instruction, step: evt.target.value };
    });

    this.setState({ instructions: newInstructions });
  };

  handleAddInstruction = () => {
    this.setState({
      instructions: this.state.instructions.concat([{ step: '' }])
    });
  };

  handleRemoveInstruction = idx => () => {
    if (this.state.instructions.length > 1)
      this.setState({
        instructions: this.state.instructions.filter((s, sidx) => idx !== sidx)
      });
  };

  submit = () => {
    console.log(JSON.stringify(this.state));
  };

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

    // update the state with the new array of options
    this.setState({ categories: categories });
  }

  render() {
    let ingredients = _.map(this.props.ingredients);
    let ingredientsAddButtons = ingredients.map(ingredients => (
      <li className="list-group-item autoCompleteList" key={ingredients._id}>
        {ingredients.Namn}
        <button
          ingredient={ingredients}
          onClick={e => this.addIngredient(ingredients)}
          className="btn btn-primary">
          Lägg till
        </button>
      </li>
    ));

    let addedIngredientsList = this.state.addedIngredients.map(ingredient => {
      return (
        <li className="list-group-item addedIngredient" key={ingredient._id}>
          {ingredient.Namn}{' '}
          <input
            type="number"
            quantity={ingredient._id}
            placeholder="Antal måttenheter"
            onChange={e => this.handleIngredientMeasureUnitAmount(e)}
          />
          <select
            measure={ingredient._id}
            defaultValue="g"
            onChange={e => this.handleIngredientMeasureUnit(e)}>
            <option value="tsk">Tesked</option>
            <option value="msk">Matsked</option>
            <option value="kg">Kilo</option>
            <option value="g">Gram</option>
            <option value="stk">Styck</option>
          </select>
          <input
            type="number"
            step="any"
            min="0"
            amount={ingredient._id}
            placeholder="Mängd i gram"
            onChange={e => this.handleIngredientAmount(e)}
          />
          <button
            className="btn btn-danger"
            value={ingredient._id}
            onClick={e => this.removeIngredient(e)}>
            -
          </button>
        </li>
      );
    });

    const instructionInputList = this.state.instructions.map(
      (instruction, idx) => (
        <div key={idx} className="form-instructions">
          <input
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
        <form onSubmit={e => e.preventDefault()}>
          <div className="col-sm-12 col-md-7 col-lg-7">
            <div className="form-group">
              <label htmlFor="form-name">Namn</label>
              <input
                className="form-control"
                id="form-name"
                type="text"
                name="label"
                value={this.state.label}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-description">Beskrivning</label>
              <textarea
                className="form-control"
                id="form-description"
                type="comment"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group category-group">
              <div className="form-check ">
                <label className="form-check-label">Vegetariskt </label>
                <input
                  onChange={this.onCheckChange.bind(this)}
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="vegetarisk"
                />
              </div>

              <div className="form-check ">
                <label className="form-check-label">Vegansk </label>
                <input
                  onChange={this.onCheckChange.bind(this)}
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="vegansk"
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">Glutenfri </label>
                <input
                  onChange={this.onCheckChange.bind(this)}
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="glutenfri"
                />
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
                className="form-control"
                id="form-imgUrl"
                type="text"
                name="imgUrl"
                value={this.state.imgUrl}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="card">
              {this.state.addedIngredients.length > 0 ? (
                <div>
                  <h4 className="card-header">Tillagda ingredienser</h4>
                  <p className="text-danger bold">
                    Du lägger alltid till ingredienser för 1 portion
                  </p>
                </div>
              ) : (
                ''
              )}

              <ul className="list-group list-group-flush">
                {addedIngredientsList}
              </ul>
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
              {ingredientsAddButtons}
            </div>
            <button onClick={this.submit} className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
        <div className="col-sm-12 col-md-5 col-lg-5">
          <RecipeFormPreview props={this.state} />
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
