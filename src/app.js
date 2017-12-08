import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { addDeck, showAddDeck, hideAddDeck } from './actions';
import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';

// Main reducer
const store = createStore(combineReducers(reducers));

// RENDERING
function run() {
  let state = store.getState();
  console.log(state);
  ReactDOM.render((<App> 
    <Sidebar 
      decks={state.decks} 
      addingDeck={state.addingDeck} 
      // dispatch actions, make state changes to the store
      addDeck={name => store.dispatch(addDeck(name))}
      showAddDeck={() => store.dispatch(showAddDeck())}
      hideAddDeck={() => store.dispatch(hideAddDeck())}
      /> 
  </App>), document.getElementById('root'));
}

run();
store.subscribe(run);