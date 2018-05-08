import React, { Component } from 'react';
import GridCell from './GridCell';

export default class GridRow extends Component {
  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const row = this.props.row.map((cell, index) => (
      <GridCell key={index} cell={cell} />
    ));

    return <div style={style}>{row}</div>;
  }
}
