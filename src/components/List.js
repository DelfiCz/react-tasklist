import React from 'react';

//Import vnořené komponenty
import Item from './Item';

export default class App extends React.Component {


  updateState() {
    this.setState({tasks: this.props.store.getState()});
  }

  componentWillMount() {
    this.updateState() //úvodní načtení stavu
    this.props.store.subscribe(this.updateState.bind(this)); //aktualizace stavu
  }


  render() {
    //V props je uložena funkce na odebírání úkolů
    var removeItem = this.props.removeItem;

    //vytvoříme pro každou todo položku její DOM vyjádření
    var items = this.state.tasks.map(function(task, id) {
      return <Item key={id} text={task} removeItem={function() { removeItem(id) }}/>
    });

    //vykreslíme komponenty
    return (<div>
              <ul>{items}</ul>
            </div>);
  }
};
