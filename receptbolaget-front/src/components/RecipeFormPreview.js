import React from 'react';
import InstructionList from './InstructionList';
import IngredientList from './IngredientList';
const RecipeFormPreview = ({ props }) => {
  return (
    <div id="recipeFormPreviewContainer">
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

      {props.ingredients[0] ? (
        <IngredientList ingredients={props.ingredients} portions={'1'}/>
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
