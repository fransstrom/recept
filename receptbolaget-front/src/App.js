import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import Recipes from "./components/Recipes";
import ReduxPromise from "redux-promise";
import RecipeView from "./components/RecipeView";
import RecipeForm from "./components/RecipeForm";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import CreateRecipe from "./components/CreateRecipeView";
import Auth from "./components/Authentication";

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={createStoreWithMiddleWare(reducers)}>
        <div className="main-container">
          <Navbar />

          <Switch>
            <Route path="/recept/nytt" component={CreateRecipe} />
            <Route path="/recept/:id" component={RecipeView} />

            <Route path="/recept" component={Recipes} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
