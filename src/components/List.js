import React from 'react';

//Import vnořené komponenty
import Item from './Item';

export default class List extends React.Component {



  updateState() {
    this.setState(this.props.store.getState());
  }

  componentWillMount() {
    this.updateState() //úvodní načtení stavu
    this.props.store.subscribe(this.updateState.bind(this)); //aktualizace stavu
  }



  render() {
    var setActive = this.props.setActive;
    var addItem = this.props.addItem;
    var removeItem = this.props.removeItem;
    var activeId = this.props.store.getState().todo.active;

    //vytvoříme pro každou todo položku její DOM vyjádření
    var items = this.state.todo.list.map(function (task, id) {
      return <Item id={id}
        text={task}
        activeId={activeId}
        setActive={function () {
          setActive(id)
        }
        } />
    });

    var state = this.props.store.getState();
    var getActiveId = state.todo.active;

    //vykreslíme komponenty
    return (<div>
      <ul className="listUl">{items}</ul>
      <button onClick={addItem.bind(this, "new task")}>✚</button>
      <button onClick={removeItem.bind(this, getActiveId)}>✖</button>
    </div>);
  }
};
