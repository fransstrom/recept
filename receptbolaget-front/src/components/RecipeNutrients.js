import React, { Component } from "react";
import _ from "lodash";
export default class RecipeNutrients extends Component {
  getNutrient(shortName, nutrition, unit) {
    const recipe = this.props.recipe;
    let carbs = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      let forCalc = recipe.ingredients[i].amount / 100;
      carbs.push(
        recipe.ingredients[i].Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === nutrition
        ).Varde
      );
      carbs[i] = carbs[i].replace(",", ".") * forCalc;
    }
    let carbAmount = _.sum(carbs)
      .toFixed(2)
      .replace(".", ",");
    return (
      <li>
        {shortName}: {carbAmount} {unit}
      </li>
    );
  }

  render() {
    if (this.props.recipe == null) {
      console.log("kk");
    }
    console.log(this.props.recipe);
    return (
      <div>
        <h4>Näringsvärden per portion</h4>
        <ul>
          {this.getNutrient("Kalorier", "Energi (kcal)", "kcal")}
          {this.getNutrient("Protein", "Protein", "g")}
          {this.getNutrient("Kolhydrater", "Kolhydrater", "g")}
          {this.getNutrient("Salt", "Salt", "g")}
          {this.getNutrient("Mättat fett", "Summa mättade fettsyror", "g")}
          {this.getNutrient(
            "Enkelomättat fett",
            "Summa enkelomättade fettsyror",
            "g"
          )}
          {this.getNutrient(
            "Fleromättat fett",
            "Summa fleromättade fettsyror",
            "g"
          )}
          {this.getNutrient("Socker", "Socker totalt", "g")}
        </ul>
      </div>
    );
  }
}
