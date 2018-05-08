import React, { Component } from 'react';

export default class GridCell extends Component {
  render() {
    const style = {
      backgroundColor: this.props.cell,
      width: '0.75rem',
      height: '0.75rem',
      border: 'white 1px solid'
    };

    return <div style={style} />;
  }
}
