import React from 'react';

export default class Item extends React.Component {

  render() {
    return <li onClick={this.props.setActive} >{this.props.text.title} </li>;
  }
};
