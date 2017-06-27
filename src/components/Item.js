import React from 'react';

export default class Item extends React.Component {



  render() {

    var className;
    console.log(this.props)
    if (this.props.id == this.props.activeId)  {
      return <li className="itemActive" onClick={this.props.setActive} >{this.props.text.title} </li>;
    }
    return <li className="item" onClick={this.props.setActive} >{this.props.text.title} </li>;
  }
};
