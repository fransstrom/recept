import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import Recipes from "./components/Recipes";
import ReduxPromise from "redux-promise";
import RecipeView from "./components/RecipeView";
import RecipeForm2 from "./components/RecipeForm2";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={createStoreWithMiddleWare(reducers)}>
        <div className="main-container">
          <Navbar />

          <Switch>
            <Route path="/recept/nytt" component={RecipeForm2} />
            <Route path="/recept/:id" component={RecipeView} />

            <Route path="/recept" component={Recipes} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
