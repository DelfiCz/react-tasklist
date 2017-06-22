import { createStore } from 'redux';  
import React from 'react';
import ReactDOM from 'react-dom';
import reduc_todo from './reducers/reduc_todo'
import List from './components/List';





var store = createStore(reduc_todo,undefined,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var taskList = [...store.getState()];

var renderVar = (
					<div id="app">
						<div id="list">
							{[...taskList + "<br>"]}
						</div>
						<div id="form">
						</div>
					</div>);


var removeItem = function(id) {
  store.dispatch({ type: 'REMOVE', id: id }); //odstraníme druhý úkol
}

var addItem = function(text) {
  store.dispatch({ type: 'ADD', text: text });
}


ReactDOM.render(<List removeItem={removeItem} addItem={addItem} store={store} />,document.getElementById('root'));

