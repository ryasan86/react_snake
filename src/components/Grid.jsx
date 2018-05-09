import React, { Component } from 'react';
import GridRow from './GridRow';

export default class Grid extends Component {
  render() {
    const grid = this.props.grid.map((row, index) => {
      return <GridRow key={index} y={index} row={row} />;
    });

    return <div>{grid}</div>;
  }
}
