import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
class RecipeForm extends Component {

  
  componentDidMount() {}

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    );
  }

  handleIngredientsSearch(e) {
    this.props.fetchIngredients(e);
  }

  onSubmit(values) {
    console.log(values);
  }

  ingredientSearch = _.debounce(e => this.handleIngredientsSearch(e), 400);

  render() {
    const { handleSubmit } = this.props;

    let ingredients = _.map(this.props.ingredients);
    let ingredientList = ingredients.map(ingredients => (
      <li className="autoCompleteList" key={ingredients._id}>
        {ingredients.Namn}
        <button className="btn btn-primary">Lägg till</button>
      </li>
    ));
      
    return (
      <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Beskrivning"
          name="description"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Kategorier"
          name="category"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Sök ingredienser"
          name="ingredients"
          type="text"
          onChange={e => {
            if (e.target.value) {
              this.ingredientSearch(e.target.value);
            }
          }}
          component={this.renderField}
        />
        <div className="autoCompleteBox">
        {ingredientList}
        </div>
        <button type="submit" className="btn btn-primary">
          Skicka
        </button>

      </form>
      </div>
      <div className="col-sm-6 col-md-6 col-lg-6">
      <h2>{}</h2>
      </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  //validate the values object
  if (!values.title || values.title.length < 3) {
    errors.title = 'Ange ett namn för receptet med minst 3 bokstäver!';
  }

  if (!values.description) {
    errors.description = 'Ange en beskrivning för receptet!';
  }

  if (!values.category) {
    errors.category = 'Ange minst 1 kategori för receptet!';
  }
  //If errors is empty the form is fine to submit else there is errors
  return errors;
}

function mapStateToProps(state) {
  return { ingredients: state.ingredients };
}

RecipeForm = connect(
  mapStateToProps,
  { fetchIngredients }
)(RecipeForm);

export default reduxForm({ validate, form: 'PostNewRecipe' })(RecipeForm);
