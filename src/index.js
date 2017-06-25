import { createStore, combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';

import React from 'react';
import ReactDOM from 'react-dom';
import reduc_todo from './reducers/reduc_todo'
import List from './components/List';
import SimpleForm from './components/SimpleForm';

import { Provider } from 'react-redux';
import { Values } from 'redux-form-website-template';


const reducers = { todo: reduc_todo, form: formReducer}
const reducer = combineReducers(reducers)
const store = createStore(reducer,undefined,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var taskList = [...store.getState().todo.list];



var removeItem = function(id) {
  store.dispatch({ type: 'REMOVE', id: id });
}

var addItem = function(text) {
  store.dispatch({ type: 'ADD', text: text });
}

var setActive = function(id) {
  store.dispatch({ type: 'SET_ACTIVE', id: id });
}

var showResults = function (values) {
  //var state = store.getState().todo;
  //var task = state.list[state.active]
  //task = values.title
  var id = store.getState().todo.active;
  store.dispatch({ type: 'CHANGE_TITLE', id: id, title: values.title });
  store.dispatch({ type: 'CHANGE_CONTENT', id: id, content: values.content });
}

ReactDOM.render(
  <List setActive={setActive} 
        removeItem={removeItem}
        addItem={addItem} 
        store={store} />,
  document.getElementById('list'));

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <SimpleForm onSubmit={showResults} store={store} />
    </div>
  </Provider>,
  document.getElementById('form'),
);