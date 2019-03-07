import React, { Component } from "react";

export default class RecipeSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="recipe_search_bar">
        <input
          onChange={e => this.props.inputHandle(e.target.value)}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Sök recept"
          aria-label="Sök recept"
        />
      </div>
    );
  }
}
