import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { fetchIngredients } from '../actions';
import _ from 'lodash';
import validate from './form_components/validate'

class RecipeForm extends Component {
  componentDidMount() {}

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="">{field.meta.touched ? field.meta.error : ''}</div>
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
        <button data={ingredients} className="btn btn-primary">
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
