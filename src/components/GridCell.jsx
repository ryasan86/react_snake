import React, { Component } from 'react';

export default class GridCell extends Component {
  render() {
    let { cell, x, y } = this.props;
    let style = {
      width: '1.5rem',
      height: '1.5rem',
      backgroundColor:
        x === 0 || x === 24 || y === 0 || y === 24 ? 'white' : cell
    };

    return <div style={style} id={`${x}-${y}`} />;
  }
}
