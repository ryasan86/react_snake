import React, { Component } from 'react';
import gameHelpers from './../gameHelpers';

export default class GridCell extends Component {
  render() {
    let { cell, x, y } = this.props;
    const createCell = gameHelpers.createCell(cell, x, y);

    return <div style={createCell.style} id={`${x}-${y}`} />;
  }
}
