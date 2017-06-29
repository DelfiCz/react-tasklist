import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import React from 'react';
import ReactDOM from 'react-dom';
import reduc_todo from './reducers/todo'
var actions = require('./reducers/todo-actions')
import List from './components/List';
import SimpleForm from './components/SimpleForm';


import { Provider } from 'react-redux';
import { Values } from 'redux-form-website-template';

import api from './api/api';

console.log(actions)
const reducers = { todo: reduc_todo, form: formReducer }
const reducer = combineReducers(reducers)
const store = createStore(reducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var taskList = [...store.getState().todo.list];

store.dispatch(actions.FETCH_TASK_REQUESTED())

api.get(store,
  function (response) {
    store.dispatch(actions.FETCH_TASK_SUCCEEDED(response))

  },
  function (error) {
    store.dispatch(actions.FETCH_TASK_FAILED(response))
  });


function formatDate(date) {
  var d = new Date((date + 3600) * 1000),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

let currentValue = -1
let currentForm = -1

var detectChangeOfActive = store.subscribe(function () {

  var state = store.getState();
  let previousValue = currentValue;
  let previousForm = currentForm;
  currentValue = state.todo.active;
  currentForm = state.todo.formSubtasks.length;

  if (state.form.simple == undefined) return;

  if (currentValue == previousValue && currentForm == previousForm) {
    return;
  }

  if (currentForm != previousForm && state.form.simple.values != undefined && currentValue == previousValue) {
    var activeTask = state.todo.list[state.todo.active];
    state.form.simple.values = {
      title: state.form.simple.values.title,
      content: state.form.simple.values.content,
      subtasks: [...state.todo.formSubtasks],
      deadline: formatDate(state.form.simple.values.deadline),
      hasDeadline: state.form.simple.values.hasDeadline,
    }
    return;
  }

  if (state.form.simple != undefined) {
    var activeTask = state.todo.list[state.todo.active];
    state.form.simple.values = {
      title: activeTask.title,
      content: activeTask.content,
      subtasks: [...state.todo.formSubtasks],
      deadline: formatDate(activeTask.deadline),
      hasDeadline: activeTask.hasDeadline,
    }
  }

});

var removeItem = function (id) {
  store.dispatch(actions.DELETE_TASK_REQUESTED(id));

  api.post(store,
    function (response) {
      store.dispatch(actions.DELETE_TASK_SUCCEEDED())
    },
    function (error) {
      store.dispatch(actions.DELETE_TASK_FAILED())
    });
}

var addItem = function (text) {
  store.dispatch(actions.ADD_TASK_REQUESTED(text));

  api.post(store,
    function (response) {
      store.dispatch(actions.ADD_TASK_SUCCEEDED())
    },
    function (error) {
      store.dispatch(actions.ADD_TASK_FAILED())
    });
}

var setActive = function (id) {
  store.dispatch(actions.SET_TASK_ACTIVE(id));
}

var handleSubmit = function (values) {

  var id = store.getState().todo.active;
  store.dispatch(actions.CHANGE_TASK_TITLE(id, values));
  store.dispatch(actions.CHANGE_TASK_CONTENT(id, values));
  store.dispatch(actions.CHANGE_TASK_SUBTASKS(id, values));
  store.dispatch(actions.CHANGE_TASK_DEADLINE(id, values));
  store.dispatch(actions.POST_TASK_REQUESTED());

  api.post(store,
    function (response) {
      store.dispatch(actions.POST_TASK_SUCCEEDED)
    },
    function (error) {
      store.dispatch(actions.POST_TASK_FAILED)
    });
  alert("Changes has been made.")
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
      <SimpleForm onSubmit={handleSubmit} store={store} />
    </div>
  </Provider>,
  document.getElementById('form'),
);