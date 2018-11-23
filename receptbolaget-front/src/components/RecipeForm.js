import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
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

  searchIngreds(field) {
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
    this.props.fetchIngredients(values.description);
  }

  render() {
    const { handleSubmit } = this.props;
    var ingredientSearch = _.debounce(e=>this.handleIngredientsSearch(e), 400);
    console.log(this.props.ingredients);
    return (
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
          onChange={e => ingredientSearch(e.target.value)} 
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Skicka
        </button>
        {this.validate}
      </form>
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
