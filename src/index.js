import { createStore } from 'redux';  
import React from 'react';
import ReactDOM from 'react-dom';
import reduc_todo from './reducers/reduc_todo'
import List from './components/List';





var store = createStore(reduc_todo,undefined,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var taskList = [...store.getState()];


var removeItem = function(id) {
  store.dispatch({ type: 'REMOVE', id: id }); //odstraníme druhý úkol
}

var addItem = function(text) {
  store.dispatch({ type: 'ADD', text: text });
}

var setActive = function(id) {
  store.dispatch({ type: 'SET_ACTIVE', id: id }); //odstraníme druhý úkol
}


ReactDOM.render(<List setActive={setActive} removeItem={removeItem} addItem={addItem} store={store} />,document.getElementById('root'));

