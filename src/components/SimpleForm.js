import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';

function mapStateToProps(state) {

  return {
    initialValues: { title: "neco", content: "neco2", deadline: "neco3" },
  }
}

function mapDispatchToProps(state) {
  return {}
}

class SimpleForm extends React.Component {



  render() {

    var pristine = this.props.pristine;
    var submitting = this.props.submitting;
    var handleSubmit = this.props.handleSubmit;
    var activeTask = this.props.store.getState().todo.list[this.props.store.getState().todo.active]
    var activeSubtasks = this.props.store.getState().todo.formSubtasks;

    var deadlineClass = "no-expired";

    if (this.props.store.getState().todo.list[this.props.store.getState().todo.active].hasDeadline == true) {
      var deadline = this.props.store.getState().todo.list[this.props.store.getState().todo.active].deadline;
      console.log(activeTask);
      console.log(new Date().getTime() / 1000);
      if (deadline + 24 * 3600 < new Date().getTime() / 1000 && !activeTask.subtasks.every((val, i, arr) => val.done == true)) {
        deadlineClass = "expired";
      }
    }

    return (
      <form onSubmit={handleSubmit} >
        <div>
          <label>Title</label>
          <div>
            <Field
              name="title"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div>
          <label>Content</label>
          <div>
            <Field
              name="content"
              component="textarea"
            />
          </div>
        </div>
        <div>
          <label>Subtasks</label>
          <ul className="subtaskUl">
            {activeSubtasks.map((subtask, index) =>
              <li key={index}>
                <Field
                  name={`subtasks[${index}].done`}
                  type="checkbox"
                  component="input" />
                <Field
                  name={`subtasks[${index}].title`}
                  type="text"
                  component="input" />
                <button
                  name={'button_remove' + index}
                  type="button"
                  onClick={() => {
                    activeSubtasks.splice(index, 1);
                    this.props.store.dispatch({
                      type: '@@redux-form/FOCUS',
                      meta: {
                        form: "simple",
                        field: "button"
                      }
                    })
                  }}>
                  ✖
                </button>


              </li>
            )}
          </ul>
          <button
            name={'button_add'}
            type="button"
            onClick={() => {
              activeSubtasks.push({
                title: 'new subtask',
                done: false
              });
              this.props.store.dispatch({
                type: '@@redux-form/FOCUS',
                meta: {
                  form: "simple",
                  field: "button"
                }
              })
            }}>✚
          </button>
        </div>
        <div>
          <br />
          <label>Deadline</label>
          <div>
            <Field
              name="hasDeadline"
              type="checkbox"
              component="input" />
            <Field
              name="deadline"
              component="input"
              type="text"
              className={deadlineClass}
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>

        <div>
          <button onClick={handleSubmit} disabled={pristine}>Submit</button>
        </div>
      </form >
    );
  }
};

//SimpleForm = connect(
//  mapStateToProps
//)(SimpleForm);

export default reduxForm({
  form: 'simple',
  enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(SimpleForm));
