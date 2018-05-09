import React, { Component } from 'react';

export default class GridCell extends Component {
  render() {
    const cell = this.props.cell;
    let style = {
      width: '0.75rem',
      height: '0.75rem'
    };
    // borders
    if (cell === 'white') {
      style.border = 'black 0.5px solid';
    }

    style.backgroundColor = cell;
    return <div style={style} />;
  }
}
