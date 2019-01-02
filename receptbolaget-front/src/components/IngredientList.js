import React from 'react';

const IngredientList = ({ ingredients }) => (
  <div>
    <h4>Ingredienser</h4>
    <ul>
      {ingredients.map(ingredients => {
        return (
          <li key={ingredients.Nummer}>
            {ingredients.quantity ? (
              <div>
                {ingredients.quantity}
                {ingredients.measure} {ingredients.Namn}
                {ingredients.measure == 'g' ? '' : (' (ca '+ingredients.amount)+' gram)'}
              </div>
            ) : (
              <div>{ingredients.Namn}</div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientList;
