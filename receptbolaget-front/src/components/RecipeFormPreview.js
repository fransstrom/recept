import React, { Component } from 'react';
import InstructionList from './InstructionList';
import IngredientList from './IngredientList';
const RecipeFormPreview = ({ props }) => {
  return (
    <div
      id="recipeFormPreviewContainer"
      className="col-sm-12 col-md-5 col-lg-5">
      <h1>{props.label}</h1>
      <h3>{props.description ? 'Beskrivning' : ''}</h3>
      <p>{props.description}</p>
      {props.instructions[0].step ? (
        <div id="instructions">
          <h4>Instruktioner</h4>
          <InstructionList instructions={props.instructions} />{' '}
        </div>
      ) : (
        ''
      )}

{props.addedIngredients[0] ? (
        <div id="instructions">
          <h4>Ingredients added</h4>
          <IngredientList ingredients={props.addedIngredients} />
        </div>
      ) : (
        ''
      )}

      <div>
        {props.imgUrl ? (
          <img id="recipeImg" alt="Bild för recept" src={props.imgUrl} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RecipeFormPreview;
