import React from 'react';

const IngredientList = ({ ingredients }) => (
  <div>
    <h4>Ingredients added</h4>
    <ol>
      {ingredients.map(ingredients => {
        return (
          <li key={ingredients.Nummer}>
            {ingredients.quantity ? (
              <div>
                {ingredients.quantity}
                {ingredients.measure} {ingredients.Namn}{' '}
              </div>
            ) : (
              <div>{ingredients.Namn}</div>
            )}
          </li>
        );
      })}
    </ol>
  </div>
);

export default IngredientList;
