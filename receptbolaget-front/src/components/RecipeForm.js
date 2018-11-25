import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
import validate from './form_components/validate';

class RecipeForm extends Component {
  componentDidMount() {}

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="">{field.meta.touched ? field.meta.error : ''} </div>
      </div>
    );
  }




  
  handleIngredientsSearch(e) {
    this.props.fetchIngredients(e);
  }

  onSubmit(values) {
    console.log(values);
  }
  handle(e) {
    console.log(e);
  }
  ingredientSearch = _.debounce(e => this.handleIngredientsSearch(e), 400);


  renderIngredients = ({ fields, meta: { error, submitFailed } }) => (
    
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Member
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          />
          <h4>Member #{index + 1}</h4>
          <Field
            name={`${member}.firstName`}
            type="text"
            component={this.renderField}
            label="First Name"
          />
          <Field
            name={`${member}.lastName`}
            type="text"
            component={this.renderField}
            label="Last Name"
          />
    
        </li>
      ))}
    </ul>
  )
  render() {










    const { handleSubmit } = this.props;
    let ingredients = _.map(this.props.ingredients);
    let ingredientList = ingredients.map(ingredients => (
      <li className="autoCompleteList" key={ingredients._id}>
        {ingredients.Namn}
        <button
          ingred={ingredients}
          onClick={e => this.handle(ingredients)}
          className="btn btn-primary">
          Lägg till
        </button>
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
              value=""
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
               <div className="autoCompleteBox">{ingredientList}</div>
            <Field
              label="Bild-url"
              name="IMGUrl"
              type="text"
            
              component={this.renderField}
            />
          <FieldArray name="members" component={this.renderIngredients} />
            <button type="submit" className="btn btn-primary">
              Skicka
            </button>
          </form>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <h2>{this.props.values ? this.props.values.title : ''}</h2>
          <p>{this.props.values ? this.props.values.description : ''}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients,
    values: state.form.PostNewRecipe.values
  };
}

RecipeForm = connect(
  mapStateToProps,
  { fetchIngredients }
)(RecipeForm);

RecipeForm = reduxForm({ validate, form: 'PostNewRecipe' })(RecipeForm);

export default RecipeForm;
