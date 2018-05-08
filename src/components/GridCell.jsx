import React, { Component } from 'react';
import './GridCell.css';

export default class GridCell extends Component {
  render() {
    const cell = this.props.cell;
    let style = {};
    // borders
    if (cell === 'white') {
      style.border = 'black 0.5px solid';
    }

    style.backgroundColor = cell;
    return <div className="cell" style={style} />;
  }
}
