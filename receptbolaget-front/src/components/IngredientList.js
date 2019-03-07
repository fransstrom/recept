import React from "react";

const IngredientList = ({ ingredients, portions }) => (
  <div>
    <h4>Ingredienser</h4>
    <ul>
      {ingredients.map(ingredients => {
        return (
          <li key={ingredients.Nummer}>
            {ingredients.quantity ? (
              <div>
                {ingredients.quantity * portions + " "}
                {ingredients.measure} {ingredients.Namn}
                {ingredients.measure === "g" || ingredients.measure === "kg"
                  ? ""
                  : " (ca " + ingredients.amount * portions + " gram)"}
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
