import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import React from 'react';
import ReactDOM from 'react-dom';
import reduc_todo from './reducers/reduc_todo'
import List from './components/List';
import SimpleForm from './components/SimpleForm';


import { Provider } from 'react-redux';
import { Values } from 'redux-form-website-template';

import api from './api'
//var api = require('./api');

const reducers = { todo: reduc_todo, form: formReducer }
const reducer = combineReducers(reducers)
const store = createStore(reducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var taskList = [...store.getState().todo.list];

api.get(store,
  function (response) {
    store.dispatch({
      type: "TASK_FETCH_SUCCEEDED",
      data: response
    })

    return "success"
  },
  function (error) {
    return "error";

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
  store.dispatch({ type: 'REMOVE', id: id });
}

var addItem = function (text) {
  store.dispatch({ type: 'ADD', text: text });

  api.post(store,
    function (response) {
      console.log(response.data)
      store.dispatch({
        type: "TASK_POST_SUCCEEDED",
      })

      return "success"
    },
    function (error) {
      console.log(error)
      return "error";

    });
}

var setActive = function (id) {
  store.dispatch({ type: 'SET_ACTIVE', id: id });
}

var handleSubmit = function (values) {

  var id = store.getState().todo.active;
  store.dispatch({ type: 'CHANGE_TITLE', id: id, title: values.title });
  store.dispatch({ type: 'CHANGE_CONTENT', id: id, content: values.content });
  store.dispatch({ type: 'CHANGE_SUBTASKS', id: id, subtasks: values.subtasks });
  store.dispatch({ type: 'CHANGE_DEADLINE', id: id, deadline: Date.parse(values.deadline) / 1000 - 3600, hasDeadline: values.hasDeadline });



  store.dispatch({ type: 'TASK_POST_SUCCEEDED' });

  api.post(store,
    function (response) {
      console.log(response.data)
      store.dispatch({
        type: "TASK_POST_SUCCEEDED",
      })

      return "success"
    },
    function (error) {
      console.log(error)
      return "error";

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