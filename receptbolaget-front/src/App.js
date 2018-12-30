import React from 'react';
import './App.css';

import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Recipes from './components/Recipes';
import ReduxPromise from 'redux-promise';
import RecipeView from './components/RecipeView';
import RecipeForm2 from './components/RecipeForm2';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={createStoreWithMiddleWare(reducers)}>
        <div className="main-container">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/recept" component={RecipeView} />
              <Route path="/add" component={RecipeForm2} />
              <Route path="/" component={Recipes} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
