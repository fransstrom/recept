import React from 'react';
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
import RecipeForm from './components/RecipeForm';

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleWare(reducers)}>
      <div className="container">
        <nav className="navbar navbar-default">HiHo</nav>
        <Switch>
          <Route path="/recept" component={RecipeView} />
          <Route path="/add" component={RecipeForm} />
          <Route path="/" component={Recipes} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
