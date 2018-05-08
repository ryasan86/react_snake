import React, { Component } from 'react';
import GridRow from './GridRow';

export default class Grid extends Component {
  render() {
    const style = {
      display: 'flex'
    }
    
    const grid = this.props.grid.map((row, index) => (
      <GridRow key={index} row={row} />
    ));

    return <div>{grid}</div>;
  }
}
